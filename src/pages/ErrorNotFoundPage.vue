<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 10vh">404</div>

      <div class="text-h4" style="opacity: 0.4">Opa, nada por aqui :/</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        size="lg"
        :to="{ name: 'login' }"
        label="Início"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFoundPage",
});
</script>
