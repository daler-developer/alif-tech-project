<script lang="ts" setup>
import { computed } from "vue";
import useTypedStore from "@/composables/useTypedStore";
import CreateOrEditQuoteForm from "../forms/CreateOrEditQuoteForm.vue";

const store = useTypedStore();

const visible = computed<boolean>({
  get() {
    return store.state.ui.isEditQuoteModalVisible;
  },
  set(to) {
    store.commit("ui/setIsEditQuoteModalVisible", to);
  },
});
</script>

<template>
  <AModal v-model:visible="visible" :footer="null" title="Edit quote">
    <CreateOrEditQuoteForm
      v-if="store.state.quotes.quoteEditing"
      mode="edit"
      :quoteEditing="store.state.quotes.quoteEditing"
      @submit-succeeded="visible = false"
    />
  </AModal>
</template>
