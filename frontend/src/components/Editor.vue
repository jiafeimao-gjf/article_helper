<template>
  <textarea
    class="editor"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="在此输入 Markdown 内容..."
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  border-radius: 0;
  padding: 20px;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 14px;
  line-height: 1.6;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.editor:focus {
  outline: none;
}
</style>
