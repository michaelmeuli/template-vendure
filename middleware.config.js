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
              console.log('setStripePayment called');
              const request = await context.client.mutate({
                mutation: gql`
                  mutation {
                    createStripePaymentIntent
                  }
                `,
                fetchPolicy: 'no-cache',
              });
              return request.data;
            }
          }
        }
      ],
    }
  }
};
