param location string
param openAiAccountName string = 'oai-${uniqueString(resourceGroup().id)}'
param openAiDeploymentName string = 'gpt-4o'
param openAiModelVersion string = '2024-11-20'
param openAiApiVersion string = '2025-03-01-preview'

resource openAiAccount 'Microsoft.CognitiveServices/accounts@2025-04-01-preview' = {
  name: openAiAccountName
  location: location
  kind: 'AIServices'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: openAiAccountName
    publicNetworkAccess: 'Enabled'
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
    capacity: 20
  }
}

output openAiEndpoint string = openAiAccount.properties.endpoint
output openAiDeploymentName string = openAiDeployment.name
output openAiApiVersion string = openAiApiVersion
output openAiAccountName string = openAiAccount.name

@secure()
output openAiKey string = openAiAccount.listKeys().key1
