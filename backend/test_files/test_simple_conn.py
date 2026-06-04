import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine
from sqlalchemy import text

def main():
    print("Connecting to the database...")
    # Executing a single test query to fetch the database version
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        db_version = result.scalar()
        print("Successfully connected and queried the database!")
        print(f"Database Version: {db_version}")

if __name__ == "__main__":
    main()
