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
import UseAuthUser from "../composables/UseAuthUser";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const { user } = UseAuthUser();
    return {
      user,
    };
  },
});
</script>
