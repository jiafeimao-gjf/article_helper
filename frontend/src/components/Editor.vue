<template>
  <textarea
    ref="textareaRef"
    class="editor"
    :value="modelValue"
    @input="handleInput"
    @paste="handlePaste"
    placeholder="在此输入 Markdown 内容..."
  ></textarea>
</template>

<script setup>
import { ref } from 'vue'
import { uploadImage } from '../api/article.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const textareaRef = ref(null)
const uploading = ref(false)

function handleInput(e) {
  emit('update:modelValue', e.target.value)
}

async function handlePaste(e) {
  const items = e.clipboardData?.items
  if (!items) return

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      e.preventDefault()
      const file = item.getAsFile()
      if (file) {
        await insertImage(file)
      }
      return
    }
  }
}

async function insertImage(file) {
  if (uploading.value) return

  uploading.value = true
  const originalValue = props.modelValue
  const textarea = textareaRef.value

  try {
    const result = await uploadImage(file)
    if (result.success && result.data?.url) {
      const imageUrl = result.data.url
      const markdownImage = `\n![${file.name}](${imageUrl})\n`

      // Insert at cursor position or at end
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const before = originalValue.substring(0, start)
      const after = originalValue.substring(end)

      emit('update:modelValue', before + markdownImage + after)

      // Move cursor after the inserted image
      setTimeout(() => {
        const newPos = start + markdownImage.length
        textarea.selectionStart = newPos
        textarea.selectionEnd = newPos
        textarea.focus()
      }, 0)
    }
  } catch (e) {
    console.error('Image upload failed:', e)
    alert('图片上传失败')
  } finally {
    uploading.value = false
  }
}
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
