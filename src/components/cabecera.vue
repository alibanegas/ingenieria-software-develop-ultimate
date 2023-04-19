<template>
  <div class="cabecera">
    <div class="titulo">
      <span>{{ nombreModulo }}</span>
    </div>
    <div class="info-sucursal">
      <div class="sucursal">
        <span>{{ nombreSucursal }} - {{ codigoSucursal }}</span>
      </div>
      <div class="ubi-sucursal">
        <span>{{ departamento }} - {{ colonia }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cabecera {
  width: 100%;
  height: fit-content;
  display: flex;
  margin: 0px 0 5px 0px;
  text-align: center;
  font-family: 'fredoka-family';
}

.cabecera .titulo {
  margin: auto;
  font-weight: 900;
  font-size: calc(1em + 1.1vw);
  color: #3581B8;
}

.cabecera .info-sucursal .sucursal {
  font-weight: 600;
  font-size: calc(.9em + 0.04vw);
}

.cabecera .info-sucursal .ubi-sucursal {
  font-weight: 100;
  font-size: calc(.9em + 0.04vw);
}

/*
* Media Query para dispositivos moviles
*/
@media (max-width: 991.5px) {
  .cabecera .info-sucursal {
    display: none;
  }

  .cabecera .titulo {
    font-size: calc(1em + 1.7vw);
  }
}
</style>

<script setup>

/*
    *propsCabecera propiedades que se deben llenar desde la vista donde se va a llamar el componente
*/
const propsCabecera = defineProps([
  'nombreModulo',
  'nombreSucursal',
  'codigoSucursal',
  'departamento',
  'colonia'
])

</script>