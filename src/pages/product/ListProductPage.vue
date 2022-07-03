<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Produtos"
        row-key="id"
        class="col-12"
        no-data-label="Não foi encontrado nada ..."
        no-results-label="Sem resultados para este filtro."
        :rows="products"
        :columns="columnsProduct"
        :loading="loading"
        :visible-columns="visibleColumns"
        :pagination="pagination"
        :filter="filter"
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

          <div class="col-2 q-table__title">Produtos</div>

          <q-space />
          <q-select
            v-model="visibleColumns"
            dense
            multiple
            borderless
            options-dense
            emit-value
            map-options
            :display-value="$q.lang.table.columns"
            :options="columnsProduct"
            option-value="name"
            style="min-width: 100px"
          />
          <!-- options-cover -->
          <q-btn
            flat
            round
            dense
            icon="mdi-reload"
            @click="handlerListProducts()"
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
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar rounded v-if="props.row.img_url">
              <img :src="props.row.img_url" />
            </q-avatar>
            <q-avatar
              rounded
              v-else
              color="grey"
              text-color="white"
              icon="mdi-image-off"
            />
          </q-td>
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
          label="Novo Produto"
          label-position="left"
          :to="{ name: 'form-product' }"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { columnsProduct } from "./TableProduct";

import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import useDialog from "src/composables/UseDialog";
import useDetectPlatform from "src/composables/UseDetectPlatform";

export default defineComponent({
  name: "ProductListPage",
  setup() {
    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogShow } = useDialog();
    const { androidPlatform } = useDetectPlatform();

    const products = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const table = "produto";
    const isAndroid = androidPlatform();
    const filter = ref("");

    const handlerListProducts = async () => {
      try {
        loading.value = true;
        products.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error);
      }
    };

    const handlerEdit = async (category) => {
      await router.push({ name: "form-product", params: { id: category.id } });
    };

    const handlerRemove = async (category) => {
      dialogShow({
        message: `Deseja remover o produto ${category.name}?`,
      }).onOk(async () => {
        try {
          await remove(table, category.id);
          notifySuccess("Produto removido com sucesso!");
          await handlerListProducts();
        } catch (error) {
          notifyError(error.message);
        }
      });
    };

    const visibleColumns = ref([
      "img_url",
      "nome",
      "descricao",
      "preco",
      "estoque",
      "actions",
    ]);

    if (isAndroid) {
      visibleColumns.value = ["nome", "preco", "actions"];
    }

    const pagination = ref({
      sortBy: "nome",
      descending: false,
      rowsPerPage: 10,
    });

    onMounted(() => {
      handlerListProducts();
    });

    return {
      columnsProduct,
      products,
      loading,
      handlerListProducts,
      handlerEdit,
      handlerRemove,
      visibleColumns,
      pagination,
      filter,
      isAndroid,
    };
  },
});
</script>

<style>
.all {
  width: 100%;
}
</style>
