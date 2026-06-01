# Docker Setup Guide - Ethara Backend

This guide explains how to build and run the Ethara Backend using Docker with proper environment variable management.

## Prerequisites

- Docker installed ([Download Docker Desktop](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

## Environment Configuration

### 1. Create .env File

All sensitive credentials and configuration should be stored in `.env` file (not hardcoded in code or docker-compose.yml).

**Development Setup:**
```bash
cp .env.example .env
```

Edit `.env` with your local configuration:
```env
PROJECT_NAME="Inventory & Order Management System"
PROJECT_VERSION="1.0.0"
ENVIRONMENT="development"
DATABASE_URL=sqlite:///./ethara.db
BACKEND_CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]

# Docker Database Configuration
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=inventory_db
DB_PORT=5432
BACKEND_PORT=8000
```

**Production Setup:**
```bash
cp .env.docker .env
```

Edit `.env` with production credentials:
```env
ENVIRONMENT="production"
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}

# Database Credentials (change these!)
DB_USER=prod_user
DB_PASSWORD=very_secure_password_here
DB_NAME=prod_inventory_db
DB_PORT=5432
BACKEND_PORT=8000
```

⚠️ **IMPORTANT:**
- Never commit `.env` file to version control
- `.env` is listed in `.gitignore` for safety
- Use `.env.example` as a template for team members
- Change all default passwords in production

## Quick Start

### Option 1: Using Management Scripts

**On Windows:**
```bash
docker-manage.bat up
```

**On Linux/macOS:**
```bash
chmod +x docker-manage.sh
./docker-manage.sh up
```

This will:
1. Check for `.env` file
2. Build the Docker image
3. Start containers with environment variables from `.env`

### Option 2: Using Docker Compose Directly

```bash
# Build image
docker-compose build

# Start containers (reads .env automatically)
docker-compose up -d

# View logs
docker-compose logs -f backend
```

## Accessing the Application

Once containers are running:

- **API**: http://localhost:8000
- **Swagger UI Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **Health Check**: http://localhost:8000/health
- **PostgreSQL**: localhost:{DB_PORT}

## Environment Variables

All configuration is managed through `.env` file:

| Variable | Purpose | Development | Production |
|----------|---------|-------------|------------|
| `PROJECT_NAME` | Application name | "Inventory & Order Management System" | "Ethara Inventory & Order Management" |
| `PROJECT_VERSION` | Version | "1.0.0" | "1.0.0" |
| `ENVIRONMENT` | Environment type | "development" | "production" |
| `DATABASE_URL` | Database connection | SQLite path | PostgreSQL URI |
| `DB_USER` | Database user | postgres | prod_user (change!) |
| `DB_PASSWORD` | Database password | postgres | ⚠️ Change in production! |
| `DB_NAME` | Database name | inventory_db | prod_inventory_db |
| `DB_PORT` | Database port | 5432 | 5432 |
| `BACKEND_PORT` | Backend port | 8000 | 8000 |
| `BACKEND_CORS_ORIGINS` | CORS allowed origins | localhost | Production domains |

## Docker Compose Services

### PostgreSQL Database
- Image: `postgres:15-alpine`
- Uses environment variables from `.env`
- Data persisted in `postgres_data` volume

### FastAPI Backend
- Built from local `Dockerfile`
- Reads all config from `.env`
- Auto-reload enabled for development
- Connected to PostgreSQL via service name

## Common Commands

### View Logs
```bash
docker-compose logs -f backend
```

### Access Backend Shell
```bash
docker-compose exec backend bash
```

### Run Database Migrations
```bash
docker-compose exec backend alembic upgrade head
```

### Stop Containers
```bash
docker-compose down
```

### Remove All Data (Careful!)
```bash
docker-compose down -v
```

## Production Deployment

### 1. Set Up Secure Environment
```bash
# Create .env with production values
cp .env.docker .env

# Edit with production credentials
nano .env
```

### 2. Build Production Image
```bash
docker build -t ethara-backend:latest .
```

### 3. Run with Docker Compose
```bash
# Make sure .env has production values
docker-compose up -d
```

### 4. Verify Services
```bash
docker-compose ps
docker-compose logs backend
```

## Security Best Practices

✅ **DO:**
- Use strong passwords for `DB_PASSWORD`
- Manage `.env` with proper access controls
- Use `.env.example` as template (without secrets)
- Rotate credentials regularly
- Use environment variables for all sensitive data
- Keep `.env` in `.gitignore`

❌ **DON'T:**
- Hardcode credentials in code
- Commit `.env` to version control
- Use default passwords in production
- Share `.env` via email or chat
- Expose sensitive data in logs
- Use same credentials across environments

## Troubleshooting

### Containers won't start - .env file missing
```bash
cp .env.example .env
# Edit .env with your configuration
docker-compose up -d
```

### Database connection errors
```bash
# Check .env DATABASE_URL is correct
cat .env | grep DATABASE_URL

# Verify PostgreSQL is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres
```

### Port conflicts
Update ports in `.env`:
```env
BACKEND_PORT=8001
DB_PORT=5433
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

### Permission denied errors
Ensure scripts are executable:
```bash
chmod +x docker-manage.sh
```

## Development Workflow

1. **Initial Setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ./docker-manage.sh up
   ```

2. **Make Changes:**
   - Edit code locally
   - Changes auto-reload in container

3. **Monitor:**
   ```bash
   docker-compose logs -f backend
   ```

4. **Test:**
   ```bash
   curl http://localhost:8000/health
   ```

5. **Cleanup:**
   ```bash
   ./docker-manage.sh down
   ```

## Environment Variables in CI/CD

For GitHub Actions, GitLab CI, or other CI/CD:

1. Add secrets in your CI/CD platform
2. Create `.env` from secrets during build:
   ```yaml
   echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env
   echo "DB_USER=${{ secrets.DB_USER }}" >> .env
   ```

3. Run docker-compose with the generated `.env`

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI with Docker](https://fastapi.tiangolo.com/deployment/docker/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [12 Factor App - Config](https://12factor.net/config)
