<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { computed, onMounted } from 'vue'
import AuthorCard from '../AuthorCard.vue'

const store = useTypedStore()

const isFetching = computed(() => store.state.authors.feed.isFetching)
const authors = computed(() => store.state.authors.feed.list)

const hasAuthors = computed(() => Boolean(authors.value.length))

const getAuthors = () => {
  store.dispatch('authors/getFeedAuthors')
}

onMounted(() => getAuthors())
</script>

<template>
  <a-button @click="getAuthors()" html-type="button" block>Reload</a-button>
  <div class="mt-[10px]">
    <div v-if="isFetching" class="text-center">
      <a-spin />
    </div>
    <template v-else>
      <div v-if="hasAuthors" class="flex flex-col gap-[5px]">
        <author-card v-for="author in authors" :author="author" :key="author.id" />
      </div>
      <a-empty v-else />
    </template>
  </div>
</template>
