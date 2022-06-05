<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Categorias"
        :rows="categories"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="loading"
        no-data-label="Não foi encontrado nada ..."
        no-results-label="Sem resultados para este filtro."
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Categorias</div>
          <q-space />
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              flat
              color="blue-grey-9"
              dense
              size="md"
              @click="handlerEdit(props.row)"
            >
              <q-tooltip> Editar categoria </q-tooltip></q-btn
            >
            <q-btn
              icon="mdi-delete-outline"
              flat
              color="red"
              dense
              size="md"
              @click="handlerRemove(props.row)"
            >
              <q-tooltip> Remover categoria </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        label=""
        label-position="bottom"
        color="primary"
        icon="keyboard_arrow_up"
        direction="up"
        vertical-actions-align="right"
        square
      >
        <q-fab-action
          square
          color="primary"
          dense
          icon="add"
          label="Nova Categoria"
          label-position="left"
          :to="{ name: 'form-category' }"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "name",
    align: "left",
    label: "Categoria",
    field: "name",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "",
    field: "actions",
  },
];

import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CategoryListPage",
  setup() {
    const categories = ref([]);
    const loading = ref(true);
    const router = useRouter();

    const { list } = useApi();
    const { notifyError } = useNotify();

    const handlerListCategories = async () => {
      try {
        loading.value = true;
        categories.value = await list("categoria");
        loading.value = false;
      } catch (error) {
        notifyError(error);
      }
    };

    const handlerEdit = async (category) => {
      router.push({ name: "form-category", params: { id: category.id } });
    };

    const handlerRemove = async () => {
      //
    };

    onMounted(() => {
      handlerListCategories();
    });

    return {
      columns,
      categories,
      loading,
      handlerListCategories,
      handlerEdit,
      handlerRemove,
    };
  },
});
</script>

<style></style>
