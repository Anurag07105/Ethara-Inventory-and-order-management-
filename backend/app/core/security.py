# Security utilities (Password hashing, JWT generation) can go here. 
# Currently empty as auth wasn't heavily specified, but maintained for architectural compliance.
import secrets

def generate_random_string(length: int = 32) -> str:
    return secrets.token_urlsafe(length)