import { formatCurrency } from "src/utils/format";

const columnsProduct = [
  {
    name: "img_url",
    align: "left",
    label: "Imagem",
    field: "img_url",
  },
  {
    name: "nome",
    align: "left",
    label: "Produto",
    field: "nome",
    sortable: true,
  },
  {
    name: "descricao",
    align: "left",
    label: "Descrição",
    field: "descricao",
    sortable: true,
  },
  {
    name: "preco",
    align: "left",
    label: "Valor",
    field: "preco",
    format: ((val) => formatCurrency(val)),
    sortable: true,
  },
  {
    name: "estoque",
    align: "left",
    label: "Estoque",
    field: "estoque",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "",
    field: "actions",
  },
];

export {
  columnsProduct
};
