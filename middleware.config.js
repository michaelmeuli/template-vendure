module.exports = {
  integrations: {
    vendure: {
      location: '@mmeuli/vendure-api/server',
      configuration: {
        api: {
          uri: process.env.GRAPHQL_API,
          tokenMethod: process.env.TOKEN_METHOD
        },
      }
    }
  }
};
