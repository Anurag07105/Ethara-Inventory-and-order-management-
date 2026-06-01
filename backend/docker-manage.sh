#!/bin/bash

# Ethara Backend Docker Management Script
# Usage: ./docker-manage.sh [command]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
check_env_file() {
    if [ ! -f "$SCRIPT_DIR/.env" ]; then
        echo -e "${RED}✗ Error: .env file not found${NC}"
        echo "Please create a .env file first:"
        echo "  cp .env.example .env"
        echo "  # Edit .env with your configuration"
        exit 1
    fi
}

print_help() {
    echo "Ethara Backend Docker Management"
    echo ""
    echo "Usage: ./docker-manage.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build       - Build Docker image"
    echo "  up          - Start containers (development mode with hot reload)"
    echo "  down        - Stop and remove containers"
    echo "  logs        - View logs"
    echo "  shell       - Open shell in backend container"
    echo "  migrate     - Run database migrations"
    echo "  clean       - Remove all containers and volumes"
    echo "  help        - Show this help message"
    echo ""
    echo "Configuration:"
    echo "  .env        - Development environment (used by docker-compose)"
    echo "  .env.docker - Production environment template"
    echo ""
}

build() {
    check_env_file
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker-compose build
    echo -e "${GREEN}✓ Build complete${NC}"
}

up() {
    check_env_file
    echo -e "${YELLOW}Starting containers...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✓ Containers started${NC}"
    echo ""
    echo "Backend API: http://localhost:8000"
    echo "API Docs: http://localhost:8000/api/docs"
    echo "ReDoc: http://localhost:8000/api/redoc"
}

down() {
    echo -e "${YELLOW}Stopping containers...${NC}"
    docker-compose down
    echo -e "${GREEN}✓ Containers stopped${NC}"
}

logs() {
    docker-compose logs -f backend
}

shell() {
    check_env_file
    docker-compose exec backend bash
}

migrate() {
    check_env_file
    echo -e "${YELLOW}Running database migrations...${NC}"
    docker-compose exec backend alembic upgrade head
    echo -e "${GREEN}✓ Migrations complete${NC}"
}

clean() {
    echo -e "${RED}Warning: This will remove all containers, volumes, and data${NC}"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        echo -e "${GREEN}✓ Cleanup complete${NC}"
    fi
}

# Main script logic
case "${1:-help}" in
    build)
        build
        ;;
    up)
        build
        up
        ;;
    down)
        down
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    migrate)
        migrate
        ;;
    clean)
        clean
        ;;
    help|*)
        print_help
        ;;
esac
