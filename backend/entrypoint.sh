#!/bin/sh

set -e

echo "Applying database migrations..."
python manage.py migrate

echo "Creating admin user..."
python manage.py create_admin

exec "$@"