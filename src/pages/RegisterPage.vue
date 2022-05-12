<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form class="row justify-center" @submit.prevent="handlerRegister">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Registro</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
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
import { useQuasar } from "quasar";
import useAuthUser from "src/composables/UserAuthUser";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const $q = useQuasar();

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

    return { form, handlerRegister };
  },
});
</script>
