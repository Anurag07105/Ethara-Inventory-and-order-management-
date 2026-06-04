import os
import sys

# Add the backend directory to python path so we can import app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.core.database import engine, SessionLocal
from sqlalchemy import text, inspect

def main():
    print("Database URL:", settings.DATABASE_URL.split("@")[-1] if "@" in settings.DATABASE_URL else settings.DATABASE_URL)
    print("Rewritten SQLAlchemy URL:", settings.database_url_sqlalchemy.split("@")[-1] if "@" in settings.database_url_sqlalchemy else settings.database_url_sqlalchemy)
    
    print("\n--- Connecting to Database ---")
    try:
        connection = engine.connect()
        print("Successfully connected to the database!")
        connection.close()
    except Exception as e:
        print("Database connection failed!")
        print("Error Details:", str(e))
        return

    print("\n--- Inspecting Database Tables ---")
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print("Found tables in database:", tables)
        
        expected_tables = ["products", "customers", "orders", "order_items", "inventory_logs"]
        print("Expected tables:", expected_tables)
        
        db = SessionLocal()
        try:
            for table in expected_tables:
                if table in tables:
                    try:
                        result = db.execute(text(f"SELECT COUNT(*) FROM {table}"))
                        count = result.scalar()
                        print(f"  Table '{table}': EXISTS, row count = {count}")
                    except Exception as err:
                        print(f"  Table '{table}': EXISTS, but query failed! Error: {err}")
                else:
                    print(f"  Table '{table}': MISSING!")
        finally:
            db.close()
            
    except Exception as e:
        print("Error during table inspection:", str(e))

if __name__ == "__main__":
    main()
