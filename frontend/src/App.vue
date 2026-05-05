<template>
  <div class="app">
    <header class="header">
      <div class="header-left">
        <router-link to="/" class="logo">MD 文章渲染器</router-link>
      </div>
      <nav class="header-nav">
        <router-link to="/">写作</router-link>
        <router-link to="/list">文章列表</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.header-nav {
  display: flex;
  gap: 24px;
}

.header-nav a {
  color: var(--text-secondary);
  font-size: 14px;
}

.header-nav a.router-link-active {
  color: var(--accent);
}

.main {
  flex: 1;
  overflow: hidden;
}
</style>
