<template>
  <span class="readnext">{{ props.msg || "再读一篇" }} | 感觉不错</span>
</template>

<script setup>
const props = defineProps({
  msg:String
})
</script>

<style  scoped>
.readnext {
  background-color: #dae8e2;
  color: #4c9878;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 14px;
}
</style>