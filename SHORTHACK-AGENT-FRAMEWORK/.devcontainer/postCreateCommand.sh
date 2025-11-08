#!/bin/bash

# Dev container setup script
set -e

echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Dev container setup complete!"