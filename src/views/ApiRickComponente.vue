<template>
    <div class="principal">
        <div class="jumbotron bg-light text-center">
            <h1 class="fw-bold" style="font-size: 10vw;">The Rick And morty API</h1>
        </div>
        <div class="container mt-5">
            <div class="row d-flex justify-content-center">
                <div class="col-8 b-3">
                    <input type="search" class="form-control form-control-lg" placeholder="Buscar..." v-model="search" @change="buscar()">
                </div>
                <div class="col-12 col-md-6 mt-3" v-for="item in datos" :key="item.id">
                    <div class="card mb-3 rounded-5 cursor" style="background-color: #353535;" @click="verDetalle(item.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm ">
            <div class="modal-content bg-dark">
            <div class="modal-body">
                <div class="row gy-4">
                    <div class="col-12 text-center">
                        <img :src="dato.image" class="rounded-circle border border-3" :class="{'border-success' : dato.status == 'Alive', 'border-danger' : dato.status == 'Dead', 'border-secondary' : dato.status == 'unknown'}" width="150px" height="150px" alt=""><br>
                        <span class="badge" :class="{'text-bg-success' : dato.status == 'Alive', 'text-bg-danger' : dato.status == 'Dead', 'text-bg-secondary' : dato.status == 'unknown'}">{{ dato.status }}</span>
                    </div>
                    <div class="col-12">
                        <h5 class="card-title text-white text-center">{{ dato.name }}</h5>
                        <ul class="list-group rounded-3">
                            <li class="list-group-item"><span class="fw-bold">Especie:</span> {{ dato.species }}</li>
                            <li class="list-group-item"><span class="fw-bold">Genero:</span> {{ dato.gender}}</li>
                            <li class="list-group-item"><span class="fw-bold">Tipo:</span> {{ dato.type }}</li>
                            <li class="list-group-item"><span class="fw-bold">Origen:</span> {{ dato.origin?.name }}</li>
                            <li class="list-group-item"><span class="fw-bold">Locacion:</span> {{ dato.location?.name }}</li>
                        </ul>
                    </div>
                    <div class="col-12 text-end">                        
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
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
    const dato = ref({});
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
            if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight *0.5){
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
    const verDetalle = async param => {
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${param}`);
            dato.value = data;
        } catch (error) {

            console.log(error);
        }
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
    .cursor{
        cursor: pointer;
    }
</style>