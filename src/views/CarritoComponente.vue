<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="table-danger">
                                    <tr>
                                        <th>Item</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoria</th>
                                        <th>Stock</th>
                                        <th>Cantidad</th>
                                        <th>Precio <span class="text-danger">(Unitario)</span></th>
                                        <th>Precio <span class="text-danger">(Total)</span></th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                    <tr v-for="(item, indice) in datos" :key="indice">
                                        <td>{{ indice + 1}}</td>
                                        <td><img :src="item.imagen" alt="" width="70" height="70"></td>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.categoria }}</td>
                                        <td class="text-end">{{ item.stock }}</td>
                                        <td class="text-end">{{ item.cantidad }}</td>
                                        <td class="text-end">{{ (item.precioSinDescuento).toFixed(2) }}</td>
                                        <td class="text-end">{{ (item.precioSinDescuento).toFixed(2) }}</td>
                                        <td class="text-center"><button class="btn btn-danger btn-sm" @click="eliminarCarrito(indice)">🚫</button></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="table-primary">
                                        <th class="text-end fs-5" colspan="7">Subtotal</th>
                                        <th class="fs-5 text-end">${{ subtotal.toFixed(2) }}</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th class="text-end fs-5 text-danger" colspan="7">Descuento</th>
                                        <th class="fs-5 text-end text-danger">${{ (subtotal - total).toFixed(2)}}</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th class="text-end fs-3 text-success" colspan="7">Total</th>
                                        <th class="fs-3 text-end text-success">${{ total.toFixed(2) }}</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
    const datos = ref([]);
    const total = ref(0);
    const subtotal = ref(0);
    onMounted(()=>{
        if (localStorage.getItem('carrito') != null) {
            datos.value = JSON.parse(localStorage.getItem('carrito'));
        }
        obtenerPrecio();
    });
    const obtenerPrecio = () => {
        total.value = 0;
        subtotal.value = 0;
        datos.value.forEach(element => {
            subtotal.value += element.precioSinDescuento;
            total.value += element.precio;
        })
    }
    const eliminarCarrito = param => {
        datos.value.splice(param,1);
        localStorage.setItem('carrito', JSON.stringify(datos.value));
        obtenerPrecio();
    }
</script>
<style>
    
</style>