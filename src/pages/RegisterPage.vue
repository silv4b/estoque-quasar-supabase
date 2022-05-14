<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form class="row justify-center" @submit.prevent="handlerRegister">
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Registro</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="form.name"
              label="Nome"
              counter
              maxlength="50"
              :rules="[
                (val) => (val && val.length > 0) || 'Nome é obrigatório!',
                isNameBiggerThan50,
              ]"
              hint="Digite seu nome."
            >
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.name = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Email é obrigatório!',
                isValidEmail,
              ]"
              hint="Digite um email válido!"
            >
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
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.password"
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
                  @click="form.password = ''"
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
              label="Registrar"
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
import { useRouter } from "vue-router";

import useAuthUser from "src/composables/UserAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
      email: "",
      passor: "",
    });

    const handlerRegister = async () => {
      try {
        await register(form.value);
        router.replace({
          name: "email-confirmation",
          query: { email: form.value.email, name: form.value.name },
        });
        notifySuccess("Email de confirmação enviado! 😁");
      } catch (error) {
        notifyError(error.message);
      }
    };

    return { form, handlerRegister };
  },
  data() {
    return {
      email: "",
      password: "",
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
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Formato de email inválido!";
    },
    isValidPassword(val) {
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$/; // regex de senha segurar email
      return (passwordPattern.test(val) && val.length >= 6) || "Senha fraca!";
    },
    isNameBiggerThan50(val) {
      return !(val.length == 50) || "Nome não pode ter mais de 50 caracteres.";
    },
  },
});
</script>

<style lang="scss">
.q-card {
  margin: 0.8rem !important;
}
</style>
