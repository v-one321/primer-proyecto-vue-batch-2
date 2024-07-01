<template>
  <div class="container mt-3">
    <button class="btn btn-danger" type="button" @click="decrementar()">
      Decrementar
    </button>
    <h1 :class="contador > 10 ? 'text-success' : 'text-danger'">
      {{ contador }}
    </h1>
    <button class="btn btn-success" type="button" @click="contador++">
      incrementar
    </button>
    <br />
    <ul>
      <li v-for="(item, indice) in colores" :key="indice">{{ item }}</li>
    </ul>
    <RouterLink class="btn btn-primary" to="/api">ir a API</RouterLink>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
/*export default {
    setup() {
        const contador = ref(0);
        const colores = ref(['Amarillo', 'Verde', 'Negro', 'Blando'])
        const decrementar = () => {
            if (contador.value>1) {
                contador.value--;
            }
        }
        return{
            contador,
            decrementar,
            colores
        }
    }
}*/
const contador = ref(0);
const colores = ref(["Amarillo", "Verde", "Negro", "Blando"]);
const decrementar = () => {
  if (contador.value > 1) {
    contador.value--;
  }
};
</script>
<style>
</style>