const gql = require('graphql-tag');

module.exports = {
  integrations: {
    vendure: {
      location: '@vue-storefront/vendure-api/server',
      configuration: {
        api: {
          uri: process.env.GRAPHQL_API,
          tokenMethod: process.env.TOKEN_METHOD
        },
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'stripe-extension',
          extendApiMethods: {
            setStripePayment: async ({ client, config }) => {  
              const request = await client.mutate({mutation: gql`
                mutation {
                  createStripePaymentIntent
                }
                `, fetchPolicy: 'no-cache' });
              return request.data;
            }
          }
        }
      ]
    }
  }
};
