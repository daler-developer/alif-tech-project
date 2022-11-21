<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { computed } from 'vue'
import { onMounted, ref, reactive, watch } from 'vue'
import QuoteCard from '../QuoteCard.vue'
import type { Dayjs } from 'dayjs'
import { Modal } from 'ant-design-vue'
import { Timestamp } from '@firebase/firestore'
import { formatFirebaseTimestamp } from '@/utils/helpers'

const store = useTypedStore()

interface IFilterObj {
  search: string
  dateTimeRange: [Dayjs, Dayjs] | null
  author: string | undefined
  genre: string | undefined
  sort: 'created-at:desc' | 'created-at:asc' | 'updated-at:desc' | 'updated-at:asc' | undefined
}

const filterObj = reactive<IFilterObj>({
  search: '',
  dateTimeRange: null,
  author: undefined,
  genre: undefined,
  sort: undefined,
})

onMounted(() => {
  getPageAllResources()
  showWarningModal()
})

watch(filterObj, () => getQuotes())

const showWarningModal = () => {
  Modal.confirm({
    content:
      'Firebase restricts querying on multiple fields unless you specify required indexes. However there are too many combinations of fields to specify those indexes. So please only specify one criteria when querying quotes',
  })
}

const getPageAllResources = () => {
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
</script>

<template>
  <AButton block type="primary" @click="handleCreateQuoteBtnClick">Create</AButton>

  <div class="mt-[10px] flex gap-[5px] flex-wrap">
    <AInputSearch v-model:value="filterObj.search" placeholder="Search" />
    <a-select @focus="getAuthors" allow-clear v-model:value="filterObj.author" placeholder="Author">
      <a-select-option v-for="author in authors" :key="author.id" :value="author.name">{{
        author.name
      }}</a-select-option>
    </a-select>
    <a-select @focus="getGenres()" allow-clear v-model:value="filterObj.genre" placeholder="Genre">
      <a-select-option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</a-select-option>
    </a-select>
    <a-select class="w-[150px]" allow-clear v-model:value="filterObj.sort" placeholder="Sort">
      <a-select-option value="created-at:desc">Created at(desc)</a-select-option>
      <a-select-option value="created-at:asc">Created at(asc)</a-select-option>
      <a-select-option value="updated-at:desc">Updated at(desc)</a-select-option>
      <a-select-option value="udpated-at:asc">Updated at(asc)</a-select-option>
    </a-select>
    <a-button html-type="button" @click="getPageAllResources()">Reload</a-button>
  </div>

  <div class="mt-[10px]">
    <div v-if="isFetchingQuotes" class="text-center">
      <ASpin />
    </div>
    <template v-else>
      <div v-if="hasQuotes" class="flex flex-col gap-[10px]">
        <QuoteCard v-for="quote in quotes" :key="quote.id" :quote="quote" />
      </div>
      <a-empty v-else />
    </template>
  </div>
</template>
