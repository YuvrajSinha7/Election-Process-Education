#!/bin/sh
set -e

echo "Running Database Migrations..."
npx prisma db push

echo "Seeding Database..."
npx prisma db seed

echo "Fixing Permissions..."
chown -R nextjs:nodejs /app

echo "Starting Server..."
exec su-exec nextjs node server.js
