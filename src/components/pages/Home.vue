<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import { computed } from "@vue/reactivity";
import { onMounted, ref, reactive, watch } from "vue";
import QuoteCard from "../QuoteCard.vue";

const store = useTypedStore();

const filterObj = reactive({
  search: "",
});

onMounted(() => {
  getQuotes();
});

watch(filterObj, () => getQuotes());

const getQuotes = () => store.dispatch("quotes/getQuotes", filterObj);

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
    <ASelect />
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
