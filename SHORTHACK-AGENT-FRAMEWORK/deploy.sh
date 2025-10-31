#!/bin/bash

# Exit on any error
set -e

# 1. Provision and Deploy with AZD
echo "🚀 Provisioning and deploying resources with 'azd up'..."
cd infra
azd up

# 2. Get Environment Variables from AZD
echo "🔑 Fetching environment variables..."
azd env get-values > .env

# 3. Format the .env file
echo "📝 Formatting .env file..."
# The output from azd includes extra characters and lines we need to clean up.
# We'll use sed to remove unwanted lines and format it as KEY="VALUE"

# For Linux (GNU sed)
# Remove all lines except those containing AZURE_
sed -i '/AZURE_/!d' .env
# Format to KEY="VALUE"
sed -i -e 's/^/export /' -e 's/=/="/' -e 's/$/"/' .env

echo "✅ Deployment complete and .env file created successfully!"
echo "You can now run the Jupyter notebooks."
