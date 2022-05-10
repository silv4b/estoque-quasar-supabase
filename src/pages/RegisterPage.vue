<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerRegister">
      <p class="col-12 text-h6 text-center">Registro</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input outlined bottom-slots v-model="form.name" label="Nome">
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
          to="/login"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/UserAuthUser";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const { register } = useAuthUser();

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
      } catch (error) {
        alert(error.message);
      }
    };

    return { form, handlerRegister };
  },
});
</script>
