<script lang="ts" setup>
import { computed } from "vue";
import useTypedStore from "@/composables/useTypedStore";
import CreateQuoteForm from "../forms/CreateQuoteForm.vue";

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
    <CreateQuoteForm />
  </AModal>
</template>
