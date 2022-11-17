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
}

const filterObj = reactive<IFilterObj>({
  search: "",
  dateTimeRange: null,
  author: undefined,
  genre: undefined,
});

onMounted(() => {
  getQuotes();
});

watch(filterObj, () => getQuotes());

const getQuotes = () => {
  store.dispatch("quotes/getQuotes", filterObj);
};

const quotes = computed(() => store.state.quotes.feed.list);
const isFetchingQuotes = computed(() => store.state.quotes.feed.isFetching);

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
    <a-select allow-clear v-model:value="filterObj.author" placeholder="Author">
      <a-select-option value="daler">daler</a-select-option>
      <a-select-option value="aziz">aziz</a-select-option>
      <a-select-option value="zarina">zarina</a-select-option>
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
