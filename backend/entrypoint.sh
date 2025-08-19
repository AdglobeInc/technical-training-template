#!/bin/sh

set -e

echo "Applying database migrations..."
python src/manage.py migrate

echo "Creating admin user..."
python src/manage.py create_admin

exec "$@"