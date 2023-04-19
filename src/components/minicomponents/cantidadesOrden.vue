<template>
    <div class="modal-cantidad">
        <div class="textbox d-flex align-items-center">
            <label class="etiqueta" for="cantidad-input">Ingresa la cantidad que deseas agregar a la orden:</label>
            <div class="input-group">
                <span class="input-group-text"></span>
                <input id="cantidad-input" type="number" v-model="cantidad" class="form-control" aria-label="Cantidad"
                    min="1" :max="stock" aria-describedby="Cantidad-input">
            </div>
        </div>
        <div class="botones d-flex justify-content-end">
            <button type="button" class="btn" @click="confirmar">Confirmar</button>
            <button type="button" class="btn" @click="cerrar">Cancelar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const cantidad = ref('')

const emisiones = defineEmits([
    'confirmar',
    'cerrar'
])

const propsCantidades = defineProps([
    'stock'
])

const confirmar = () =>{
    emisiones('confirmar', cantidad.value)
    cerrar()
}

const cerrar = () =>{
    emisiones('cerrar')
}


</script>

<style scoped>
.botones {
    margin-top: 15px;
}

.botones .btn {
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
    margin-left: 10px;
}

.botones .btn:hover {
    color: #fff;
    background-color: #3581B8;
    border: 1.6px solid #3581B8;
}

.etiqueta {
    font-weight: 500;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.input-group .input-group-text {
    background-color: #3581B8;
    padding: 0.375rem 0.95rem;
    border: none;
    border-radius: 0;
}

.input-group {
    width: 100px;
}

.form-control {
    border-radius: 0 25px 24px 0;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.form-control:focus {
    box-shadow: none;
    border-bottom: #3581B8 solid 2px;
}

.input-group {
    margin: 0 0 0px 20px;
}

.modal-cantidad {
    position: absolute;
    top: 115%;
    right: 25%;
    z-index: 1056;
    padding: 15px 35px;
    margin: 5px;
    align-items: center;
    background-color: #FFF;
    border-bottom: solid #6195baac;
    color: #000000;
    width: fit-content;
}

.alert span {
    font-size: 'fredoka-family';
    font-weight: 600;
    font-size: calc(.9em + 0.04vw) !important;
}
</style>