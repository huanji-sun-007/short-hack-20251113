#!/bin/bash
# Deploys AI Foundry and retrieves environment variables for AI endpoints and key

set -e

azd provision

# Extract only the required variables into .env
AZURE_RESOURCE_GROUP=$(azd env get-value AZURE_RESOURCE_GROUP)
AZURE_OPENAI_ACCOUNT_NAME=$(azd env get-value AZURE_OPENAI_ACCOUNT_NAME)

# Get the necessary values
AZURE_AI_MODEL_DEPLOYMENT_NAME=$(azd env get-value AZURE_AI_MODEL_DEPLOYMENT_NAME)
AZURE_AI_PROJECT_ENDPOINT=$(azd env get-value AZURE_AI_PROJECT_ENDPOINT)
AZURE_OPENAI_API_VERSION=$(azd env get-value AZURE_OPENAI_API_VERSION)
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=$(azd env get-value AZURE_OPENAI_CHAT_DEPLOYMENT_NAME)
AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME=$(azd env get-value AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME)
AZURE_OPENAI_ENDPOINT=$(azd env get-value AZURE_OPENAI_ENDPOINT)
AZURE_OPENAI_API_KEY=$(az cognitiveservices account keys list -g $AZURE_RESOURCE_GROUP -n $AZURE_OPENAI_ACCOUNT_NAME --query "key1" -o tsv)

# Write to .env file
cat > .env << EOF
AZURE_AI_MODEL_DEPLOYMENT_NAME="$AZURE_AI_MODEL_DEPLOYMENT_NAME"
AZURE_AI_PROJECT_ENDPOINT="$AZURE_AI_PROJECT_ENDPOINT"
AZURE_OPENAI_API_VERSION="$AZURE_OPENAI_API_VERSION"
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME="$AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"
AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME="$AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME"
AZURE_OPENAI_API_KEY="$AZURE_OPENAI_API_KEY"
AZURE_OPENAI_ENDPOINT="$AZURE_OPENAI_ENDPOINT"
EOF

# Assign roles to the signed-in user to be able to create agents within AI Foundry, necessary for cases using AzureAIAgentClient
AZURE_SUBSCRIPTION_ID=$(azd env get-value AZURE_SUBSCRIPTION_ID)
AZURE_PRINCIPAL_ID=$(az ad signed-in-user show --query id -o tsv)
az role assignment create --assignee $AZURE_PRINCIPAL_ID --role "Azure AI Developer" --scope /subscriptions/$AZURE_SUBSCRIPTION_ID/resourceGroups/$AZURE_RESOURCE_GROUP
az role assignment create --assignee $AZURE_PRINCIPAL_ID --role "Azure AI User" --scope /subscriptions/$AZURE_SUBSCRIPTION_ID/resourceGroups/$AZURE_RESOURCE_GROUP

echo "Deployment complete. Environment variables saved to .env file."