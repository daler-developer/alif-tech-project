<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { computed, onMounted } from 'vue'
import QuoteCard from '../QuoteCard.vue'

const store = useTypedStore()

const isFetching = computed(() => store.state.quotes.randomQuote.isFetching)
const quote = computed(() => store.state.quotes.randomQuote.data)

onMounted(() => getRandomQuote())

const getRandomQuote = async () => {
  await store.dispatch('quotes/getRandomQuote')
}

const handleRandom = () => getRandomQuote()
</script>

<template>
  <a-button block type="primary" html-type="button" @click="handleRandom"> Random </a-button>
  <div class="mt-[10px]">
    <div v-if="isFetching" class="text-center">
      <a-spin />
    </div>
    <div v-else-if="Boolean(quote)">
      <quote-card :quote="quote!" />
    </div>
  </div>
</template>
