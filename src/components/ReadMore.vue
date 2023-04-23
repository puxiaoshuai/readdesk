<template>
  <span @click="debuouceFun" class="readnext">{{ props.msg || '再读一篇' }} | 感觉不错</span>
</template>

<script setup>
import debounce from 'lodash/debounce'
const props = defineProps({
  msg: String
})
const emit = defineEmits(['click'])
const debuouceFun = debounce(handleClick,800)
function handleClick() {
  emit('click', true)
}
</script>

<style  scoped>
.readnext {
  background-color: #dae8e2;
  color: #4c9878;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 14px;
}
.readnext:hover{
  cursor: pointer;
}

</style>