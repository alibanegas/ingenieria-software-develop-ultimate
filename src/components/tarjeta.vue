<template>
    <!--El evento clic abre el modal-->
    <div v-if="data['urlimage'] != undefined" @click="mostrarModal" class="contenedor col-6 col-md-3 col-lg-2">
        <div :class="[data['available'] === false ? 'noDispo' : '']" :id=data.code class="card">
            <div class="encabezado-img">
                <img :src="require('../assets/img/' + data['urlimage'])" class="card-img-top img-fluid" alt="...">
            </div>
            <div class="card-body">
                <div class="card-title">
                    <span>{{ data['name'] }}</span>
                </div>
                <miniItemsProducto v-if="modulo === 'Inventario'" :dataProducto="data" />
                <ItemsCardEmpleados v-if="modulo === 'Empleados'" :dataProducto="data" />
            </div>
        </div>
    </div>
    <!--Condicionamos con una bool la visibilidad del modal y escuchamos el evento emitido para cerrar el modal, así como le pasamos un objeto con la información que debe mostrar-->
    <modal v-if="mostrandoModal" @ocultar-modal="() => mostrarModal()" :data=data :modulo=modulo />
</template>

<style scoped>
.contenedor {
    padding: 0 3px;
}

.card {
    margin: 4px;
    border-radius: 15px;
    filter: drop-shadow(0px 0px 3px #3f596bbf);
    box-sizing: border-box;
    line-height: normal;
}

.card:hover {
    filter: drop-shadow(2px 4px 6px #3f596bbf);
    cursor: pointer;
}

.card .encabezado-img {
    width: 95%;
    height: 30%;
    margin: 1% auto 0 auto;
    border-radius: inherit;

}

.card .encabezado-img img {
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
}

.card .card-body {
    padding: 0px 4px 5px 4px;
    line-height: normal;
}

.card .card-body .card-title {
    font-size: calc(.9em + .4vw);
    font-weight: 600;
    color: #3581B8;
    margin: 0;
    text-align: center;
    font-family: 'fredoka-family';
}

.noDispo {
    filter: opacity(.65);
}

.noDispo:hover {
    filter: opacity(.7);
}

/*
* Media Query para Tablet
*/
@media (max-width: 991.5px) {
    .card .card-body .card-title {
        font-size: calc(.9em + .5vw);
    }
}

/*
* Media Query para celular
*/
@media (max-width: 678px) {
    .card .card-body .card-title {
        font-size: calc(1em + 1vw);
    }
}
</style>

<script setup>
import { ref } from "vue";
import modal from '@/components/modal.vue'
import miniItemsProducto from '@/components/minicomponents/itemsCardProductos.vue'
import ItemsCardEmpleados from "./minicomponents/itemsCardEmpleados.vue";

const proposTarjeta = defineProps([
    'data',
    'modulo'
])
const mostrandoModal = ref(false)

const mostrarModal = () => {
    mostrandoModal.value = !mostrandoModal.value
}
</script>