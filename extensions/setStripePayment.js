module.exports = {
  name: 'setStripePayment',
  extendApiMethods: {
    setStripePayment: async ({ context }) => {
      const request = await context.client.mutate({
        mutation: gql`mutation {createStripePaymentIntent}`,
        fetchPolicy: 'no-cache'
      });
      return request.data;
    }
  }
};
