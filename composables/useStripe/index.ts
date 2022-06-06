import { computed } from '@vue/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';

const useStripe = () => {
  const { $vendure } = useVSFContext();
    const secret= sharedRef({}, 'useStripe');
    const set = async () => {
        secret.value = await $vendure.api.setStripePayment();
         };

    return {
        set,
        secret:computed(() => secret.value)
        };
};

export default useStripe;
