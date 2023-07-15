<template>
  <div class="footer-tech  ">
    <ul class="tech-list mx-auto text-lg-start">
      <li><h2 class="mb-4">Recursos</h2> </li>
      <li v-for="techItem in techItems" :key="techItem.text">
        <i :class="['bx', techItem.icon, 'icon']"></i> {{ techItem.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const techItems = [
  { icon: 'bx bx-world', text: 'API de Rick and Morty' },
  { icon: 'bx bxs-data', text: 'Vuex (almacenamiento)' }
];
</script>

<style scoped>
.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 22px;
}

.tech-list li {
  margin-bottom: 10px;
}

.tech-list li .icon {
  font-size: 30px;
  margin-right: 8px;
}

.tech-list li .icon.bxl-vuejs {
  color: #4FC08D;
}

.tech-list li .icon.bx-package {
  color: #DB7093;
}

.tech-list li .icon.bxl-bootstrap {
  color: #7952B3;
}

.tech-list li .icon.bx-world {
  color: #E9B32B;
}

.tech-list li .icon.bxs-data {
  color: #764ABC;
}

.footer-tech {
  display: flex;
  align-items: center;
}
</style>
