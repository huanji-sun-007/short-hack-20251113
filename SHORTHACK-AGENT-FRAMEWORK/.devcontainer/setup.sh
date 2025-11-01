#!/bin/bash

# Dev container setup script
set -e

echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
pip install -r .devcontainer/requirements.txt

echo "🔧 Configuring Git for consistent line endings..."
git config --global core.autocrlf input
git config --global core.eol lf

echo "✅ Dev container setup complete!"