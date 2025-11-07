<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <RouterView/>
  <div class="var-scss-test">var-scss-test</div>
</template>

<style scoped lang="scss">
.var-scss-test{
  color: $priceColor;
}
</style>
