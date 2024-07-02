<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary-subtle">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Inicio</RouterLink>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/api">Rick y morty</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/sw-api">Star Wars</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/productos">Tienda</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/nasa">NASA</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav item">
            <RouterLink class="nav-link" aria-current="page" to="/carrito"
              >🛒 <span class="badge bg-danger">0</span></RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- se muestran las vistas de los componentes-->
  <RouterView />
</template>

<style>
</style>
