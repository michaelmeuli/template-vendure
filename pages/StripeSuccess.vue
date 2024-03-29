<template>
  <div v-if="isSuccess" id="thank-you">
    <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      :title="$t('Thank you for your order!')"
      :image="{
        mobile: '/thankyou/bannerMyl.png',
        desktop: '/thankyou/bannerDyl.png',
      }"
    >
      <template #description>
        <div class="banner__order-number">
          <span>{{ $t('Order No.') }}</span>
          <strong>&nbsp;{{ ordercode }}</strong>
        </div>
      </template>
    </SfCallToAction>

    <div class="invoice">
      <p>
        Zahlung erfolgreich.
      </p>
      <p>
        Die Bestellbestätigung wurde Ihnen auch per E-Mail geschickt.
      </p>
      <p>
        Eventuell landete die Bestellbestätigung im Spam Ordner.
      </p>
      <p>
        Bei Fragen wenden Sie sich bitte an: yoga.lichtquelle@gmail.com
      </p>

    </div>

    <SfButton link="/" class="sf-button back-button color-secondary button-size">{{ $t('Back to homepage') }}</SfButton>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/vendure';
import { ref, onMounted } from '@vue/composition-api';

export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction
  },
  name: 'StripeSuccess',
  setup(props, context) {
    const payment_intent = context.root.$route.query.payment_intent;
    const payment_intent_client_secret = context.root.$route.query.payment_intent_client_secret;
    const redirect_status = context.root.$route.query.redirect_status;

    const isSuccess = redirect_status === 'succeeded';
    const { cart, load } = useCart();
    const ordercode = ref('');

    onMounted(async () => {
      await load();
      ordercode.value = `#${cart?.value.code}`;
      console.log('ordercode: ', ordercode.value);
    });

    return {
      payment_intent,
      payment_intent_client_secret,
      redirect_status,
      isSuccess,
      ordercode
    };
  }
};

</script>

<style lang="scss" scoped>
#thank-you {
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
.download_qr-bill-button {
  margin: 2rem auto 3.75rem;
}
.invoice {
  text-align: center;
}
</style>

