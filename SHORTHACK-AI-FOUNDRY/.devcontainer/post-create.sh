#!/bin/bash

# Azure AI Foundry Workshop - DevContainer Post-Create Script
echo "🚀 Setting up Azure AI Foundry Workshop environment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# Install additional system dependencies
echo "🔧 Installing system dependencies..."
sudo apt-get install -y \
    build-essential \
    curl \
    wget \
    git \
    vim \
    nano \
    jq \
    tree \
    htop \
    unzip \
    software-properties-common

# Upgrade pip and install wheel
echo "🐍 Upgrading pip and setuptools..."
python -m pip install --upgrade pip setuptools wheel

# Install Python dependencies
echo "📚 Installing Python packages for Azure AI Foundry Workshop..."
pip install -r requirements.txt
echo "✅ Installed packages from requirements.txt"