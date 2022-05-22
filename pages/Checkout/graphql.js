import gql from "graphql-tag";

export const CREATE_STRIPE_PAYMENT_INTENT_MUTATION = gql`
  mutation CreateStripePaymentIntentMutation() {
    createStripePaymentIntent() {
      createStripePaymentIntent
    }
  }
`;
