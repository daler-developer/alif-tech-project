<script lang="ts" setup>
import type { IAuthor } from '@/models'
import { convertArrayToCommaSeperatedList } from '@/utils/helpers'
import { computed, ref } from 'vue'

const props = defineProps<{ author: IAuthor }>()

const showGenres = ref<boolean>(false)

const formatedGenres = computed(() => convertArrayToCommaSeperatedList(props.author.genres))
const hasGenres = computed(() => Boolean(props.author.genres.length))
</script>

<template>
  <div class="p-[5px] border-solid border-[1px] border-gray-300 rounded-[2px]">
    <div class="flex items-center justify-between">
      <span data-test="author-name">
        {{ author.name }}
      </span>
      <a-button data-test="button" @click="showGenres = !showGenres"> Show genres </a-button>
    </div>

    <template v-if="showGenres">
      <div data-test="genres-dropdown" class="mt-[5px]">
        <a-typography-text v-if="hasGenres" type="secondary" data-test="genres-list">
          Genres: {{ formatedGenres }}
        </a-typography-text>
        <a-typography-text data-test="no-genres-text" v-else type="secondary"> No genres </a-typography-text>
      </div>
    </template>
  </div>
</template>
