<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerLogin">
      <p class="col-12 text-h6 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <!-- <q-input label="Email" v-model="form.email" outlined> </q-input> -->
        <!-- <q-input type="password" label="Senha" v-model="form.password" outlined> -->
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
          <!-- <template v-slot:hint> Field hint </template> -->
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
          <!-- <template v-slot:hint> Field hint </template> -->
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
          to="/register"
        ></q-btn>
      </div>
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
