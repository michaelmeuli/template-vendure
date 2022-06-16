import { ApiClientExtension } from '@vue-storefront/core';
import gql from 'graphql-tag';

export const stripeExtension: ApiClientExtension = {
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

