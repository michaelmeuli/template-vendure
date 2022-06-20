import { computed } from '@vue/composition-api';
import { sharedRef, useVSFContext,  } from '@vue-storefront/core';

export const useStripe = () => {  
    const context = useVSFContext();
    const secret= sharedRef({}, 'useStripe'); 
    const set = async () => { 
        secret.value = await context.$vendure.api.setStripePayment(); 
         };

    return {
        set,
        secret:computed(() => secret.value)
        };
};