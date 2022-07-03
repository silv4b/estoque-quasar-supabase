<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Estoque </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handlerLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";
import UseAuthUser from "../composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import useDialog from "src/composables/UseDialog";

const mdiIcon = (name) => {
  return "mdi-" + name;
};

const linksList = [
  {
    title: "Início",
    caption: "Página principal",
    icon: mdiIcon("home"),
    routeName: "me",
  },
  {
    title: "Categorias",
    caption: "Categorias cadastradas",
    icon: mdiIcon("shape-outline"),
    routeName: "category",
  },
  {
    title: "Produtos",
    caption: "Produtos cadastrados",
    icon: mdiIcon("basket-outline"),
    routeName: "product",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const { logout } = UseAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const { dialogShow } = useDialog();

    const handlerLogout = async () => {
      dialogShow({
        tittle: "Sair",
        message: "Deseja realmente sair da aplicação?",
      })
        .onOk(async () => {
          try {
            await logout();
            await router
              .replace({
                name: "login",
              })
              .then(notifySuccess("Bye bye! 😁"));
          } catch (error) {
            notifyError(error.message);
          }
          /** o replace elimina o histórico de rotas, diferente
           * do push, que adicionar na pilha de histórico
           */
        })
        .onCancel(async () => {
          notifySuccess("Ops, ia mas voltou! 😁");
        });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handlerLogout,
    };
  },
});
</script>
