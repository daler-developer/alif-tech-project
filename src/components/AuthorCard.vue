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
    @click="showGenres = !showGenres"
    class="p-[5px] border-solid border-[1px] border-gray-300 rounded-[2px] cursor-pointer"
  >
    {{ author.name }}

    <template v-if="showGenres && hasGenres">
      <div class="mt-[5px]"></div>
      <a-typography-text type="secondary">
        Genres: {{ formatedGenres }}
      </a-typography-text>
    </template>
  </div>
</template>
