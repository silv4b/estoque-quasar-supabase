<template>
  <q-page padding>
    <p class="text-body1">
      <strong>{{ $route.query.name }}</strong
      >, obrigado por se registrar! ❤️
    </p>
    <p class="text-body1">
      Clique no botão abaixo para confirmar o seu cadastro com o email:
      <strong>{{ $route.query.email }}</strong
      >.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmationPage",
});
</script>
