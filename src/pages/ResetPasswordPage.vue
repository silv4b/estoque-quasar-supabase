<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerPasswordReset"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Recuperação de Senha</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="password"
              label="Nova senha"
              :type="visibility"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Senha é obrigatória.',
                isValidPassword,
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="password = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint> Digite uma senha forte! </template>

              <template v-slot:after>
                <q-btn
                  v-if="visibility == 'password'"
                  round
                  dense
                  flat
                  icon="visibility"
                  @click="changeTypeEdit()"
                ></q-btn>
                <q-btn
                  v-else
                  round
                  dense
                  flat
                  icon="visibility_off"
                  @click="changeTypeEdit()"
                ></q-btn>
              </template>
            </q-input>
            <q-btn
              label="Recuperar Senha"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import useAuthUser from "src/composables/UserAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "ResetPasswordPage",
  setup() {
    const { resetPassword } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const route = useRoute(); // rota atual
    const router = useRouter(); // funções de rota (push, replace, etc...)

    const password = ref("");
    const token = route.query.token;

    const handlerPasswordReset = async () => {
      try {
        await resetPassword(token, password.value);
        router.push({ name: "login" });
        notifySuccess(`Senha atualizada! 👌`);
      } catch (error) {
        notifyError(error.message);
      }
      // adicionar try catch para avisar que a alteração foi concluída com sucesso
    };
    return {
      password,
      handlerPasswordReset,
    };
  },
  data() {
    return {
      visibility: "password",
    };
  },
  methods: {
    changeTypeEdit() {
      if (this.visibility == "password") {
        this.visibility = "text";
      } else {
        this.visibility = "password";
      }
    },

    isValidPassword(val) {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/; // regex de senha segurar email
      /**
       * ter tamanho mínimo 6 caracteres.
       * Deves ter somente letras e numero e caractere especial(!#@$%&)
       * Deve ter no mínimo uma letra maiúscula e minúscula.
       * Deve ter no mínimo um numero.
       * Deve ter no mínimo caractere especial(!#@$%&)
       */
      return (passwordPattern.test(val) && val.length >= 6) || "Senha fraca!";
    },
  },
});
</script>

<style lang="scss"></style>
