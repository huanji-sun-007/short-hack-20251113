#!/bin/bash
# Deploys AI Foundry and retrieves environment variables for AI endpoints and key

set -e

# Get the current user's principal ID (object ID)
AZURE_PRINCIPAL_ID=$(az ad signed-in-user show --query id -o tsv)
azd env set AZURE_PRINCIPAL_ID $AZURE_PRINCIPAL_ID

azd provision
azd env get-values > .env

AZURE_RESOURCE_GROUP=$(azd env get-value AZURE_RESOURCE_GROUP)
AZURE_OPENAI_ACCOUNT_NAME=$(azd env get-value AZURE_OPENAI_ACCOUNT_NAME)
AZURE_OPENAI_API_KEY=$(az cognitiveservices account keys list -g $AZURE_RESOURCE_GROUP -n $AZURE_OPENAI_ACCOUNT_NAME --query "key1" -o tsv)
echo "AZURE_OPENAI_API_KEY=\"$AZURE_OPENAI_API_KEY\"" >> .env