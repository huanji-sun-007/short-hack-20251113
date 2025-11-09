param location string
param openAiAccountName string = 'oai-${uniqueString(resourceGroup().id)}'
param openAiDeploymentName string = 'gpt-4o'
param openAiModelVersion string = '2024-11-20'
param openAiApiVersion string = '2025-03-01-preview'
param projectName string = 'project-${uniqueString(resourceGroup().id)}'
param projectDescription string = 'Azure AI Foundry project for agent framework training'
param projectDisplayName string = 'Agent Framework Project'
param principalId string = ''

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

// Azure AI Developer role for the current user (for local development)
resource userDeveloperRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (principalId != '') {
  name: guid(openAiAccount.id, principalId, 'Azure AI Developer User')
  scope: openAiAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '64702f94-c441-49e6-a78b-ef80e0188fee') // Azure AI Developer
    principalId: principalId
    principalType: 'User'
  }
}

// Cognitive Services OpenAI User role for the current user (for local development)
resource userOpenAIUserRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (principalId != '') {
  name: guid(openAiAccount.id, principalId, 'Cognitive Services OpenAI User User')
  scope: openAiAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '5e0bd9bd-7b93-4f28-af87-19fc36ad61bd') // Cognitive Services OpenAI User
    principalId: principalId
    principalType: 'User'
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
