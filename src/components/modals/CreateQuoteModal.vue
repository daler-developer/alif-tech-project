<script lang="ts" setup>
import { computed } from "vue";
import useTypedStore from "@/composables/useTypedStore";
import CreateOrEditQuoteForm from "../forms/CreateOrEditQuoteForm.vue";

const store = useTypedStore();

const visible = computed<boolean>({
  get() {
    return store.state.ui.isCreateQuoteModalVisible;
  },
  set(to) {
    store.commit("ui/setIsCreateQuoteModalVisible", to);
  },
});
</script>

<template>
  <AModal v-model:visible="visible" :footer="null" title="Create quote">
    <CreateOrEditQuoteForm mode="create" @submit-succeeded="visible = false" />
  </AModal>
</template>
