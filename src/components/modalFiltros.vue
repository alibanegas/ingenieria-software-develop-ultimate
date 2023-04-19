<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="filtros-secundarios">
                        <selectBox class="filtro" label="Sucursales:" :data="sucursales" :seleccionado="sucursal"
                            @codigo="(codigoC) => modificarCodigoSucursal(codigoC)" />
                        <div class="filtro-existencia d-flex filtro">
                            <input v-model="available" type="checkbox"
                                name="checkExistencia" id="existencia">
                            <label for="existencia">En existencias</label>
                        </div>
                        <selectBox class="filtro" label="Categorias:" :data="categorias" :seleccionado="categoria"
                            @codigo="(codigoC) => modificarCodigoCategoria(codigoC)" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-cerrar" @click="aplicarFiltros">Aplicar</button>
                    <button type="button" class="btn btn-cerrar" @click="cerrarModal">Cancelar</button>
                    <!--Emitimos un evento mediante una función al contenedor padre para avisar que lo queremos cerrar-->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*Estilos modificados*/
.show {
    backdrop-filter: blur(2px) brightness(0.75);
}

.modal .modal-dialog .modal-content .modal-footer .btn {
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.9em + 0.04vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}


.modal .modal-dialog .modal-content .modal-footer {
    padding: 0 4px 2px 4px;
    margin: 0;
    justify-content: end;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-body {
    padding: 5px 7px 5px 7px;
}

.modal-body .filtros-secundarios {
    margin: 15px 0px;
}

/**rework */

.modal-body .filtros-secundarios .filtro {
    margin: 20px 5px;
}

.modal-body .filtros-secundarios>.filtro:last-child #existencia {
    margin-right: 5px;
}


label {
    font-size: calc(.9em + 0.04vw) !important;
    font-family: 'fredoka-family';
    font-weight: 500;
}
</style>

<script setup>
import selectBox from '@/components/selectBox.vue'
import { ref } from 'vue';
//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal', 'aplicarFiltros'])
const categorias = ref('')
const sucursales = ref('')

//Constantes reactivas que se utilizaran para los filtros
const available = ref('')
const categoria = ref('')
const sucursal = ref('')
const existencia = ref('')

const cerrarModal = () => {
    emisiones('ocultarModal')
}

/**
 * dev: Oned Gomez
 * Funcion que sirve para emitir el evento de aplicación de filtros a la información, adicional se guarda el valor de los filtros al localStorage para ayudar a la persistencia de esos filtros
 */
const aplicarFiltros = () => {
    emisiones('aplicarFiltros', available.value, categoria.value, sucursal.value)
    localStorage.setItem('filtro-existencia', available.value)
    localStorage.setItem('filtro-categoria', categoria.value)
    localStorage.setItem('filtro-sucursal', sucursal.value)
    emisiones('ocultarModal')
}

const modificarCodigoCategoria = (codigoC) => {
    categoria.value = codigoC
}

const modificarCodigoSucursal = (codigoC) => {
    sucursal.value = codigoC
}


/**
 * dev: Oned Gómez
 * Función para inicializar el valor de los filtros cada vez que aparezca el modal (hacer que los aplicados filtros prevalezcan entre cada aparición del modal)
 */
/**
 * dev: Oned Gómez
 * Función para inicializar el valor de los filtros cada vez que aparezca el modal (hacer que los aplicados filtros prevalezcan entre cada aparición del modal)
 */
 const iniciarlizarFiltros = () => {
    if (localStorage.getItem('filtro-existencia') !== null) {
        available.value = localStorage.getItem('filtro-existencia')
    } else {
        available.value = true
    }

    if (localStorage.getItem('filtro-categoria') !== null) {
        categoria.value = localStorage.getItem('filtro-categoria')
    } else {
        categoria.value = ''
    }

    if (localStorage.getItem('filtro-sucursal') !== null) {
        sucursal.value = localStorage.getItem('filtro-sucursal')
    } else {
        sucursal.value = ''
    }
}
iniciarlizarFiltros()
/**
 * dev: Oned Gomez
 * Función para cargar la información de las categorias y sucursales a los filtros
 */
const cargarSelect = () => {
    categorias.value = localStorage.getItem('categorias');
    categorias.value = categorias.value.replaceAll('"categorycode":', '"code":')
    categorias.value = categorias.value.replaceAll('"categoryname":', '"name":')
    categorias.value = JSON.parse(categorias.value)


    sucursales.value = localStorage.getItem('sucursales');
    sucursales.value = sucursales.value.replaceAll('"sucursalcode":', '"code":')
    sucursales.value = sucursales.value.replaceAll('"sucursalname":', '"name":')
    sucursales.value = JSON.parse(sucursales.value)
}
cargarSelect()
</script>