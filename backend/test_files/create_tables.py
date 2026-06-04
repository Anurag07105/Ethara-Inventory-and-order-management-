import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
from app.core.database import engine, Base
# Import all models to ensure they are registered on Base.metadata
import app.models.product
import app.models.customer
import app.models.order
import app.models.inventory

def main():
    print("Database URL:", settings.DATABASE_URL.split("@")[-1] if "@" in settings.DATABASE_URL else settings.DATABASE_URL)
    print("Rewritten SQLAlchemy URL:", settings.database_url_sqlalchemy.split("@")[-1] if "@" in settings.database_url_sqlalchemy else settings.database_url_sqlalchemy)
    
    print("\n--- Creating all tables registered on metadata ---")
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully!")
    except Exception as e:
        print("Failed to create tables!")
        print("Error details:", str(e))

if __name__ == "__main__":
    main()
