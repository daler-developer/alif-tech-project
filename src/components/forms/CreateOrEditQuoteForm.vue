<script lang="ts" setup>
import useTypedStore from "@/composables/useTypedStore";
import type { IQuote } from "@/models";
import { useField, useForm } from "vee-validate";
import { computed } from "vue";
import * as yup from "yup";

const props = defineProps<{
  mode: "create" | "edit";
  quoteEditing?: IQuote;
}>();

const emit = defineEmits(["submitSucceeded"]);

interface IFormValues {
  text: string;
  author: string;
  genres: string[];
}

const store = useTypedStore();

const validationSchema = yup.object({
  text: yup.string().trim().required("required"),
  author: yup
    .string()
    .trim()
    .matches(/^[a-z]+$/, "should contain only letters")
    .required("required"),
  genres: yup.array().of(
    yup
      .string()
      .trim()
      .matches(/^[a-z]+$/, "should contain only letters")
      .required("required")
  ),
});

const initialValues = computed(() => {
  return props.mode === "create"
    ? {
        author: "",
        text: "",
        genres: [],
      }
    : {
        author: props.quoteEditing!.author,
        text: props.quoteEditing!.text,
        genres: props.quoteEditing!.genres,
      };
});

const form = useForm<IFormValues>({
  validationSchema,
  initialValues,
});

const textField = useField<string>("text");
const authorField = useField<string>("author");
const genresField = useField<string[]>("genres");

const handleSubmit = form.handleSubmit(
  async (values) => {
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
    emit("submitSucceeded");
  },
  (e) => {
    console.log(e.errors);
  }
);

const handleGenresInputChange = (genres: string[]) => {
  genresField.setValue(genres);
};
</script>

<template>
  <form @submit="handleSubmit">
    <a-typography-text type="danger">
      {{ textField.errorMessage.value }}
    </a-typography-text>
    <ATextarea
      placeholder="Text"
      v-model:value="textField.value.value"
      name="text"
    />

    <div class="mt-[5px]"></div>

    <a-typography-text type="danger">
      {{ authorField.errorMessage.value }}
    </a-typography-text>
    <AInput
      placeholder="Author"
      v-model:value="authorField.value.value"
      name="author"
    />

    <div class="mt-[5px]"></div>

    <a-typography-text v-if="genresField.errorMessage" type="danger">
      required and should be only letters
    </a-typography-text>
    <ASelect
      class="w-full"
      mode="tags"
      placeholder="Genres"
      :value="genresField.value.value"
      @change="handleGenresInputChange"
    />

    <AButton
      :loading="form.isSubmitting.value"
      class="mt-[10px]"
      type="primary"
      block
      html-type="submit"
    >
      <template v-if="mode === 'create'"> Create </template>
      <template v-else> Edit </template>
    </AButton>
  </form>
</template>
