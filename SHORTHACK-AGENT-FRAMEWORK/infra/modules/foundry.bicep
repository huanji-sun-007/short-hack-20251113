param location string
param openAiAccountName string = 'oai-${uniqueString(resourceGroup().id)}'
param openAiDeploymentName string = 'gpt-4o'

resource openAiAccount 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAiAccountName
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: openAiAccountName
    publicNetworkAccess: 'Enabled'
  }
}

resource openAiDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAiAccount
  name: openAiDeploymentName
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: '2024-05-13'
    }
  }
  sku: {
    name: 'Standard'
    capacity: 20
  }
}

output openAiEndpoint string = openAiAccount.properties.endpoint
output openAiDeploymentName string = openAiDeployment.name

@secure()
output openAiKey string = openAiAccount.listKeys().key1
