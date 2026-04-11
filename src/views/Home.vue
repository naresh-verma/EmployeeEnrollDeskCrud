<template>
  <div class="home-page">
    <!-- Header Navigation -->
    <q-header elevated class="bg-gradient">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-weight-bold">
          <q-icon name="business" size="lg" class="q-mr-md" />
          {{ homeLabels.appTitle }}
        </q-toolbar-title>
        <q-space />
        <!-- Show Go to List button if authenticated -->
        <q-btn
          v-if="authStore.isAuthenticated"
          unelevated
          color="white"
          text-color="primary"
          :label="homeLabels.headerButtonAuthenticated"
          size="lg"
          @click="goToList"
          class="q-px-lg text-weight-bold login-btn"
        />
        <!-- Show Login button if not authenticated -->
        <q-btn
          v-else
          unelevated
          color="white"
          text-color="primary"
          :label="homeLabels.headerButtonGuest"
          size="lg"
          @click="goToLogin"
          class="q-px-lg text-weight-bold login-btn"
        />
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <div class="home-content">
      <!-- Carousel Section -->
      <div class="carousel-section">
        <q-carousel
          v-model="slide"
          animated
          autoplay
          arrows
          control-type="dots"
          dots
          dark
          class="carousel"
          :style="{ height: 'auto' }"
        >
          <q-carousel-slide
            v-for="(item, index) in slides"
            :key="index"
            :name="index"
            :img-src="item.image"
            class="carousel-slide"
          >
            <div class="slide-overlay">
              <div class="slide-content">
                <h2 class="slide-title">{{ item.title }}</h2>
                <p class="slide-description">{{ item.description }}</p>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>

      <!-- Features Section -->
      <div class="q-pa-lg features-section">
        <div class="text-center">
          <h3 class="text-h4 text-weight-bold q-mb-lg text-primary">
            {{ homeLabels.why }}
          </h3>
        </div>

        <div class="row q-col-gutter-lg">
          <!-- Feature 1: Easy Registration -->
          <div class="col-12 col-md-4">
            <q-card class="feature-card">
              <q-card-section class="text-center">
                <q-icon name="app_registration" size="64px" color="primary" />
              </q-card-section>
              <q-card-section class="text-center">
                <h5 class="text-h6 text-weight-bold">{{ homeLabels.feature1Title }}</h5>
                <p class="text-body2 text-grey-8">
                  {{ homeLabels.feature1Desc }}
                </p>
              </q-card-section>
            </q-card>
          </div>

          <!-- Feature 2: Secure Login -->
          <div class="col-12 col-md-4">
            <q-card class="feature-card">
              <q-card-section class="text-center">
                <q-icon name="security" size="64px" color="primary" />
              </q-card-section>
              <q-card-section class="text-center">
                <h5 class="text-h6 text-weight-bold">{{ homeLabels.feature2Title }}</h5>
                <p class="text-body2 text-grey-8">
                  {{ homeLabels.feature2Desc }}
                </p>
              </q-card-section>
            </q-card>
          </div>

          <!-- Feature 3: Password Recovery -->
          <div class="col-12 col-md-4">
            <q-card class="feature-card">
              <q-card-section class="text-center">
                <q-icon name="lock_reset" size="64px" color="primary" />
              </q-card-section>
              <q-card-section class="text-center">
                <h5 class="text-h6 text-weight-bold">{{ homeLabels.feature3Title }}</h5>
                <p class="text-body2 text-grey-8">
                  {{ homeLabels.feature3Desc }}
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="cta-section bg-primary text-white q-pa-lg">
        <div class="text-center">
          <h3 v-if="authStore.isAuthenticated" class="text-h5 text-weight-bold q-mb-md">
            {{ homeLabels.ctaWelcomeBack }}
          </h3>
          <h3 v-else class="text-h5 text-weight-bold q-mb-md">{{ homeLabels.ctaGetStarted }}</h3>
          <p class="text-body1 q-mb-lg">
            <span v-if="authStore.isAuthenticated">
              {{ homeLabels.ctaDescAuthenticated }}
            </span>
            <span v-else>
              {{ homeLabels.ctaDescGuest }}
            </span>
          </p>
          <!-- Show Go to List button if authenticated -->
          <q-btn
            v-if="authStore.isAuthenticated"
            unelevated
            rounded
            color="white"
            text-color="primary"
            :label="homeLabels.ctaButtonAuthenticated"
            size="lg"
            @click="goToList"
            class="text-weight-bold q-px-lg"
          />
          <!-- Show Sign Up and Login buttons if not authenticated -->
          <div v-else class="q-gutter-md flex justify-center">
            <q-btn
              unelevated
              rounded
              color="white"
              text-color="primary"
              :label="homeLabels.ctaButtonGuest"
              size="lg"
              @click="goToSignup"
              class="text-weight-bold q-px-lg"
            />
            <q-btn
              unelevated
              rounded
              color="primary"
              text-color="white"
              :label="homeLabels.ctaButtonLogin"
              size="lg"
              @click="goToLogin"
              class="text-weight-bold q-px-lg"
              outline
            />
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="info-section q-pa-lg">
        <div class="text-center">
          <h3 class="text-h5 text-weight-bold q-mb-lg text-primary">
            {{ homeLabels.infoTitle }}
          </h3>
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <div class="info-box">
                <q-icon
                  name="check_circle"
                  size="48px"
                  color="positive"
                  class="q-mb-md"
                />
                <h5 class="text-h6 text-weight-bold">{{ homeLabels.infoEmployeesTitle }}</h5>
                <p class="text-body2 text-grey-8">
                  {{ homeLabels.infoEmployeesDesc }}
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="info-box">
                <q-icon
                  name="admin_panel_settings"
                  size="48px"
                  color="info"
                  class="q-mb-md"
                />
                <h5 class="text-h6 text-weight-bold">{{ homeLabels.infoAdminTitle }}</h5>
                <p class="text-body2 text-grey-8">
                  {{ homeLabels.infoAdminDesc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <q-footer class="bg-grey-9 text-white">
      <q-toolbar class="flex justify-center">
        <div class="text-center q-pa-md">
          <p class="q-ma-none">
            {{ homeLabels.footerCopyright }}
          </p>
          <p class="text-caption q-mt-sm text-grey-7">
            {{ homeLabels.footerTagline }}
          </p>
        </div>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useMessages } from '../composables/useMessages'

const router = useRouter()
const authStore = useAuthStore()
const { labels: homeLabels, links: homeLinks } = useMessages('home')
const slide = ref(0)

// Carousel slides with images and content
const slides = computed(() => [
  {
    title: homeLabels.carousel.item1Title,
    description: homeLabels.carousel.item1Description,
    image: homeLinks.carouselItem1Image
  },
  {
    title: homeLabels.carousel.item3Title,
    description: homeLabels.carousel.item3Description,
    image: homeLinks.carouselItem3Image
  },
  {
    title: homeLabels.carousel.item2Title,
    description: homeLabels.carousel.item2Description,
    image: homeLinks.carouselItem2Image
  },
  {
    title: homeLabels.carousel.item4Title,
    description: homeLabels.carousel.item4Description,
    image: homeLinks.carouselItem4Image
  }
])

const goToLogin = () => {
  router.push(homeLinks.login)
}

const goToSignup = () => {
  router.push(homeLinks.signup)
}

const goToList = () => {
  router.push(homeLinks.goToList)
}
</script>

<style scoped src="../styles/views/home.scss" lang="scss"></style>
