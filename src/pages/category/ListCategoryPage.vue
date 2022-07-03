<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Categorias"
        row-key="id"
        class="col-12"
        no-data-label="Não foi encontrado nada ..."
        no-results-label="Sem resultados para este filtro."
        :filter="filter"
        :loading="loading"
        :rows="categories"
        :columns="columnsCategory"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top="props">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Pesquisar"
            class="all"
          >
            <template v-slot:append>
              <q-icon name="search" />
              <q-icon
                name="close"
                @click="filter = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <div class="col-2 q-table__title">Categorias</div>
          <q-space />
          <q-btn
            flat
            round
            dense
            icon="mdi-reload"
            @click="handlerListCategories()"
            class="q-ml-md"
          />
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
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import useDialog from "src/composables/UseDialog";
import { useRouter } from "vue-router";
import { columnsCategory } from "./TableCategory";

export default defineComponent({
  name: "CategoryListPage",
  setup() {
    const categories = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const table = "categoria";
    const filter = ref("");

    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogShow } = useDialog();

    const handlerListCategories = async () => {
      try {
        loading.value = true;
        categories.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error);
      }
    };

    const handlerEdit = async (category) => {
      await router.push({ name: "form-category", params: { id: category.id } });
    };

    const handlerRemove = async (category) => {
      dialogShow({
        message: `Deseja remover a categoria ${category.name}?`,
      }).onOk(async () => {
        try {
          await remove(table, category.id);
          notifySuccess("Categoria removida com sucesso!");
          await handlerListCategories();
        } catch (error) {
          notifyError(error.message);
        }
      });
    };

    onMounted(() => {
      handlerListCategories();
    });

    return {
      columnsCategory,
      categories,
      loading,
      handlerListCategories,
      handlerEdit,
      handlerRemove,
      filter,
    };
  },
});
</script>

<style>
.all {
  width: 100%;
}
</style>
