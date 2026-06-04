import os
from sqlalchemy import create_engine, inspect, text

def main():
    db_path = "ethara.db"
    if not os.path.exists(db_path):
        print(f"File {db_path} does not exist!")
        return

    print("Checking local SQLite database 'ethara.db'...")
    engine = create_engine(f"sqlite:///{db_path}")
    
    try:
        connection = engine.connect()
        print("Connected to SQLite successfully.")
        connection.close()
    except Exception as e:
        print("Failed to connect to SQLite:", e)
        return

    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print("Found tables in SQLite:", tables)
    
    expected_tables = ["products", "customers", "orders", "order_items", "inventory_logs"]
    for table in expected_tables:
        if table in tables:
            try:
                with engine.connect() as conn:
                    result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                    count = result.scalar()
                print(f"  Table '{table}': EXISTS, row count = {count}")
            except Exception as err:
                print(f"  Table '{table}': EXISTS, but query failed! Error: {err}")
        else:
            print(f"  Table '{table}': MISSING!")

if __name__ == "__main__":
    main()
