<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

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
  initialValues: {
    author: "",
    text: "",
    genres: [],
  },
});

const textField = useField<string>("text");
const authorField = useField<string>("author");
const genresField = useField<string[]>("genres");

const handleSubmit = form.handleSubmit(async (values) => {
  await store.dispatch("quotes/createQuote", {
    text: values.text,
    author: values.author,
    genres: values.genres,
  });

  form.resetForm();
});

const handleGenresInputChange = (genres: string[]) => {};
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
      Create
    </AButton>
  </form>
</template>
