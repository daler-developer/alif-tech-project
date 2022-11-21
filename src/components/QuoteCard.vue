<script lang="ts" setup>
import useTypedStore from '@/composables/useTypedStore'
import { Modal } from 'ant-design-vue'
import type { IQuote } from '@/models'
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { formatFirebaseTimestamp, convertArrayToCommaSeperatedList } from '@/utils/helpers'

const store = useTypedStore()

const props = defineProps<{
  quote: IQuote
}>()

const formatedCreatedAt = computed(() => formatFirebaseTimestamp(props.quote.createdAt))
const formatedUpdatedAt = computed(() => formatFirebaseTimestamp(props.quote.updatedAt))
const hasGenres = computed(() => Boolean(props.quote.genres.length))
const genresList = computed(() => convertArrayToCommaSeperatedList(props.quote.genres))

const handleDelete = () => {
  Modal.confirm({
    title: 'Are you sure delete this quote?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      store.dispatch('quotes/deleteQuote', props.quote.id)
    },
  })
}

const handleEdit = () => {
  store.commit('quotes/setQuoteEditing', props.quote)
  store.commit('ui/setIsEditQuoteModalVisible', true)
}
</script>

<template>
  <div class="p-[5px] border-solid border-[1px] border-gray-300 rounded-[2px]">
    <ATypographyText strong>{{ quote.author }}</ATypographyText>

    <a-typography-paragraph data-test="quote-text">
      {{ quote.text }}
    </a-typography-paragraph>

    <a-typography-text type="secondary" data-test="created-at"> Created: {{ formatedCreatedAt }} </a-typography-text>

    <div class=""></div>
    <a-typography-text type="secondary" data-test="updated-at"> Updated: {{ formatedUpdatedAt }} </a-typography-text>

    <div class=""></div>
    <a-typography-text v-if="hasGenres" type="secondary" data-test="genres-list">
      Genres: {{ genresList }}
    </a-typography-text>

    <div class="mt-[5px] flex gap-[5px]">
      <AButton @click="handleDelete">
        <template #icon>
          <delete-icon />
        </template>
      </AButton>
      <AButton @click="handleEdit">
        <template #icon>
          <edit-icon />
        </template>
      </AButton>
    </div>
  </div>
</template>
