targetScope = 'resourceGroup'

@description('The location where resources will be deployed')
param location string = resourceGroup().location

module foundry 'modules/foundry.bicep' = {
  name: 'foundryDeployment'
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
output AZURE_AI_PROJECT_NAME string = foundry.outputs.projectName
output AZURE_AI_PROJECT_ENDPOINT string = foundry.outputs.projectEndpoint
output AZURE_AI_PROJECT_ID string = foundry.outputs.projectId
