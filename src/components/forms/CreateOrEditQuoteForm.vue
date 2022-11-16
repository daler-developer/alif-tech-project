<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import type { IQuote } from "@/models";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const props = defineProps<{
  mode: "create" | "edit";
  quoteEditing?: IQuote;
}>();

interface IFormValues {
  text: string;
  author: string;
  genres: string[];
}

const store = useTypedStore();

const validationSchema = yup.object({
  text: yup.string().trim().required(),
  author: yup.string().trim().required(),
});

const form = useForm<IFormValues>({
  validationSchema,
  initialValues:
    props.mode === "create"
      ? {
          author: "",
          text: "",
          genres: [],
        }
      : {
          author: props.quoteEditing!.author,
          text: props.quoteEditing!.text,
          genres: props.quoteEditing!.genres,
        },
});

const textField = useField<string>("text");
const authorField = useField<string>("author");
const genresField = useField<string[]>("genres");

const handleSubmit = form.handleSubmit(async (values) => {
  const createQuote = async () => {
    await store.dispatch("quotes/createQuote", {
      text: values.text,
      author: values.author,
      genres: values.genres,
    });
  };

  const editQuote = async () => {
    await store.dispatch("quotes/editQuote", {
      quoteId: props.quoteEditing!.id,
      newValues: {
        text: values.text,
        author: values.author,
        genres: values.genres,
      },
    });
  };

  if (props.mode === "create") {
    await createQuote();
  } else {
    await editQuote();
  }

  form.resetForm();
});

const handleGenresInputChange = (genres: string[]) => {
  genresField.setValue(genres);
};
</script>

<template>
  <form @submit="handleSubmit">
    <ATextarea
      placeholder="Text"
      v-model:value="textField.value.value"
      name="text"
    />
    <div class="mt-[5px]"></div>
    <AInput
      placeholder="Author"
      v-model:value="authorField.value.value"
      name="author"
    />
    <div class="mt-[5px]"></div>
    <ASelect
      class="w-full"
      mode="tags"
      placeholder="Genres"
      :value="genresField.value.value"
      @change="handleGenresInputChange"
    />
    <AButton class="mt-[10px]" type="primary" block html-type="submit">
      <template v-if="mode === 'create'"> Create </template>
      <template v-else> Edit </template>
    </AButton>
  </form>
</template>
