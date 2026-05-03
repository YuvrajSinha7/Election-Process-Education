#!/bin/sh
set -e

echo "Running Database Migrations..."
npx prisma db push || echo "Warning: Prisma DB push failed, skipping..."

echo "Seeding Database..."
npx prisma db seed || echo "Warning: Prisma DB seed failed, skipping..."

echo "Fixing Permissions..."
chown -R nextjs:nodejs /app

echo "Starting Server..."
exec su-exec nextjs node server.js
