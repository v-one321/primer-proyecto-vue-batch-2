<template>
    <div class="bg-dark-subtle">
        <div class="jumbotron bg-dark text-white text-center rounded-bottom-5">
            <h1 class="fw-bold" style="font-size: 10vw;">Tienda de productos API</h1>
        </div>
        <div class="container mt-5">
            <div class="row gy-4 d-flex justify-content-center">
                <div class="col-12 col-md-4" v-for="item in datos" :key="item.id">
                    <div class="card rounded-bottom-5">
                        <div class="row">
                            <div class="col-12 col-md-4" >
                                <img :src="item.thumbnail" width="100%" height="100%" alt="">
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="card-header  rounded-bottom-5 bg-danger text-white">
                                    <h5 class="fw-bold fs-3">{{ item.title }}</h5>
                                </div>
                                <div class="card-body">
                                    <p><span class="fw-bold">Categoria:</span> {{ item.category }}</p>
                                    <p><span class="fw-bold">Descripcion:</span> {{ item.description.substring(0, 45) }} <a href="#">Ver mas..</a></p>
                                    <p class="text-center"><small class="badge bg-warning me-1 ms-1" v-for="(tags, indice) in item.tags" :key="indice">{{ tags }}</small></p>
                                    <p><span class="fs-1 fw-bold text-success">${{ item.price }}</span> <span class="text-muted text-decoration-line-through">{{ (item.price + item.discountPercentage).toFixed(2) }}</span></p>
                                    <div class="text-center">
                                        <button class="btn" :class="buscar(item.id) ? 'btn-danger disabled' : 'btn-outline-primary'" @click="addCarrito(item.id)"><i class="fas fa-shopping-cart"></i> Add</button>
                                    </div>
                                </div>
                                <div class="card-footer border-0 text-center">                                    
                                    <span class="text-muted text-center">{{ item.warrantyInformation }}</span>
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
import { onMounted, ref } from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    setup(){
        const datos = ref([]);
        const carrito = ref([]);
        const paginacion = ref({
            total:null,
            pagina:0,
            limite: 10
        });
        const urlBase = 'https://dummyjson.com/';
        const listar = async ()=>{
            try {
                const { data } = await axios.get(`${urlBase}products?skip=${paginacion.value.pagina}&limit=${paginacion.value.limite}`);
                datos.value.push(...data.products);
                paginacion.value.total = data.total;
            } catch (error) {
                console.log(error);
            }
        }
        onMounted(()=>{
            if(localStorage.getItem('carrito') != null){
                carrito.value = JSON.parse(localStorage.getItem('carrito'));
            }
            window.addEventListener('scroll', cargarMas);
            listar();
        });        
        const cargarMas = ()=>{
            if (paginacion.value.total > datos.value.length) {
                if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
                    paginacion.value.pagina+=10;
                    listar();
                }
            }
        }
        const buscar = param => {
            return carrito.value.find(element => element.id == param);
        }
        const addCarrito = async param => {
            try {
                const { data } = await axios.get(`${urlBase}products/${param}`);
                let objeto = {
                    id: data.id,
                    nombre: data.title,
                    categoria: data.category,
                    imagen: data.thumbnail,
                    precioSinDescuento: data.price + data.discountPercentage,
                    precio: data.price,
                    stock: data.stock,
                    cantidad: 1
                }
                carrito.value.push(objeto);
                localStorage.setItem('carrito', JSON.stringify(carrito.value));
                Swal.fire({
                    title: "Bien!",
                    text: "Registro agregado correctamente",
                    icon: "success"
                });
            } catch (error) {
                console.log(error);
            }
        }
        return{
            datos,
            addCarrito,
            buscar,
        }
    }
}
</script>
<style>
    .tarjeta-borde{
        border-radius: 0px 0px 50px 0px;
    }
</style>