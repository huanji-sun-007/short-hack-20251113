#!/bin/bash

# Dev container setup script
set -e

echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
pip install -r .devcontainer/requirements.txt

#!/bin/bash

# Dev container setup script
set -e

echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
pip install -r .devcontainer/requirements.txt

echo "🔧 Configuring Git..."
# Set up Git configuration from environment variables or defaults
if [ -n "$GIT_AUTHOR_NAME" ] && [ -n "$GIT_AUTHOR_EMAIL" ]; then
    echo "📋 Setting Git configuration from environment variables..."
    git config --global user.name "$GIT_AUTHOR_NAME"
    git config --global user.email "$GIT_AUTHOR_EMAIL"
elif [ -n "$GIT_COMMITTER_NAME" ] && [ -n "$GIT_COMMITTER_EMAIL" ]; then
    echo "📋 Setting Git configuration from committer environment variables..."
    git config --global user.name "$GIT_COMMITTER_NAME"
    git config --global user.email "$GIT_COMMITTER_EMAIL"
else
    echo "⚠️  No Git environment variables found. Trying to detect from workspace git config..."
    # Try to get git config from the workspace repository
    REPO_USER_NAME=$(git config user.name 2>/dev/null || echo "")
    REPO_USER_EMAIL=$(git config user.email 2>/dev/null || echo "")
    
    if [ -n "$REPO_USER_NAME" ] && [ -n "$REPO_USER_EMAIL" ]; then
        echo "📋 Found Git config in repository, setting globally..."
        git config --global user.name "$REPO_USER_NAME"
        git config --global user.email "$REPO_USER_EMAIL"
    else
        echo "⚠️  No Git configuration detected. You'll need to set it manually:"
        echo "    git config --global user.name 'Your Name'"
        echo "    git config --global user.email 'your.email@example.com'"
    fi
fi

# Set line ending configuration for cross-platform development
echo "🔧 Setting Git line ending configuration..."
git config --global core.autocrlf input 2>/dev/null || true
git config --global core.eol lf 2>/dev/null || true

echo "✅ Dev container setup complete!"