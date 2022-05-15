<template>
  <div id="home">
    <div class="cards">
      <div class="card">
        <LazyHydrate when-visible>
          <SfCard
            :title="card1.title"
            :titleLevel="card1.titleLevel"
            :image="card1.image"
            :imageWidth="card1.imageWidth"
            :imageHeight="card1.imageHeight"
            :description="card1.description"
            :link="card1.link"
            :buttonText="card1.buttonText"
          />
        </LazyHydrate>
      </div>

      <div class="card">
        <LazyHydrate when-visible>
          <SfCard
            :title="card2.title"
            :titleLevel="card2.titleLevel"
            :image="card2.image"
            :imageWidth="card2.imageWidth"
            :imageHeight="card2.imageHeight"
            :description="card2.description"
            :link="card2.link"
            :buttonText="card2.buttonText"
          />
        </LazyHydrate>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton,
  SfCard
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { useContext, computed } from '@nuxtjs/composition-api';
import { useFacet } from '@vue-storefront/vendure';
import { onSSR } from '@vue-storefront/core';
import { getCalculatedPrice } from '~/helpers';

export default {
  name: "Home",
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
    SfCard,
  },
  setup() {

    const { $config } = useContext();
    const card1 = {
      title: "Öl Singles",
      titleLevel: 3,
      image: "/homepage/card1.jpg",
      imageWidth: 340,
      imageHeight: 300,
      description:
        "Extrakte aus Pflanzen mit erstaunlichen Vorteilen. Natürlich und einfach in der Anwendung.",
      link: "/c/atherische-ole/einzelole?sort=NAME_ASC",
      buttonText: "Öl Singles",
    }
    const card2 = {
      title: "Gemischte Öle",
      titleLevel: 3,
      image: "/homepage/card2.jpg",
      imageWidth: 340,
      imageHeight: 300,
      description:
        "Extrakte aus Pflanzen mit erstaunlichen Vorteilen. Natürlich und einfach in der Anwendung.",
      link: "/c/atherische-ole/olmischungen?sort=NAME_ASC",
      buttonText: "Gemischte Öle",
    }
    const { search, result } = useFacet();

    onSSR(async () => {
      await search({ sort: { name: 'DESC' }, take: 8});
    });

    const products = computed(() => result.value.data.items);

    return {
      card1,
      card2,
      products,
      getCalculatedPrice
    };

  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          text-align: right;
          width: 100%;
          padding-left: var(--spacer-sm);
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right,
    &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
      text-decoration: none;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}
 ::v-deep .sf-product-card__image .sf-image {
    --image-height: 14.375rem;
    --image-width: 9.375rem;
    object-fit: cover;
    @include for-desktop {
      --image-width: 13.125rem;
      --image-height: 18.75rem;
    }
  }

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
    -webkit-transform-origin: center;
    transform-origin: center;
  }
}

.cards {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  margin: 60px;
}

</style>
