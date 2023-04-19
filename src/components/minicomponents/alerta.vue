<template>
    <div :class="['alert', error === 'true' ? 'alert-warning' : '']" class="d-flex">
        <span class="d-block icono-alerta"><font-awesome-icon icon="circle-info" /></span>
        <span class=" d-block mensaje-alerta"> {{ mensaje }} </span>
    </div>
</template>

<script setup>
const propsAlerta = defineProps([
    'mensaje',
    'error'
])
</script>

<style scoped>
.alert{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1056;
    padding: 15px 35px;
    margin: 5px;
    align-items: center;
    background-color: #ebf8ff;
    border: solid #ebf8ff;
    border-bottom: solid #6195baac;
    color: #3581B8;
    width: fit-content;
}

.alert-warning{
    background-color: #ffebeb!important;
    border: solid #ffebeb!important;
    border-bottom: solid #ba6161ac!important;
    color: #b83535!important;
}

.alert .icono-alerta {
    position: relative;
    min-width: 40px;
    height: auto;
    text-align: center;
    font-size: x-large;
    margin-right: 5px ;
}

.alert .mensaje-alerta{
    font-size: 'fredoka-family';
    font-weight: 600;
    font-size: calc(.9em + 0.04vw) !important;
}
</style>