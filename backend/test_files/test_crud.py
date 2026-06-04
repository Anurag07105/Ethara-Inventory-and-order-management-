import urllib.request
import json
import random
import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from sqlalchemy import text

BASE_URL = "http://127.0.0.1:8000/api/v1"

def make_request(method, path, data=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    
    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")
        
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            resp_body = res.read().decode("utf-8")
            return json.loads(resp_body)
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"HTTP ERROR {e.code} for {method} {path}: {err_body}")
        raise e
    except Exception as e:
        print(f"ERROR for {method} {path}: {e}")
        raise e

def main():
    print("=== STARTING BACKEND INTEGRATION & DATABASE TESTS ===")
    
    sku = f"TEST-SKU-{random.randint(1000, 9999)}"
    
    # 1. Dashboard stats before
    print("\n1. Fetching dashboard stats before starting:")
    stats_before = make_request("GET", "/dashboard/stats")
    print("Dashboard before:", stats_before["data"])

    # 2. Create Product
    print("\n2. Creating a test product:")
    product_payload = {
        "sku": sku,
        "name": "Test Autonomous Product",
        "description": "Created during automated backend check",
        "price": 49.99,
        "stock_quantity": 100
    }
    prod_resp = make_request("POST", "/products", product_payload)
    product = prod_resp["data"]
    product_id = product["id"]
    print(f"Created product: ID={product_id}, SKU={product['sku']}, Stock={product['stock_quantity']}")
    
    # 3. Create Customer
    print("\n3. Creating a test customer:")
    customer_email = f"test.customer.{random.randint(10000, 99999)}@example.com"
    customer_payload = {
        "name": "Test Customer",
        "email": customer_email,
        "phone": "+1234567890",
        "address": "123 Test Suite Road"
    }
    cust_resp = make_request("POST", "/customers", customer_payload)
    customer = cust_resp["data"]
    customer_id = customer["id"]
    print(f"Created customer: ID={customer_id}, Email={customer['email']}")

    # 4. Create Order (purchasing 5 units of the test product)
    print("\n4. Placing an order for 5 units of the test product:")
    order_payload = {
        "customer_id": customer_id,
        "items": [
            {
                "product_id": product_id,
                "quantity": 5
            }
        ]
    }
    ord_resp = make_request("POST", "/orders", order_payload)
    order = ord_resp["data"]
    order_id = order["id"]
    print(f"Created order: ID={order_id}, Total Amount={order['total_amount']}, Status={order['status']}")
    
    # 5. Check if stock quantity was reduced on product (should be 95)
    print("\n5. Verifying product stock reduction:")
    check_prod_resp = make_request("GET", f"/products/{product_id}")
    updated_product = check_prod_resp["data"]
    print(f"Product Stock: {updated_product['stock_quantity']} (Expected: 95)")
    if updated_product['stock_quantity'] == 95:
        print("Success! Product stock was updated correctly.")
    else:
        print("Warning: Product stock update mismatch!")

    # 6. Check dashboard stats now
    print("\n6. Fetching dashboard stats after updates:")
    stats_after = make_request("GET", "/dashboard/stats")
    print("Dashboard after:", stats_after["data"])
    
    # 7. Clean up
    print("\n7. Performing robust database cleanup via SQLAlchemy session:")
    db = SessionLocal()
    try:
        # Delete referencing items in correct dependency order
        # A. Order items first (although order cascade delete works, let's make it explicit)
        db.execute(text(f"DELETE FROM order_items WHERE order_id = {order_id}"))
        # B. Orders
        db.execute(text(f"DELETE FROM orders WHERE id = {order_id}"))
        # C. Inventory logs
        db.execute(text(f"DELETE FROM inventory_logs WHERE product_id = {product_id}"))
        # D. Customer
        db.execute(text(f"DELETE FROM customers WHERE id = {customer_id}"))
        # E. Product
        db.execute(text(f"DELETE FROM products WHERE id = {product_id}"))
        
        db.commit()
        print("Cleanup completed successfully! All test records removed.")
    except Exception as e:
        db.rollback()
        print("Cleanup failed! Error:", e)
    finally:
        db.close()

    # Check dashboard stats after cleanup
    print("\n8. Fetching dashboard stats after cleanup:")
    stats_final = make_request("GET", "/dashboard/stats")
    print("Dashboard final:", stats_final["data"])
    
    print("\n=== ALL INTEGRATION CHECKS COMPLETED ===")

if __name__ == "__main__":
    main()
