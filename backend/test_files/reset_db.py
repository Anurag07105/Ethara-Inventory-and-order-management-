import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal
from sqlalchemy import text

def main():
    print("Resetting database tables...")
    db = SessionLocal()
    try:
        # Delete referencing items in correct dependency order
        db.execute(text("DELETE FROM order_items"))
        db.execute(text("DELETE FROM orders"))
        db.execute(text("DELETE FROM inventory_logs"))
        db.execute(text("DELETE FROM customers"))
        db.execute(text("DELETE FROM products"))
        
        db.commit()
        print("Database reset successfully! All tables are now empty.")
    except Exception as e:
        db.rollback()
        print("Reset failed! Error:", e)
    finally:
        db.close()

if __name__ == "__main__":
    main()
