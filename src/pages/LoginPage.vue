<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerLogin"
    >
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <p class="col-12 text-h6 text-left">Login</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input outlined bottom-slots v-model="form.email" label="Email">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.email = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint v-if="!form.email">
                Digite seu email.
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.password"
              label="Senha"
              type="password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.password = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint v-if="!form.password">
                Digite sua senha.
              </template>
            </q-input>
            <q-btn
              label="Login"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
            <q-btn
              label="Registrar"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'register' }"
            ></q-btn>
            <q-btn
              label="Esqueci minha senha!"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'forgot-password' }"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UserAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const $q = useQuasar();

    const form = ref({
      email: "",
      passor: "",
    });

    const handlerLogin = async () => {
      try {
        await login(form.value);
        router.replace({ name: "me" });
      } catch (error) {
        $q.notify({
          message: error.message,
          color: "primary",
          actions: [
            {
              label: "Ok",
              color: "white",
            },
          ],
        });
      }
    };

    return { form, handlerLogin };
  },
});
</script>

<style lang="scss">
.q-card {
  margin: 0.4rem !important;
}
</style>
