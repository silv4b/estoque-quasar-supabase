<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Categorias"
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="col-12"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Treats</div>
          <q-space />
          <!-- Adicionar funcionalidade em um floating button -->
          <!-- <q-btn
            flat
            dense
            size="md"
            color="primary"
            label="Nova Categoria"
            class="q-ml-md"
          /> -->
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
            >
              <q-tooltip> Editar categoria </q-tooltip></q-btn
            >
            <q-btn icon="mdi-delete-outline" flat color="red" dense size="md">
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

const rows = [
  {
    id: "123",
    name: "Tênis",
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryListPage",
  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>

<style></style>
