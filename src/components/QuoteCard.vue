<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import { Modal } from "ant-design-vue";
import type { IQuote } from "@/models";

const store = useTypedStore();

const props = defineProps<{
  quote: IQuote;
}>();

const handleDelete = () => {
  Modal.confirm({
    title: "Are you sure delete this quote?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      store.dispatch("quotes/deleteQuote", props.quote.id);
    },
  });
};

const handleEdit = () => {
  store.commit("quotes/setQuoteEditing", props.quote);
  store.commit("ui/setIsEditQuoteModalVisible", true);
};
</script>

<template>
  <div class="p-[5px] shadow-sm">
    {{ props.quote.text }}
    <AButton @click="handleDelete"> Delete </AButton>
    <AButton @click="handleEdit"> Edit </AButton>
  </div>
</template>
