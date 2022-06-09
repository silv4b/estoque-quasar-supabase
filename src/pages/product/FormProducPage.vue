<template>
  <!-- TO-DO: Adicionar essa funcionalidade a um dialog -->
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerSubmit()"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Adicionar Produto</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="form.nome"
              label="Categoria"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Nome é obrigatório!',
              ]"
              hint="Digite o nome do novo produto."
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.nome = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.estoque"
              label="Estoque"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Estoque é obrigatório!',
              ]"
              hint="Digite a quantidade em estoque."
              type="number"
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.estoque = '0'"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.preco"
              label="Preço"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Preço é obrigatório!',
              ]"
              prefix="R$"
              hint="Digite a quantidade em estoque."
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.preco = '0'"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-select
              v-model="form.categoria_id"
              :options="optionsCategory"
              label="Categoria"
              option-value="id"
              option-label="name"
              map-options
              emit-value
            />

            <q-editor v-model="form.descricao" min-height="5rem" />
            <q-btn
              :label="isUpdate ? 'Atualizar' : 'Adicionar'"
              color="primary"
              class="full-width"
              type="submit"
            >
            </q-btn>
            <q-btn
              label="Cancelar"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'product' }"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "FormProductPage",

  setup() {
    const table = "produto";
    const router = useRouter();
    const route = useRoute();
    const isUpdate = computed(() => route.params.id);

    let optionsCategory = ref([]);
    let product = {};

    const { post, getById, update, list } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      nome: "",
      descricao: "",
      estoque: 0,
      preco: 0,
      categoria_id: "",
    });

    const handlerSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value);
          notifySuccess("Produto atualizado!");
        } else {
          await post(table, form.value);
          notifySuccess("Produto cadastrado!");
        }
        await router.push({ name: "product" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handlerGetProduct = async (id) => {
      try {
        product = await getById(table, id);
        form.value = product;
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handlerListCategories();
      if (isUpdate.value) handlerGetProduct(isUpdate.value);
    });

    const handlerListCategories = async () => {
      optionsCategory.value = await list("categoria");
    };

    return {
      handlerSubmit,
      handlerGetProduct,
      handlerListCategories,
      form,
      isUpdate,
      optionsCategory,
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
