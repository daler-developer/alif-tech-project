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
}

const filterObj = reactive<IFilterObj>({
  search: "",
  dateTimeRange: null,
});

onMounted(() => {
  getQuotes();
});

watch(filterObj, () => getQuotes());

const getQuotes = () => {
  if (filterObj.dateTimeRange) {
    console.log(filterObj.dateTimeRange[0].format("DD/MM/YYYY HH:mm:ss"));
  }
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

  <div class="mt-[10px] flex gap-[5px]">
    <AInputSearch v-model:value="filterObj.search" placeholder="Search" />
    <ASelect placeholder="Genre" />
    <a-range-picker v-model:value="filterObj.dateTimeRange" show-time />
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
