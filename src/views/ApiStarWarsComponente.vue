<template>
    <div class="jumbotron bg-dark text-white text-center">
        <h1 class="fw-bold" style="font-size: 10vw;">The Star Wars API</h1>
    </div>
    <div class="container mt-5">
        <div class="row gy-4 d-flex justify-content-center">
            <div class="col-12 col-md-4" v-for="(item, indice) in datos" :key="indice">
                <div class="card cursor" @click="verDetalle(indice + 1)">
                    <img :src="`../../public/people/${indice + 1}.jpg`" width="100%" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{ item.name }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg ">
            <div class="modal-content bg-dark">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <img :src="`../../public/people/${imagen}.jpg`" class="rounded-3" width="100%" height="100%" alt="">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="modal-body">
                            <div class="row gy-4">
                                <div class="col-12">
                                    <h5 class="card-title text-white text-center">{{ dato.name }}</h5>
                                    <ul class="list-group rounded-3">
                                        <li class="list-group-item"><span class="fw-bold">Nacimiento:</span> {{ dato.birth_year }}</li>
                                        <li class="list-group-item"><span class="fw-bold">Estatura:</span> {{ dato.height }}cm</li>
                                        <li class="list-group-item"><span class="fw-bold">Peso:</span> {{ dato.mass }}kg</li>
                                        <li class="list-group-item"><span class="fw-bold">Genero:</span> {{ dato.gender }}</li>
                                        <li class="list-group-item"><span class="fw-bold">Color de pelo:</span> {{ dato.hair_color }}</li>
                                        <li class="list-group-item"><span class="fw-bold">Color de piel:</span> {{ dato.skin_color }}</li>
                                        <li class="list-group-item"><span class="fw-bold">Color de ojos:</span> {{ dato.eye_color }}</li>
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
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
export default {
    setup(){
        const datos = ref([]);
        const urlBase = 'https://swapi.dev/api/';
        const dato = ref({});
        const paginacion = ref({
            total: null,
            pagina: 1,
        });
        const imagen = ref(null);
        let modal = null;
        let instanciaModal = null;
        onMounted(() => {
            modal = document.getElementById('staticBackdrop');
            instanciaModal = new Modal(modal);
            window.addEventListener('scroll', cargarMas);
            listar()
        });
        const listar = async () => {
            try {
                const { data } = await axios.get(`${urlBase}people?page=${paginacion.value.pagina}`);
                datos.value.push(...data.results);
                paginacion.value.total = data.count;
            } catch (error) {
                console.log(error);
            }
        }
        const cargarMas = ()=>{
            if (paginacion.value.total > datos.value.length) {
                if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
                    paginacion.value.pagina++;
                    listar();
                }
            }
        }
        const verDetalle = async param =>{
            try {
                const { data } = await axios.get(`${urlBase}people/${param}`);
                dato.value = data;
                imagen.value = param;
                instanciaModal.show();
            } catch (error) {
                console.log(error);
            }
        }
        return{
            datos,
            verDetalle,
            imagen,
            dato
        }
    }
}
</script>
<style>
    .cursor{
        cursor:pointer;
    }
</style>