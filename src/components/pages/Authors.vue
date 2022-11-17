<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import { computed, onMounted } from "vue";
import AuthorCard from "../AuthorCard.vue";

const store = useTypedStore();

const isFetching = computed(() => store.state.authors.feed.isFetching);
const authors = computed(() => store.state.authors.feed.list);

const getAuthors = () => {
  store.dispatch("authors/getFeedAuthors");
};

onMounted(() => getAuthors());
</script>

<template>
  <AButton @click="getAuthors()" type="primary" html-type="button" block
    >Reload</AButton
  >
  <div class="mt-[10px]">
    <div v-if="isFetching" class="text-center">
      <ASpin />
    </div>
    <div v-else class="flex flex-col gap-[5px]">
      <AuthorCard v-for="author in authors" :author="author" :key="author.id" />
    </div>
  </div>
</template>
