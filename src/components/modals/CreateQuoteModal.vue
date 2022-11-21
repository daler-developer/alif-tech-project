<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { computed } from 'vue'
import CreateOrEditQuoteForm from '../forms/CreateOrEditQuoteForm.vue'

const store = useTypedStore()

const visible = computed<boolean>({
  get() {
    return store.state.ui.isCreateQuoteModalVisible
  },
  set(to) {
    store.commit('ui/setIsCreateQuoteModalVisible', to)
  },
})
</script>

<template>
  <a-modal data-test="modal" v-model:visible="visible" :footer="null" title="Create quote">
    <create-or-edit-quote-form mode="create" @submit-succeeded="visible = false" />
  </a-modal>
</template>
