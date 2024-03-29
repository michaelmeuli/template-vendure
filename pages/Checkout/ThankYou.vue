<template>
  <div id="thank-you">
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
          <strong>&nbsp;{{ order.number}}</strong>
        </div>
      </template>
    </SfCallToAction>

    <div v-if="isSwissqrinvoice" class="invoice">
      <pdf :src="url"></pdf>
      <a :href="url" target="_blank">
        <SfButton class="download_qr-bill-button button-size">
          Download QR-Rechnung
        </SfButton>
      </a>
      <p>
        Die QR-Rechnung wurde dir auch per E-Mail geschickt und kann bequem mit ihrer Banken-App eingelesen werden.
      </p>
      <p>
        Eventuell landete die QR-Rechnung per E-Mail im Spam Ordner.
      </p>
      <p>
        Die Ware wird sofort nach Bestelleingang reserviert.
      </p>
      <p>
        Der Versand erfolgt nach Zahlungseingang.
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
import { PDF, BlobStream } from 'swissqrbill';
import { useShipping, userShippingGetters } from '@vue-storefront/vendure';
import { ref, reactive, onMounted, computed } from '@vue/composition-api';
import pdf from 'vue-pdf';

export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction,
    pdf
  },
  name: 'ThankYou',
  setup(props, context) {
    const { shipping: shippingDetails, load: loadShipping } = useShipping();
    const url = ref('');

    const getShippingDetails = async () => {
      if (!shippingDetails.value) {
        await loadShipping();
      }
    };
    getShippingDetails();

    const data = {
      currency: 'CHF',
      amount: parseFloat(context.root.$route.query.total),
      additionalInformation: context.root.$route.query.order,
      creditor: {
        name: 'Jessica Meuli',
        address: 'Sonnenhaldenstrasse 5',
        zip: 8360,
        city: 'Wallenwil',
        account: 'CH14 0078 1612 4519 5200 2',
        country: 'CH',
      },
      debtor: {
        name: shippingDetails.value.fullName || '',
        address: shippingDetails.value.streetLine1 || '',
        zip: shippingDetails.value.postalCode || '',
        city: shippingDetails.value.city || '',
        country: 'CH',
      },
    }

    const stream = new BlobStream();
    const pdf = new PDF(data, stream);
    pdf.on('finish', () => {
      url.value = stream.toBlobURL('application/pdf');
    });

    const isSwissqrinvoice = context.root.$route.query.payway === 'swissqrinvoice';

    return {
      address: {
        name: 'Jessica Meuli',
        street: 'Sonnenhaldenstrasse 5',
        city: '8360 Wallenwil',
        email: 'yoga.lichtquelle@gmail.com'
      },
      order: {
        number: `#${context.root.$route.query.order}`
      },
      isSwissqrinvoice,
      data,
      url
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
