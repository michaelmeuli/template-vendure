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
            setStripePayment: async (context) => {
              const request = await context.client.mutate({
                mutation: gql`mutation {createStripePaymentIntent}`,
                fetchPolicy: NO_CACHE_FETCH_POLICY
              });
              return request.data;
            }
          }
        }
      ],
    }
  }
};
