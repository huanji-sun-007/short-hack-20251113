#!/bin/bash

# Dev container setup script
set -e

echo "� Installing npm dependencies and building the extension..."
sudo chown node node_modules
npm install

echo "✅ Dev container setup complete!"