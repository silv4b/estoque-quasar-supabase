<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>
        Olá, <strong>{{ user.user_metadata.name }}</strong
        >.
      </p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import userAuthUser from "../composables/UserAuthUser";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const { user } = userAuthUser();
    return {
      user,
    };
  },
});
</script>
