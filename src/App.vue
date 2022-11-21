<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppContainer from './components/AppContainer.vue'
import AppHeader from './components/AppHeader.vue'
import CreateQuoteModal from './components/modals/CreateQuoteModal.vue'
import EditQuoteModal from './components/modals/EditQuoteModal.vue'
</script>

<template>
  <div class="pt-[80px] pb-[20px]">
    <app-header />
    <create-quote-modal />
    <edit-quote-modal />
    <app-container>
      <router-view />
    </app-container>
  </div>
</template>
