from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
import json

class Settings(BaseSettings):
    PROJECT_NAME: str
    PROJECT_VERSION: str
    ENVIRONMENT: str = "development"
    DATABASE_URL: str
    BACKEND_CORS_ORIGINS: Union[List[str], str] = []
    
    # Docker configuration variables (optional, mainly for docker-compose)
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"
    DB_NAME: str = "inventory_db"
    DB_PORT: int = 5432
    BACKEND_PORT: int = 8000

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return []
            if v.startswith("[") and v.endswith("]"):
                try:
                    parsed = json.loads(v)
                    if isinstance(parsed, list):
                        return [str(item) for item in parsed]
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    @property
    def database_url_sqlalchemy(self) -> str:
        url = self.DATABASE_URL
        # Supabase and other PaaS often provide URLs starting with postgres://
        # We rewrite it to use the psycopg2 driver explicitly to avoid compatibility issues.
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()