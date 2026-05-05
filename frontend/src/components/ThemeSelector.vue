<template>
  <div class="theme-selector">
    <label>文章主题</label>
    <div class="theme-buttons">
      <button
        v-for="theme in themes"
        :key="theme.id"
        :class="['theme-btn', { active: modelValue === theme.id }]"
        :style="{ background: theme.bg, color: theme.text, borderColor: modelValue === theme.id ? theme.accent : 'transparent' }"
        @click="$emit('update:modelValue', theme.id)"
        :title="theme.name"
      >
        {{ theme.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'default'
  }
})

defineEmits(['update:modelValue'])

const themes = [
  { id: 'default', label: '默认', bg: '#ffffff', text: '#333333', accent: '#0066cc' },
  { id: 'github', label: 'GitHub', bg: '#f6f8fa', text: '#24292f', accent: '#0969da' },
  { id: 'sepia', label: '护眼', bg: '#f4ecd8', text: '#5c4b37', accent: '#b8860b' },
  { id: 'dark', label: '深色', bg: '#1e1e1e', text: '#d4d4d4', accent: '#6cb6ff' },
  { id: 'academic', label: '学术', bg: '#fefefe', text: '#2c2c2c', accent: '#1a5f7a' },
  { id: 'minimal', label: '极简', bg: '#fafafa', text: '#1a1a1a', accent: '#000000' },
  { id: 'typewriter', label: '打字机', bg: '#f5f5dc', text: '#2f2f2f', accent: '#8b4513' },
  { id: 'forest', label: '森林', bg: '#f0f7f0', text: '#2d4a2d', accent: '#2e7d32' },
  { id: 'ocean', label: '海洋', bg: '#e8f4f8', text: '#1a3a4a', accent: '#0077b6' },
  { id: 'sakura', label: '樱花', bg: '#fff5f5', text: '#4a3a3a', accent: '#c2185b' },
  { id: 'cyberpunk', label: '赛博', bg: '#0d0d0d', text: '#f0f0f0', accent: '#ff00ff' },
  { id: 'magazine', label: '杂志', bg: '#ffffff', text: '#1a1a1a', accent: '#e63946' },
  { id: 'mint', label: '薄荷', bg: '#f0fff4', text: '#2d3748', accent: '#38a169' }
]
</script>

<style scoped>
.theme-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-selector label {
  font-size: 14px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.theme-buttons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.theme-btn {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  border: 2px solid transparent;
  transition: border-color 0.2s, transform 0.1s;
  min-width: 48px;
}

.theme-btn:hover {
  transform: translateY(-1px);
}
</style>
