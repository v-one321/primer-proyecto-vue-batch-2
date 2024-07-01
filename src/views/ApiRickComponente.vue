<template>
    <div class="principal">
        <div class="jumbotron bg-light text-center">
            <h1 class="display-5 fw-bold">The Rick And morty API</h1>
        </div>
        <div class="container mt-5">
            <div class="row d-flex justify-content-center">
                <div class="col-8 b-3">
                    <input type="search" class="form-control form-control-lg" placeholder="Buscar..." v-model="search" @change="buscar()">
                </div>
                <div class="col-12 col-md-6 mt-3" v-for="item in datos" :key="item.id">
                    <div class="card mb-3 rounded-5" style="background-color: #353535;">
                        <div class="row g-0">
                            <div class="col-12 col-md-4">
                                <img :src="item.image" class="rounded-5" width="100%" height="100%" :alt="item.name">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body text-white">
                                    <h4 class="card-title">{{ item.name }}</h4>
                                    <p class="card-text">{{item.status == 'Alive'? '🟢' : (item.status == 'Dead'? '🔴' : '⚪')}} {{ item.status }} - {{ item.species }}</p>
                                    <span class="texto">Last known location:</span>
                                    <p>{{ item.location.name}}</p>
                                    <span class="texto">Origin:</span>
                                    <p>{{ item.origin.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <button type="button" class="btn btn-primary btn-lg" @click="cargarMas()">Cargar mas</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
    const datos = ref([]);
    const paginacion = ref({
        total: null,
        pagina: 1,
    });
    const search = ref('');
    onMounted(()=>{
        window.addEventListener('scroll', cargarMas);
        listar();
    })
    const listar = async () =>{
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${paginacion.value.pagina}&name=${search.value}`);
            datos.value.push(...data.results);
            paginacion.value.total = data.info.pages;
        } catch (error) {
            console.log(error);
        }
    }
    const cargarMas = ()=>{
        if (paginacion.value.total > paginacion.value.pagina) {
            if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
                paginacion.value.pagina++;
                listar();
            }
        }
    }
    const buscar = () =>{
        datos.value = [];
        paginacion.value.pagina = 1;
        listar();
    }
</script>
<style>
    .fondo{
        background-color: #353535;
    }
    .texto{
        color: #9e9e9e;
    }
    .principal{
        background-color: #202329;
    }
</style>