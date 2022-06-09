<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Produtos"
        :rows="products"
        :columns="columnsProduct"
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
          <div class="col-2 q-table__title">Produtos</div>
          <q-space />
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
            <q-avatar rounded>
              <img :src="props.row.img_url" />
            </q-avatar>
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
          label="Nova Categoria"
          label-position="left"
          :to="{ name: 'form-product' }"
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
import { columnsProduct } from "./TableProduct";

export default defineComponent({
  name: "ProductListPage",
  setup() {
    const products = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const table = "produto";

    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogShow } = useDialog();

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
    };
  },
});
</script>

<style></style>
