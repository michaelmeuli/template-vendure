import { computed } from '@vue/composition-api';
import { sharedRef, useVSFContext,  } from '@vue-storefront/core';

export const useStripe = () => {
    const { $vendure } = useVSFContext();
    const secret= sharedRef({}, 'useStripe');
    const set = async () => {
        console.log('going to call setStripePayment');
        secret.value = await $vendure.api.setStripePayment();
        console.log('secret.value: ', secret.value);
         };

    return {
        set,
        secret:computed(() => secret.value)
        };
};
