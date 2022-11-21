<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import { computed } from "@vue/reactivity";
import { onMounted, ref, reactive, watch } from "vue";
import QuoteCard from "../QuoteCard.vue";
import type { Dayjs } from "dayjs";

const store = useTypedStore();

interface IFilterObj {
  search: string;
  dateTimeRange: [Dayjs, Dayjs] | null;
  author: string | undefined;
  genre: string | undefined;
  sort:
    | "created-at:desc"
    | "created-at:asc"
    | "updated-at:desc"
    | "updated-at:asc"
    | undefined;
}

const filterObj = reactive<IFilterObj>({
  search: "",
  dateTimeRange: null,
  author: undefined,
  genre: undefined,
  sort: undefined,
});

onMounted(() => {
  getPageAllResources();
});

watch(filterObj, () => getQuotes());

const getPageAllResources = () => {
  getQuotes();
  getAuthors();
};

const getQuotes = () => {
  store.dispatch("quotes/getQuotes", filterObj);
};

const getAuthors = () => {
  store.dispatch("authors/getDropdownAuthors");
};

const quotes = computed(() => store.state.quotes.feed.list);
const isFetchingQuotes = computed(() => store.state.quotes.feed.isFetching);
const authors = computed(() => store.state.authors.dropdown.list);

const handleCreateQuoteBtnClick = () => {
  store.commit("ui/setIsCreateQuoteModalVisible", true);
};
</script>

<template>
  <AButton block type="primary" @click="handleCreateQuoteBtnClick"
    >Create</AButton
  >

  <div class="mt-[10px] flex gap-[5px] tablet:flex-col">
    <AInputSearch v-model:value="filterObj.search" placeholder="Search" />
    <a-select
      @focus="getAuthors"
      allow-clear
      v-model:value="filterObj.author"
      placeholder="Author"
    >
      <a-select-option
        v-for="author in authors"
        :key="author.id"
        :value="author.name"
        >{{ author.name }}</a-select-option
      >
    </a-select>
    <a-select allow-clear v-model:value="filterObj.genre" placeholder="Genre">
      <a-select-option value="g1">g1</a-select-option>
      <a-select-option value="g2">g2</a-select-option>
      <a-select-option value="g3">g3</a-select-option>
    </a-select>
    <a-range-picker
      allow-clear
      v-model:value="filterObj.dateTimeRange"
      show-time
    />
    <a-select allow-clear v-model:value="filterObj.sort" placeholder="Sort">
      <a-select-option value="created-at:desc"
        >Created at(desc)</a-select-option
      >
      <a-select-option value="created-at:asc">Created at(asc)</a-select-option>
      <a-select-option value="updated-at:desc"
        >Updated at(desc)</a-select-option
      >
      <a-select-option value="udpated-at-asc">Updated at(asc)</a-select-option>
    </a-select>
  </div>

  <div class="mt-[10px]">
    <div v-if="isFetchingQuotes" class="text-center">
      <ASpin />
    </div>
    <div v-else class="flex flex-col gap-[10px]">
      <QuoteCard v-for="quote in quotes" :key="quote.id" :quote="quote" />
    </div>
  </div>
</template>
