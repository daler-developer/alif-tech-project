<script lang="ts" setup>
import AppContainer from './AppContainer.vue'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-white z-40 shadow-md">
    <app-container>
      <div class="h-[50px] flex items-center justify-center">
        <router-link to="/">
          <a-button type="link">Quotes</a-button>
        </router-link>
        <router-link to="/authors">
          <a-button type="link">Authors</a-button>
        </router-link>
        <router-link to="/random">
          <a-button type="link">Random</a-button>
        </router-link>
      </div>
    </app-container>
  </header>
</template>
