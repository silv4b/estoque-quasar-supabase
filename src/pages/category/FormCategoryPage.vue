<template>
  <!-- Adicionar essa funcionalidade a um dialog -->
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerSubmit"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Adicionar Categoria</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="form.name"
              label="Categoria"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Nome é obrigatório!',
              ]"
              hint="Digite um email válido para recuperação."
            >
              <template v-slot:prepend>
                <q-icon name="mdi-shape-outline" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.name = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-btn
              label="Adicionar"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
            <q-btn
              label="Cancelar"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'category' }"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "FormCategoryPage",

  setup() {
    const table = "categoria";
    const router = useRouter();
    const { post } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
    });

    const handlerSubmit = async () => {
      try {
        await post(table, form.value);
        notifySuccess("Categoria cadastrada!");
        router.push({ name: "form-category" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      handlerSubmit,
      form,
    };
  },
});
</script>

<style lang="scss">
.q-card {
  margin: 0.8rem !important;
}

@media (max-width: 600px) {
  .q-card {
    margin: 0.8rem !important;
    min-width: 300px;
  }
}
</style>
