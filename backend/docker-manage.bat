@echo off
REM Ethara Backend Docker Management Script (Windows)
REM Usage: docker-manage.bat [command]

setlocal enabledelayedexpansion

if "%~1"=="" (
    call :print_help
    exit /b 0
)

if /i "%~1"=="build" (
    call :check_env
    if !errorlevel! neq 0 exit /b 1
    call :build
) else if /i "%~1"=="up" (
    call :check_env
    if !errorlevel! neq 0 exit /b 1
    call :build
    call :up
) else if /i "%~1"=="down" (
    call :down
) else if /i "%~1"=="logs" (
    call :logs
) else if /i "%~1"=="shell" (
    call :check_env
    if !errorlevel! neq 0 exit /b 1
    call :shell
) else if /i "%~1"=="migrate" (
    call :check_env
    if !errorlevel! neq 0 exit /b 1
    call :migrate
) else if /i "%~1"=="clean" (
    call :clean
) else if /i "%~1"=="help" (
    call :print_help
) else (
    echo Unknown command: %~1
    call :print_help
    exit /b 1
)

exit /b 0

:check_env
if not exist ".env" (
    echo [ERROR] .env file not found
    echo.
    echo Please create a .env file first:
    echo   copy .env.example .env
    echo   REM Edit .env with your configuration
    echo.
    exit /b 1
)
exit /b 0

:print_help
echo Ethara Backend Docker Management
echo.
echo Usage: docker-manage.bat [command]
echo.
echo Commands:
echo   build       - Build Docker image
echo   up          - Start containers (development mode with hot reload)
echo   down        - Stop and remove containers
echo   logs        - View logs
echo   shell       - Open shell in backend container
echo   migrate     - Run database migrations
echo   clean       - Remove all containers and volumes
echo   help        - Show this help message
echo.
echo Configuration:
echo   .env        - Development environment (used by docker-compose)
echo   .env.docker - Production environment template
echo.
exit /b 0

:build
echo Building Docker image...
docker-compose build
echo Build complete
exit /b 0

:up
echo Starting containers...
docker-compose up -d
echo Containers started
echo.
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/api/docs
echo ReDoc: http://localhost:8000/api/redoc
exit /b 0

:down
echo Stopping containers...
docker-compose down
echo Containers stopped
exit /b 0

:logs
docker-compose logs -f backend
exit /b 0

:shell
docker-compose exec backend bash
exit /b 0

:migrate
echo Running database migrations...
docker-compose exec backend alembic upgrade head
echo Migrations complete
exit /b 0

:clean
echo Warning: This will remove all containers, volumes, and data
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%"=="y" (
    docker-compose down -v
    echo Cleanup complete
)
exit /b 0
