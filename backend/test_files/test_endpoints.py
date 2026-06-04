import urllib.request
import json

def test_url(url, description):
    print(f"\nTesting {description} ({url})...")
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            status = response.getcode()
            body = response.read().decode('utf-8')
            print(f"Status Code: {status}")
            print(f"Response: {body}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8') if e.fp else e.reason}")
    except Exception as e:
        print(f"Connection failed: {e}")

def main():
    # 1. Health check
    test_url("http://127.0.0.1:8000/health", "Health Check Endpoint")
    
    # 2. Products list
    test_url("http://127.0.0.1:8000/api/v1/products", "List Products Endpoint")

if __name__ == "__main__":
    main()
