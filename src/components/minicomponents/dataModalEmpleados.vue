<template>
    <div class="data">
        <p class="data-text">{{ dataEmpleados['firstname' + 'paternalsurname'] }}</p>
        <div class="d-flex">
            <span class="data-modal"> Correo Electrónico: {{ dataEmpleados['email'] }}</span>
            <span class="data-modal"> Número Telefono: {{ dataEmpleados['telephonenumber'] }}</span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Fecha Contratación: {{ dataEmpleados['hiredate'] }}</span>
        </div>
        <div class="d-flex">
            <span class="data-modal"> Puesto de Trabajo: {{dataEmpleados['jobname']}} </span>
            <span class="data-modal"> Sueldo: {{ dataEmpleados['agreedsalary'] }} </span>
        </div>
    </div>
</template>


<script setup>
const propsEmpleadosModal = defineProps([
    'dataEmpleados'
])
</script>

<style scoped>
.data{
    font-size: medium;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.data .data-text{
    text-align: center;
    font-weight: 100;
}

.data div{
    justify-content: space-between;
}
</style>