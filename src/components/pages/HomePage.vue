<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import type { IGetQuotesFitlerObj } from '@/services/quotesService'
import { Modal } from 'ant-design-vue'
import { computed, onMounted, reactive, watch } from 'vue'
import QuoteCard from '../QuoteCard.vue'

const store = useTypedStore()

const filterObj = reactive<IGetQuotesFitlerObj>({
  search: '',
  author: undefined,
  genre: undefined,
  sort: undefined,
})

onMounted(() => {
  getPageResources()
  showWarningModal()
})

watch(filterObj, () => getQuotes())

const showWarningModal = () => {
  Modal.confirm({
    content:
      'Firebase restricts querying on multiple fields unless you specify required indexes. However there are too many combinations of fields to specify those indexes. So please only specify one criteria when querying quotes',
  })
}

const getPageResources = () => {
  getQuotes()
  getAuthors()
  getGenres()
}

const getQuotes = () => {
  store.dispatch('quotes/getQuotes', filterObj)
}

const getAuthors = () => {
  store.dispatch('authors/getDropdownAuthors')
}

const getGenres = () => {
  store.dispatch('genres/getDropdownGenres')
}

const quotes = computed(() => store.state.quotes.feed.list)
const isFetchingQuotes = computed(() => store.state.quotes.feed.isFetching)
const authors = computed(() => store.state.authors.dropdown.list)
const genres = computed(() => store.state.genres.dropdown.list)

const hasQuotes = computed(() => Boolean(quotes.value.length))

const handleCreateQuoteBtnClick = () => {
  store.commit('ui/setIsCreateQuoteModalVisible', true)
}

const clearFilter = () => {
  filterObj.search = ''
  filterObj.author = undefined
  filterObj.genre = undefined
  filterObj.sort = undefined
}
</script>

<template>
  <a-button block type="primary" @click="handleCreateQuoteBtnClick">Create</a-button>

  <div class="mt-[10px] flex gap-[5px] flex-wrap">
    <a-input-search @update:value="clearFilter()" v-model:value="filterObj.search" placeholder="Search" />
    <a-select
      @focus="getAuthors"
      @update:value="clearFilter()"
      allow-clear
      v-model:value="filterObj.author"
      placeholder="Author"
    >
      <a-select-option v-for="author in authors" :key="author.id" :value="author.name">{{
        author.name
      }}</a-select-option>
    </a-select>
    <a-select
      @focus="getGenres()"
      @update:value="clearFilter()"
      allow-clear
      v-model:value="filterObj.genre"
      placeholder="Genre"
    >
      <a-select-option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</a-select-option>
    </a-select>
    <a-select
      @update:value="clearFilter()"
      class="w-[150px]"
      allow-clear
      v-model:value="filterObj.sort"
      placeholder="Sort"
    >
      <a-select-option value="created-at:desc">Created at(desc)</a-select-option>
      <a-select-option value="created-at:asc">Created at(asc)</a-select-option>
      <a-select-option value="updated-at:desc">Updated at(desc)</a-select-option>
      <a-select-option value="updated-at:asc">Updated at(asc)</a-select-option>
    </a-select>
    <a-button html-type="button" @click="getPageResources()">Reload</a-button>
  </div>

  <div class="mt-[10px]">
    <div v-if="isFetchingQuotes" class="text-center">
      <a-spin />
    </div>
    <template v-else>
      <div v-if="hasQuotes" class="flex flex-col gap-[10px]">
        <quote-card v-for="quote in quotes" :key="quote.id" :quote="quote" />
      </div>
      <a-empty v-else />
    </template>
  </div>
</template>
