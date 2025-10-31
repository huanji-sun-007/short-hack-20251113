#!/bin/bash
# Deploys AI Foundry and retrieves environment variables for AI endpoints and key

azd provision
azd env get-values > .env
. load_env.sh

AZURE_OPENAI_API_KEY=$(az cognitiveservices account keys list -g $AZURE_RESOURCE_GROUP -n $AZURE_OPENAI_ACCOUNT_NAME --query "key1" -o tsv)
echo "AZURE_OPENAI_API_KEY=\"$AZURE_OPENAI_API_KEY\"" >> .env

echo "Execute \". load_env.sh\" to load environment variables."