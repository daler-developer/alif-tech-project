<script lang="ts" setup>
import type { IAuthor } from "@/models";
import { convertArrayToCommaSeperatedList } from "@/utils/helpers";
import { computed, ref } from "vue";

const props = defineProps<{ author: IAuthor }>();

const showGenres = ref<boolean>(false);

const formatedGenres = computed(() =>
  convertArrayToCommaSeperatedList(props.author.genres)
);
const hasGenres = computed(() => Boolean(props.author.genres.length));
</script>

<template>
  <div
    class="p-[5px] border-solid border-[1px] border-gray-300 rounded-[2px] cursor-pointer"
  >
    <div class="flex items-center justify-between">
      <span>
        {{ author.name }}
      </span>
      <a-button @click="showGenres = !showGenres"> Show genres </a-button>
    </div>

    <template v-if="showGenres">
      <div class="mt-[5px]"></div>
      <a-typography-text v-if="hasGenres" type="secondary">
        Genres: {{ formatedGenres }}
      </a-typography-text>
      <a-typography-text v-else type="secondary"> No genres </a-typography-text>
    </template>
  </div>
</template>
