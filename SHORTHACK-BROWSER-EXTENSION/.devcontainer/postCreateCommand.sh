#!/bin/bash

# Dev container setup script
set -e

echo "� Installing npm dependencies and building the extension..."
npm install
npm run build

echo "✅ Dev container setup complete!"