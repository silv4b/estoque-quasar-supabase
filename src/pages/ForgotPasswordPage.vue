<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form class="row justify-center" @submit.prevent="handlerPasswordReset">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Recuperação de Senha</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input outlined bottom-slots v-model="email" label="Email">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="email = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-btn
              label="Recuperar Senha"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
            <q-btn
              label="Voltar para login"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'login' }"
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
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ForgotPasswordPage",
  setup() {
    const { sendPasswordResetEmail } = useAuthUser();
    const email = ref("");
    const $q = useQuasar();

    const handlerPasswordReset = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        $q.notify({
          message: `Email de recuperação de email enviado para ${email.value}`,
          color: "primary",
          actions: [
            {
              label: "Ok",
              color: "white",
            },
          ],
        });
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

    return {
      email,
      handlerPasswordReset,
    };
  },
});
</script>
