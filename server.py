#!/usr/bin/env python3
"""
Simple HTTP server for MedFinder India
Serves static files with proper headers and MIME types

Usage:
    python server.py [port]

Default port: 8000
"""

import http.server
import socketserver
import os
import sys
from functools import partial

# Get port from environment variable or command line argument
PORT = int(os.environ.get('PORT', sys.argv[1] if len(sys.argv) > 1 else 8000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MedFinderHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """
    Custom HTTP request handler with security headers and proper MIME types
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        """Add security and caching headers"""
        # Security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')

        # Content Security Policy
        csp = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "connect-src 'self'; "
            "font-src 'self' data:; "
            "frame-ancestors 'none';"
        )
        self.send_header('Content-Security-Policy', csp)

        # CORS headers (if needed for API testing)
        # self.send_header('Access-Control-Allow-Origin', '*')

        # Caching headers for static assets
        if self.path.endswith(('.js', '.css', '.png', '.jpg', '.svg', '.woff', '.woff2')):
            self.send_header('Cache-Control', 'public, max-age=31536000')  # 1 year
        elif self.path.endswith('.html') or self.path == '/':
            self.send_header('Cache-Control', 'no-cache, must-revalidate')

        super().end_headers()

    def do_GET(self):
        """Handle GET requests with fallback to index.html for SPA routing"""
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        """Custom logging format"""
        print(f"[{self.log_date_time_string()}] {format % args}")


def run_server(port=PORT):
    """Start the HTTP server"""
    handler = MedFinderHTTPRequestHandler

    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("=" * 60)
            print("🏥 MedFinder India Server")
            print("=" * 60)
            print(f"📍 Server running at: http://localhost:{port}/")
            print(f"📂 Serving directory: {DIRECTORY}")
            print("\nPress Ctrl+C to stop the server")
            print("=" * 60)
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"\n❌ Error: Port {port} is already in use.")
            print(f"💡 Try a different port: python server.py 8080")
        else:
            print(f"\n❌ Error starting server: {e}")
        sys.exit(1)


if __name__ == '__main__':
    run_server()
