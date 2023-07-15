<template>
  <div class="card mb-5">
    <div class="card-content">
      <h2 class="title">¡Hola amigos! He creado una aplicación consumiendo la API de Rick and Morty</h2>
      <p class="description">Te invito a echarle un vistazo. Puedes dejar tus comentarios para mejorarla o sugerir nuevas funcionalidades.</p>
      <p class="description">Además, estamos utilizando el almacenamiento Vuex para gestionar los datos en la aplicación.</p>
    </div>
    <div class="container mt-4 mb-5">
      <div class="row d-flex align-items-stretch">
        <div class="col-md-6 mb-4" v-for="component in components" :key="component.name">
          <div class="card">
            <div class="card-content">
              <component :is="component.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyResources from "@/components/MyResources.vue";
import UsedTechnologies from "@/components/UsedTechnologies.vue";
export default {
  components: {
    UsedTechnologies,
    MyResources
  },
  data() {
    return {
      components: [
        { name: "UsedTechnologies" },
        { name: "MyResources" }
      ]
    };
  }
}
</script>

<style scoped>
.card {
  width: 90%;
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 10px;
}

.tech-list li {
  margin-bottom: 10px;
}

.tech-list li i {
  margin-right: 8px;
  font-size: 18px;
}
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content {
  flex: 1;
}
</style>
