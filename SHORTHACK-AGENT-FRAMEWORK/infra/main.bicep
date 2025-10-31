targetScope = 'subscription'

// PARAMETERS
param environmentName string = 'aifoundry'
param location string = deployment().location

// MODULES
module rg 'resources/resource-group.bicep' = {
  name: 'resource-group'
  params: {
    environmentName: environmentName
    location: location
  }
}

module cognitiveServices 'resources/cognitive-services.bicep' = {
  name: 'cognitive-services'
  scope: resourceGroup(rg.outputs.name)
  params: {
    name: 'cs-${environmentName}'
    location: location
  }
}

module openAi 'resources/openai.bicep' = {
  name: 'openai'
  scope: resourceGroup(rg.outputs.name)
  params: {
    name: 'oai-${environmentName}'
    location: location
    cognitiveServicesName: cognitiveServices.outputs.name
  }
}

// OUTPUTS
output AZURE_OPENAI_API_KEY string = cognitiveServices.outputs.key
output AZURE_OPENAI_ENDPOINT string = cognitiveServices.outputs.endpoint
output AZURE_OPENAI_DEPLOYMENT_NAME string = openAi.outputs.deploymentName
