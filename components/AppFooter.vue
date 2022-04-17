<template>
  <SfFooter :column="4" multiple class="footer">
    <SfFooterColumn :title="$t('About us')">
      <SfList>
        <SfListItem>
            <router-link to="/page/impressum" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="'Impressum'"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/privacypolicy" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="'Datenschutzerklärung'"
              />
            </router-link>
          </SfListItem>
          <SfListItem>
            <router-link to="/tech" exact>
              <SfMenuItem
                class="sf-footer__menu-item"
                :label="'Source code'"
              />
            </router-link>
          </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';
export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  data() {
    return {
      departments: ['Women fashion', 'Men fashion', 'Kidswear', 'Home'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">
.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
