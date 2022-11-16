<script lang="ts" setup>
import Container from "./Container.vue";
</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-white z-40 shadow-md">
    <Container>
      <div class="h-[50px] flex items-center justify-center">
        <RouterLink to="/">
          <AButton type="link">Quotes</AButton>
        </RouterLink>
        <RouterLink to="/authors">
          <AButton type="link">Authors</AButton>
        </RouterLink>
        <RouterLink to="/random">
          <AButton type="link">Random</AButton>
        </RouterLink>
      </div>
    </Container>
  </header>
</template>
