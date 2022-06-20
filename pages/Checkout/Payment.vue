<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Payment')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">{{ $t('Item') }}</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage :src="cartGetters.getItemImage(product)" :alt="cartGetters.getItemName(product)" />
        </SfTableData>
        <SfTableData class="table__data table__description table__data">
          <div class="product-title">{{ cartGetters.getItemName(product) }}</div>
          <div class="product-sku">{{ cartGetters.getItemSku(product) }}</div>
          <SfProperty
            v-for="(attribute, key) in cartGetters.getItemOptions(product)"
            :key="key"
            :name="attribute.label"
            :value="attribute.value"
          />
        </SfTableData>
        <SfTableData class="table__data">{{ cartGetters.getItemQty(product) }}</SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            :name="$t('Subtotal')"
            :value="$n(totals.special > 0 ? totals.special : totals.subtotal, 'currency')"
            class="sf-property--full-width property"
          />
        </div>

        <SfDivider />

        <SfProperty
          :name="$t('Total price')"
          :value="$n(totals.subtotal, 'currency')"
          class="sf-property--full-width sf-property--large summary__property-total"
        />

        <VsfPaymentProvider @paymentMethodSelected="updatePaymentMethod"/>

        <div class="summary__action">
          <SfButton
            type="button"
            class="sf-button color-secondary summary__back-button"
            @click="$router.push('/checkout/billing')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'make-an-order'"
            :disabled="!paymentMethod || !terms"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Make an order') }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed } from '@vue/composition-api';
import { useMakeOrder, useCart, cartGetters, usePayment } from '@vue-storefront/vendure';
import { useStripe } from '@/composables/useStripe';

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider')
  },
  setup(props, context) {
    const { cart, load, setCart } = useCart();
    const { set } = usePayment();
    const { loading } = useMakeOrder();

    const terms = ref(true);
    const paymentMethod = ref(null);

    onSSR(async () => {
      await load();
    });

    const updatePaymentMethod = method => {
      paymentMethod.value = method;
    };

    const totalsref = computed(() => cartGetters.getTotals(cart.value));
    const totals = totalsref.value

    const processOrder = async () => {
      const response = await set({
        method: paymentMethod?.value?.code,
        metadata: {
          // Here you would pass data from an external Payment Provided after successful payment process like payment id.
        }
      });

      const thankYouPath = { name: 'thank-you', query: { order: response?.code, payway: paymentMethod?.value?.code, total: totals.total }};
      context.root.$router.push(context.root.localePath(thankYouPath));
      setCart(null);



    const stripeLoading = ref(false);
    const { set: setStripe, secret } = useStripe();
    const stripeInit = () => {
        const paymentElement = elem.value.create("payment");
        paymentElement.mount("#payment-element");
        stripeInterfaceLoaded.value = true;
        };

    //this code uses the Stripe elements form, for more info and options refer to:https://stripe.com/docs/payments/elements
    const elem = computed(() => {
    if (secret.value.createStripePaymentIntent) {
      console.log('secret.value.createStripePaymentIntent: ', secret.value.createStripePaymentIntent);
        return app.stripe.elements({
            clientSecret: secret.value.createStripePaymentIntent,
            });
        }
    });

    onMounted(async () => {
        await setStripe();
        stripeInit(); //when using the nuxtjs stripe plugin (nuxt-stripe-plugin)
        });

    //

    //Payment validation method example
    const validation = async () => {
        stripeLoading.value = true;
        const { error } = await app.stripe.confirmPayment({
            elements: elem.value,
            confirmParams: {
                return_url: `your return URL`,
                },
            });
        showError(error);
        stripeLoading.value = false;
        };

    //Error handling code example
    const errorMessage = ref("");
    const showError = (error) => {
        if (error.type === "card_error" || error.type === "validation_error") {
            errorMessage.value = error.message;
            }
        else {
            errorMessage.value = "An unexpected error occured.";
            }

 };


    };

    return {
      terms,
      loading,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      cartGetters,
      processOrder,
      updatePaymentMethod,
      paymentMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
  margin-bottom: var(--spacer-base);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}
</style>
