<template>
    <div class="principal">
        <div class="jumbotron bg-light text-center rounded-bottom-5">
            <h1 class="fw-bold" style="font-size: 10vw;">The NASA API</h1>
        </div>
        <div class="container ">
            <div class="row d-flex justify-content-center gy-4">
                <div class="col-12 col-md-4 text-center">
                    <label for="" class="form-label text-white fw-bold fs-2">Inicio</label>
                    <input type="date" class="form-control" v-model="parametros.fecha_inicio">
                </div>
                <div class="col-12 col-md-4 text-center">
                    <label for="" class="form-label text-white fw-bold fs-2">Fin</label>
                    <input type="date" class="form-control" v-model="parametros.fecha_fin">
                </div>
                <div class="col-12 col-md-4 text-center"><br>
                    <button class="btn btn-outline-warning text-white fw-bold fs-3" style="width: 100%" @click="listar()">Mostrar</button>
                </div>
                <div class="col-12 col-md-4" v-for="(item, indice) in datos" :key="indice" v-show="datos.length > 0">
                    <div class="card border-0">
                        <a :href="item.url" target="_blank">
                            <img :src="item.url" :alt="item.title" width="100%" height="500px">
                        </a>
                        <div class="card-header rounded-bottom-5 bg-dark text-white">
                            <h5 class="fw-bold fs-3">{{ item.title }}</h5>
                        </div>
                        <div class="card-body">
                            <p>{{ item.explanation.substring(0, 250) }}... <a href="#">Ver mas</a></p>
                        </div>
                        <div class="card-footer rounded-top-5 bg-dark text-center">
                            <p class="text-white fw-bold fs-4">{{ item.date }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8" v-show="datos.length == 0" style="height: 100vw">
                   <div class="alert alert-danger text-center">
                        <span class="display-5 fw-bold">Seleccione una fecha<i class="fas fa-calendar ms-4"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
    const datos = ref([]);
    const urlBase = 'https://api.nasa.gov/planetary/';
    const parametros = ref({
        fecha_inicio: null,
        fecha_fin: null,
    })
    const key = 'ydj7IQRuoWBPyiQlPKBCpgaTvt4hZqBckklvEkIB';
    const listar = async () => {
        if (parametros.value.fecha_inicio != "" && parametros.value.fecha_fin != "" && parametros.value.fecha_inicio != null && parametros.value.fecha_fin != null) {
            try {
                const {data} = await axios.get(`${urlBase}apod?start_date=${parametros.value.fecha_inicio}&end_date=${parametros.value.fecha_fin}&api_key=${key}`);
                datos.value = data;
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire({
                text: 'Necesita seleccionar fechas',
                title: 'Error!',
                icon: 'error',
            })
        }
    }
</script>
<style>    
    .principal{
        background: url('fondo.jpg');        
    }
</style>