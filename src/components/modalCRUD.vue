<template>
    <div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
        <div class="modal-dialog-centered modal-sm modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div v-if="modulo === 'Inventario'" class="formulario">
                        <formularioProductos ref="guardar" :data=data :accion=accion />
                    </div>
                    <div v-if="modulo === 'Empleados'" class="formulario">
                        <formularioACEmpleado ref="guardar" :data=data :accion=accion />
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" @click="confirmarAcción" class="btn btn-confirmar">Confirmar</button>
                    <button type="button" class="btn btn-cerrar" @click="cerrarModal">Cancelar</button>
                    <!--Emitimos un evento mediante una función al contenedor padre para avisar que lo queremos cerrar-->
                </div>
            </div>
        </div>
    </div>
    <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" :error='err' />
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
    font-size: calc(.75em + .2vw);
}

.modal .modal-dialog .modal-content .modal-footer .btn {
    border-top-left-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 12px;
    padding: 0 15px 0px 15px;
    font-family: 'fredoka-family';
    font-weight: 500;
    font-size: calc(.75em + .2vw);
    color: #3581B8;
    background-color: #fff;
    border: 1.6px solid #3581B8;
}


.modal .modal-dialog .modal-content .modal-footer .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

.modal .modal-dialog .modal-content .modal-footer {
    justify-content: flex-end;
    padding: 0 4px 2px 4px;
    margin: 0;
}

/*Estilos creados */

.modal .modal-dialog .modal-content .modal-body {
    padding: 5px 7px 5px 7px;
}
</style>

<script setup>
import formularioProductos from '@/components/minicomponents/formularioACProducto.vue'
import formularioACEmpleado from './minicomponents/formularioACEmpleado.vue';
import alerta from './minicomponents/alerta.vue';
import { generalStore } from '@/store';

import { ref } from 'vue';

//Definimos los emits necesarios con sus respectivas funciones
const emisiones = defineEmits(['ocultarModal'])

const store = generalStore()
const mostrandoAlerta = ref(false)
const mensaje = ref('')
const err = ref(false)
const respuesta = ref('')

const guardar = ref(null)
const employee = ref(null)

const cerrarModal = () => {
    emisiones('ocultarModal', respuesta.value)
}

const modalProps = defineProps([
    'data',
    'modulo',
    'accion'
])

const confirmarAcción = async () => {
    if (guardar.value.unitsale === true) {
        guardar.value.unitsale = '1'
    } else {
        guardar.value.unitsale = '0'
    }
    

    switch (modalProps.modulo) {
        case 'Inventario':
            if (modalProps.accion === "Crear") {
                if (guardar.value.productcode !== '' && guardar.value.name !== '' && guardar.value.lotnumber !== '' && guardar.value.productdescription !== '' && guardar.value.categoryname !== '' && guardar.value.expirationdate !== '' && guardar.value.vendorcode !== '' && guardar.value.stock !== '' && guardar.value.units !== '' && guardar.value.purchaseprice) {
                    respuesta.value = await store.agregarProducto(guardar.value)
                    cerrarModal()
                } else {
                    mensaje.value = "Debes proporcionar la información solicitada"
                    err.value = true
                    usarAlerta()
                }
            } else {
                if (modalProps.accion === "Actualizar") {
                    if (guardar.value.stock !== '') {
                        respuesta.value = await store.actualizarProducto(guardar.value)
                        cerrarModal()
                    } else {
                        mensaje.value = "Debes proporcionar la información solicitada"
                        err.value = true
                        usarAlerta()
                    }

                }
            }
            break;

        case 'Empleados':
            if (modalProps.accion === "Crear") {
                if (guardar.value.name !== '' && guardar.value.secondName !== '' && guardar.value.pLastName !== '' && guardar.value.mLastName !== '' && guardar.value.email !== '' && guardar.value.numberPhone !== '' && guardar.value.job !== '' && guardar.value.salary !== '' && guardar.value.branch) {
                    respuesta.value = await store.agregarEmpleado(guardar.value)
                    cerrarModal()
                } else {
                    mensaje.value = "Debes proporcionar la información solicitada"
                    err.value = true
                    usarAlerta()
                }
            } else {
                if (modalProps.accion === "Actualizar") {
                    if (guardar.value.stock !== '') {
                        respuesta.value = await store.actualizarProducto(guardar.value)
                        cerrarModal()
                    } else {
                        mensaje.value = "Debes proporcionar la información solicitada"
                        err.value = true
                        usarAlerta()
                    }

                }
            }

            break;
        
            case'Proveedores':

            break;
    }
}

const usarAlerta = () => {
    mostrandoAlerta.value = !mostrandoAlerta.value
    setTimeout(() => { mostrandoAlerta.value = !mostrandoAlerta.value; }, 1900);
}
</script>