<template>
  <div id="stripe">
    <stripe-element-payment
      ref="paymentRef"
      :pk="publishableKey"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />
    <SfButton
      class="stripe-button button-size"
      @click="pay"
    >
      Jetzt bezahlen
    </SfButton>
  </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe';
import { SfButton } from '@storefront-ui/vue';

export default {
  components: {
    StripeElementPayment,
    SfButton
  },
  name: 'Stripe',
  setup(props, context) {
    const publishableKey = context.root.$route.query.publishableKey;
    const elementsOptions = {
      appearance: {}, // appearance options
      clientSecret: context.root.$route.query.stripePaymentIntent,
    };
    const confirmParams = {
      return_url: 'http://localhost:3001/stripe-success',
    };

    return {
      publishableKey,
      elementsOptions,
      confirmParams
    };
  },
  methods: {
    pay () {
      this.$refs.paymentRef.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
#stripe {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}
.heading {
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-padding: var(--spacer-sm) 0 var(--spacer-xs) 0;
  }
}
.paragraph {
  margin: 0;
  color: var(--c-link);
  font: var(--font-weight--normal) var(--font-size--base) / 1.6
    var(--font-family--primary);
  @include for-desktop {
    font-weight: var(--font-weight--light);
    font-size: var(--font-size--sm);
    margin-bottom: var(--spacer-lg);
  }
}
.banner {
  --call-to-action-color: var(--c-text);
  --call-to-action-title-font-size: var(--h2-font-size);
  --call-to-action-title-font-weight: var(--font-weight--semibold);
  --call-to-action-text-container-width: 50%;
  @include for-desktop {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__order-number {
    display: flex;
    flex-direction: column;
    font: var(--font-weight--light) var(--font-size--sm) / 1.4
      var(--font-family--primary);
    @include for-desktop {
      flex-direction: row;
      font-size: var(--font-size--normal);
    }
  }
}
.section {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @include for-desktop {
    flex-direction: row;
    padding: 0;
    background: var(--c-light);
  }
}
.order {
  background: var(--c-light);
  padding-bottom: var(--spacer-sm);
  @include for-desktop {
    width: 100%;
    padding: var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl)
      var(--spacer-2xl);
  }
  &__heading {
    --heading-title-font-weight: var(--font-weight--bold);
    @include for-desktop {
      --heading-title-color: var(--c-link);
      --heading-title-font-weight: var(--font-weight--swemibold);
    }
  }
  &__heading,
  &__paragraph,
  &__contact {
    @include for-mobile {
      margin: 0;
      padding-left: var(--spacer-sm);
      padding-right: var(--spacer-sm);
    }
  }
  &__contact {
    padding-bottom: var(--spacer-base);
    --heading-title-font-size: var(--font-size--lg);
    --heading-title-font-weight: var(--font-weight--medium);
    @include for-desktop {
      --heading-title-font-size: var(--font-size--base);
      --heading-title-font-weight: var(--font-weight--normal);
      padding: 0 var(--spacer-sm);
      border: 2px solid var(--c-white);
      border-width: 2px 0 2px 0;
    }
  }
  &__notifications-button {
    --button-width: calc(100% - var(--spacer-lg));
    margin: 0 auto;
    @include for-desktop {
      margin: var(--spacer-xl) 0 0 0;
    }
  }
}
.contact {
  color: var(--c-dark-variant);
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);
  @include for-desktop {
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--sm);
  }
  &__name,
  &__street,
  &__city {
    margin: 0;
  }
  &__email {
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin-bottom: var(--spacer-sm);
    }
  }
  &__name,
  &__street,
  &__city,
  &__email {
    font-size: var(--font-size--sm);
  }
}
.additional-info {
  --heading-title-font-weight: var(--font-weight--bold);
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl)
      var(--spacer-2xl);
  }
}
.feedback-button {
  margin: var(--spacer-xl) 0 var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-base) 0 0 0;
  }
}
.back-button {
  --button-width: calc(100% - var(--spacer-lg));
  margin: 0 auto var(--spacer-sm) auto;
  @include for-desktop {
    margin: var(--spacer-xl) auto;
    &:hover {
      color: var(--c-white);
    }
  }
}
.button-size {
  @include for-desktop {
    --button-width: 25rem;
  }
}
.stripe-button {
  margin: 2rem auto 3.75rem;
}
.invoice {
  text-align: center;
}
</style>
