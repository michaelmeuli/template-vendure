<template>
  <div id="static">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <SfContentPages
      :active="$t(activePage)"
      :title="$t(activePage)"
      @click:change="changeActivePage"
    >
      <SfContentPage
        v-for="(page, key) in pages"
        :key="key"
        :title="$t(page.title)"
      >
        <template v-if="page.content[0] && typeof page.content[0] === 'string'">
          <SfHeading
          :title="$t(page.subtitle)"
          :level="3"/>
          <p
            v-for="(paragraph, index) in page.content"
            :key="index"
            class="paragraph paragraph--without-tab"
          >
            {{ paragraph }}
          </p>
        </template>
        <template v-else>
          <SfTabs :open-tab="1">
            <SfTab
              v-for="(tab, index) in page.content"
              :key="index"
              :title="tab.tabName"
            >
              <p
                v-for="(paragraph, i) in tab.tabContent"
                :key="i"
                class="paragraph"
              >
                {{ paragraph }}
              </p>
            </SfTab>
          </SfTabs>
        </template>
      </SfContentPage>
    </SfContentPages>
  </div>
</template>
<script>
import { SfContentPages, SfTabs, SfBreadcrumbs, SfHeading } from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
export default {
  name: 'Static',
  components: {
    SfContentPages,
    SfTabs,
    SfBreadcrumbs,
    SfHeading
  },
  head () {
    return {
      title: this.activePage,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    };
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const activePage = computed(() => {
      const { pageName } = $route.params;
      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replaceAll('-', ' ');
      }
      return 'About';
    });
    const changeActivePage = async (title) => {
      $router.push(`/page/${(title || '').toLowerCase().replaceAll(' ', '-')}`);
    };
    return { changeActivePage, activePage };
  },
  data() {
    return {
      breadcrumbs: [
        { text: 'Home', route: { link: '#' } },
        { text: this.activePage, route: { link: '#' } }
      ],
      pages: [
        {
          title: 'Impressum',
          subtitle: 'Adresse',
          content: [
            'Yoga Lichtquelle Jessica Meuli',
            'Jessica Meuli',
            'Sonnenhaldenstrasse 5',
            '8360 Wallenwil',
            'UID: CHE-154.780.687',
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#static {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 0 auto;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.paragraph {
  margin: var(--spacer-sm) 0;
  &:first-child {
    margin: 0 0 var(--spacer-sm) 0;
  }
  &--without-tab {
    @include for-mobile {
      padding: 0 var(--spacer-sm);
    }
  }
}
</style>
