<script setup lang="ts">
import { RouterView } from 'vue-router'
import Container from './components/Container.vue'
import Header from './components/Header.vue'
import CreateQuoteModal from './components/modals/CreateQuoteModal.vue'
import EditQuoteModal from './components/modals/EditQuoteModal.vue'
</script>

<template>
  <div class="pt-[80px] pb-[20px]">
    <Header />
    <CreateQuoteModal />
    <EditQuoteModal />
    <Container>
      <RouterView />
    </Container>
  </div>
</template>
