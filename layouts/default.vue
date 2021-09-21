<template>
  <div>
    <div class="header">Header</div>
    <Nuxt />
    <div class="footer">Footer</div>
  </div>
</template>

<style>
.footer {
  display: grid;
  max-width: 1480px;
  place-items: center;
  height: 202px;
  margin: 0 auto;
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #d5d1d1;
}

.header {
  display: grid;
  place-items: center;
  max-width: 1480px;
  height: 116px;
  margin: 0 auto;
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #d5d1d1;
}
</style>
