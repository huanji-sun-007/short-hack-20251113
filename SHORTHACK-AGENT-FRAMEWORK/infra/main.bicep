targetScope = 'subscription'

param location string = 'eastus'
param resourceGroupName string

resource rg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module foundry 'modules/foundry.bicep' = {
  name: 'foundryDeployment'
  scope: rg
  params: {
    location: location
  }
}

output AZURE_OPENAI_ENDPOINT string = foundry.outputs.openAiEndpoint
output AZURE_OPENAI_DEPLOYMENT_NAME string = foundry.outputs.openAiDeploymentName
output AZURE_OPENAI_CHAT_DEPLOYMENT_NAME string = foundry.outputs.openAiDeploymentName
output AZURE_OPENAI_RESPONSES_DEPLOYMENT_NAME string = foundry.outputs.openAiDeploymentName
output AZURE_OPENAI_API_VERSION string = foundry.outputs.openAiApiVersion
output AZURE_OPENAI_ACCOUNT_NAME string = foundry.outputs.openAiAccountName
