<script setup>
import { demoApi } from './apis/demo';
const handleClick = async () =>{
  const res = await demoApi()
  console.log(res);
}
</script>

<template>
  <el-button type="primary" @click="handleClick">i am button</el-button>
</template>

<style scoped></style>
