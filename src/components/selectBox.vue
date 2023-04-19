<template>
    <div class="select-group d-flex">
        <label for="disabledSelect"> {{ label }}</label>
        <select v-model="valor" @change="emitirCode" id="disabledSelect" class="form-select">
            <option v-for="elemento in data" :value="elemento['code']"> {{ elemento['name'] }} </option>
        </select>
    </div>
</template>

<style scoped>
.select-group {
    flex-direction: column;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.select-group .form-select {
    border-radius: 25px 25px 25px 25px;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-size: calc(.9em + 0.04vw) !important;
}


.select-group .form-select:focus {
    box-shadow: none;
}

label {
    font-weight: 500;
}
</style>

<script setup>
import { ref, defineEmits } from "vue";
const valor = ref('')
const emisiones = defineEmits(['codigo'])

const propsSelectBox = defineProps([
    'data',
    'label',
    'seleccionado'
])

const emitirCode = () => {
    emisiones('codigo', valor.value)
}

</script>