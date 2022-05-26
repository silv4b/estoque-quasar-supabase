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

        <q-toolbar-title> Quasar App </q-toolbar-title>

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
        <q-item-label header> Essential Links </q-item-label>

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
import { useQuasar } from "quasar";

import EssentialLink from "components/EssentialLink.vue";
import userAuthUser from "../composables/UserAuthUser";
import useNotify from "src/composables/UseNotify";
import useDialog from "src/composables/UseDialog";

const linksList = [
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
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
    const { logout } = userAuthUser();
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
            notifySuccess("Bye bye! 😁");
            router.replace({
              name: "login",
            });
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
