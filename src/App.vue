<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
.q-card {
  margin: 0.8rem !important;
  min-width: 420px;
}

@media (max-width: 600px) {
  .q-card {
    margin: 0.8rem !important;
    min-width: 300px;
  }
}

* {
  transition: all 0.3s ease-in-out;
  scroll-behavior: smooth;
}
</style>
