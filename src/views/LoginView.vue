<!-- 
  dev: Oned Gómez       
  description: Junta la vista (pantalla) con el componente que contiene el formulario de inicio de sesión
  última modificación: 12/03/2023
-->

<template>
  <div class="logo d-flex justify-content-center">
    <img src="@/assets/logo.png" alt="Logo">
  </div>
  <div class="container-fluid">
    <div class="row">
      <div id="banner-vertical" class="col-lg-6 d-flex justify-content-center align-items-center">
        <img class="img-fluid" src="@/assets/img/prueba.jpg" alt="Banner">
      </div>
      <!--Iniciar-sesion es el nombre del evento que está emitiendo el componente-->
      <LoginSpace @iniciar-sesion="(usuario, contrasenia) => validarSesion(usuario, contrasenia)" />
    </div>
  </div>
  <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" error='true' />
</template>

<script setup>

import router from "@/router";
import { ref } from "vue";
import { generalStore } from "@/store";
import { useUsuarioStore } from "@/store/usuario";
import { sha256 } from 'js-sha256'
import { supabase } from "@/lib/supabaseClient";
import alerta from "@/components/minicomponents/alerta.vue";
// @ is an alias to /src
import LoginSpace from '@/components/LoginSpace.vue'
const mostrandoAlerta = ref(false)
const mensaje = ref('')
const store = generalStore()
const userStore = useUsuarioStore()

store.limpiarStorages()
store.limpiarFiltros()

/**
 * dev: Oned Gómez
 * Función que nos sirve para validar los datos de inicio de sesión
 * @param {*} usuario recibe el nombre de usuario o el email
 * @param {*} contrasenia contraseña establecida por el usuario para iniciar sesión
 */
const validarSesion = async (usuario, contrasenia) => {
  if (usuario != '' && contrasenia != '') {
    try {
      let { data, error } = await supabase
        .rpc('login', {
          credential: usuario,
          password: sha256(contrasenia)
        })

      if (error) {
        mensaje.value = error
        usarAlerta()
      }

      if (data != '') {
        const rol = data[0]['rol'];
        const nombreusuario = data[0]['nombreusuario'];
        const sucursalcode = data[0]['sucursalcode']
        const urlphoto = data[0]['urlphoto']
        const employeecode = data[0]['employeecode']
        const sucursalname = data[0]['sucursalname']
        const department = data[0]['department']
        const colony = data[0]['colony']

        const dataToken = [{
          employeecode,
          nombreusuario,
          rol,
          sucursalcode
        }]

        const dataAdicional = [{
          urlphoto,
          sucursalname,
          colony,
          department
        }]

        userStore.crearToken(dataToken)
        document.cookie = "nombreusuario" + "=" + store.encriptarData(nombreusuario, 'nombreusuario') + ";path=/;"
        document.cookie = "rol" + "=" + store.encriptarData(rol, 'rol') + ";path=/;"
        document.cookie = "sucursalcode" + "=" + store.encriptarData(sucursalcode, 'sucursalcode') + ";path=/;"
        document.cookie = "employeecode" + "=" + store.encriptarData(employeecode, 'employeecode') + ";path=/;"
        store.guardarLocalStorage(dataAdicional, 'usuario')
        store.cargarProveedores()
        store.cargaCategorias()
        if(rol === 'Administrador'){
          store.cargarSucursales()
        }

        router.push({ name: 'inventario', params: { rol, sucursalcode } });
      } else {
        mensaje.value = 'Usuario y/o contraseña incorrecta(o)'
        usarAlerta()
      } 
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  } else {
    mensaje.value = 'Debes proporcionar la información solicitada'
    usarAlerta()
  }
};


const usarAlerta = () => {
  mostrandoAlerta.value = !mostrandoAlerta.value
  setTimeout(() => { mostrandoAlerta.value = !mostrandoAlerta.value; }, 1900);
}
</script>

<style scoped>
.logo {
  position: absolute;
  left: 50%;
  right: 50%;
  height: calc(1.9em + 4vw);
  z-index: 3;
}

.container-fluid,
.row {
  height: 100%;
  width: 100% !important;
  margin: 0;
}

.container-fluid {
  padding: 0 !important;
}


#banner-vertical,
#banner-vertical img {
  height: 100vh;
  padding: 0;
}

#banner-vertical img {
  width: 100%;
}

@media (max-width: 991.5px) {
  #banner-vertical {
    position: absolute;
    z-index: -10;
    filter: opacity(15%) blur(40px);
    transition: all 420ms ease-in-out;
  }

  .logo {
    height: calc(1.9em + 7vw);
  }
}

@media (min-width: 991.5px) {

  #banner-vertical {
    transition: all 420ms ease-in-out, height 0ms, filter 360ms ease-in-out 200ms;
  }
}
</style>

