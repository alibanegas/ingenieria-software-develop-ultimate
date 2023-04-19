<script setup>

import { ref, reactive, defineEmits } from "vue";
/*Importamos desde router para poder navegar entre las rutas*/
import router from "@/router";

const handleRestablecer = async () => {
    
}

</script>

<template>

<div id="space-form" class="d-flex justify-content-center align-content-center flex-wrap col-lg-6">
    
    <h2>Cambio De Contraseña</h2><br>
    <div class="form d-flex">
        <div class="input-group">
          <span class="input-group-text" id="contra-input"></span>
          <p>Ingrese su nueva contraseña</p>
          <input type="password" class="form-control" required placeholder="Nueva Contraseña" v-model="password" aria-label="Contrasenia"
            aria-describedby="contra-input">
      </div>
      <div class="input-group">
          <span class="input-group-text" id="contra-input"></span>
          <p>Confirme su nueva contraseña</p>
          <input type="password" class="form-control" required placeholder="Confirmar Nueva Contraseña" v-model="password" aria-label="Contrasenia"
            aria-describedby="contra-input">
      </div>
    </div>
    <div @click="handleRestablecer" class="button">
      Confirmar
    </div>
  </div>
     
</template>

<style scoped>
.input-group-text {
  background-color: #3581B8;
  padding: 0.375rem 0.18rem;
  border: none;
  border-radius: 0;
}

.form-control {
  border-radius: 0 25px 25px 0;
  border: none;
  border-bottom: #056ab3 solid 3px;
  filter: none;
  font-size: calc(.8em + 0.3vw) !important
}

.form-control:focus {
  box-shadow: none;
  border-bottom: #3581B8 solid 1px;
}

.input-group {
  margin: -20px 0 40px 0;
}


.form {
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0 25px;
  background-color: #3581b812;
  padding: calc(1em + 3.7vw) 20px 10px 20px;
  border-radius: 35px 0px 35px 0;
}

.button {
  background-color: #3581b8;
  width: 60%;
  border-radius: 0 0 calc(1em + 0.1vw) calc(1em + 0.1vw);
  color: #fff;
  font-weight: 700;
  font-size: calc(1em + 0.18vw);
  text-align: center;
}

.button:hover {
  cursor: pointer;
  background-color: #3f596b;
}

/*Media Querys Para Sitios Responsive*/ 
@media (max-width: 991.5px) {
  #space-form {
    transition: all 420ms ease-in-out;
  }
}

@media (min-width: 991.5px) {
  #space-form {
    transition: all 420ms ease-in-out, height 0ms, filter 360ms ease-in-out 200ms;
  }
}
</style>