<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem
        :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''"
        icon="home"
        size="20px"
        label="Home"
      />
    </nuxt-link>
    <SfBottomNavigationItem icon="menu" size="20px" label="Menu" @click="handleMenuClick"/>
    <SfBottomNavigationItem icon="profile" size="20px" label="Account" @click="handleAccountClick"/>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem
      :label="$t('Basket')"
      icon="add_to_cart"
      @click="toggleCartSidebar"
    >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser } from '@vue-storefront/vendure';
export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const { isAuthenticated } = useUser();
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }
      toggleLoginModal();
    };
    const handleHomeClick = () => {
      isMobileMenuOpen.value ? toggleMobileMenu() : false;
      root.$router.push('/');
    };
    const handleMenuClick = async () => {
      root.$router.push('/c/atherische-ole');
    };
    return {
      isMobileMenuOpen,
      toggleWishlistSidebar,
      toggleCartSidebar,
      toggleMobileMenu,
      handleAccountClick,
      handleHomeClick,
      handleMenuClick
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
</style>
