<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { computed } from 'vue'
import CreateOrEditQuoteForm from '../forms/CreateOrEditQuoteForm.vue'

const store = useTypedStore()

const visible = computed<boolean>({
  get() {
    return store.state.ui.isEditQuoteModalVisible
  },
  set(to) {
    store.commit('ui/setIsEditQuoteModalVisible', to)
  },
})
</script>

<template>
  <a-modal v-model:visible="visible" :footer="null" title="Edit quote">
    <create-or-edit-quote-form
      v-if="store.state.quotes.quoteEditing"
      mode="edit"
      :quoteEditing="store.state.quotes.quoteEditing"
      @submit-succeeded="visible = false"
    />
  </a-modal>
</template>
