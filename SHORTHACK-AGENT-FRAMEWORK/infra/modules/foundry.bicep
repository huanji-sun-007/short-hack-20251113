param location string
param openAiAccountName string = 'oai-${uniqueString(resourceGroup().id)}'
param openAiDeploymentName string = 'gpt-4o'
param openAiModelVersion string = '2024-11-20'
param openAiApiVersion string = '2025-03-01-preview'
param projectName string = 'project-${uniqueString(resourceGroup().id)}'
param projectDescription string = 'Azure AI Foundry project for agent framework training'
param projectDisplayName string = 'Agent Framework Project'

resource openAiAccount 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: openAiAccountName
  location: location
  kind: 'AIServices'
  sku: {
    name: 'S0'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    customSubDomainName: openAiAccountName
    publicNetworkAccess: 'Enabled'
    allowProjectManagement: true
    disableLocalAuth: false
  }
}

resource openAiDeployment 'Microsoft.CognitiveServices/accounts/deployments@2025-04-01-preview' = {
  parent: openAiAccount
  name: openAiDeploymentName
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: openAiModelVersion
    }
  }
  sku: {
    name: 'Standard'
    capacity: 100
  }
}

resource aiFoundryProject 'Microsoft.CognitiveServices/accounts/projects@2025-04-01-preview' = {
  parent: openAiAccount
  name: projectName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    description: projectDescription
    displayName: projectDisplayName
  }
}

output openAiEndpoint string = openAiAccount.properties.endpoint
output openAiDeploymentName string = openAiDeployment.name
output openAiApiVersion string = openAiApiVersion
output openAiAccountName string = openAiAccount.name
output projectName string = aiFoundryProject.name
output projectEndpoint string = 'https://${openAiAccountName}.services.ai.azure.com/api/projects/${projectName}'
output projectId string = aiFoundryProject.id

@secure()
output openAiKey string = openAiAccount.listKeys().key1
