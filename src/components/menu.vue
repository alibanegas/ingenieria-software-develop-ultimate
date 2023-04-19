<template>
    <div class="menu">
        <div class="navegacion">
            <div class="logo">
                <img class="img-fluid" src="../assets/logo.png" alt="Valenciana">
            </div>
            <div id="menu-opciones">
                <div v-for="opcion, index in opciones" class="opcion-menu" :key="opcion.key"
                    :class="{ active: IDitem === index }" @click="cambiarID(index, opcion.nameroute)">
                    <a class="d-flex" href="#">
                        <span class="d-block icono-opcion"><font-awesome-icon :icon="opcion.icono" /></span>
                        <span class=" d-block nombre-opcion"> {{ opcion.nombreElemento }} </span>
                    </a>
                </div>
            </div>
            <div class="pie-menu">
                <div class="foto">
                    <img class="img-fluid" v-bind:src="require('../assets/img/' + urlphoto)" alt="Foto ">
                </div>
                <div class="info">
                    <span class="nombre">{{ nombreUsuario }}</span>
                    <span class="rol">{{ rol }}</span>
                </div>
                <div @click="cerrarSesion" class="logout">
                    <span class="exit"><font-awesome-icon icon="door-open" /></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*
* Al contenedor con clase menu, le daremos una posición sticky, para mantener en la misma posición al menú
*/
#vista-inventario .menu {
    position: sticky;
    top: 0;
    height: 100vh;
    font-family: 'fredoka-family';
}

.navegacion {
    position: relative;
    width: 65px;
    box-shadow: 8px 0 0 #3581B8;
    height: 100%;
    border-left: 5px solid #fff;
    z-index: 1;
    background-color: #fff;
    overflow-x: hidden;
    text-align: center;
    transition: all 350ms ease-out;
}

.navegacion .logo {
    width: 100%;
    height: 10%;
    margin: 8px 0 0 0;
}

.navegacion:hover {
    width: 205px;
}


.navegacion #menu-opciones {
    position: relative;
    padding: 3% 0 0 3%;
    margin: 40px 0;
}

.navegacion .pie-menu {
    position: absolute;
    display: -webkit-box;
    bottom: 10px;
}

.navegacion .pie-menu .logout {
    position: relative;
}

a {
    font-weight: 600 !important;
}

.navegacion #menu-opciones .opcion-menu {
    position: relative;
    list-style: none;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
}

.navegacion #menu-opciones .opcion-menu a {
    position: relative;
    width: 100%;
    color: #2c3e50 !important;
    align-items: center;
    padding: 2px 10px;
}

.navegacion #menu-opciones .opcion-menu a .icono-opcion,
.logout {
    position: relative;
    min-width: 40px;
    height: auto;
    text-align: center;
    font-size: x-large
}

.navegacion #menu-opciones .opcion-menu a .nombre-opcion {
    position: relative;
    padding-left: 15px;
    height: auto;
    font-size: small;
}

.navegacion #menu-opciones .active {
    background-color: #3581B8;
}

.navegacion #menu-opciones .active span {
    color: #fff !important;
}

.navegacion #menu-opciones .active a::before {
    content: '';
    position: absolute;
    top: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #ffffff00;
    border-radius: 50%;
    box-shadow: 15px 15px #3581B8;
}

.navegacion #menu-opciones .active a::after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #ffffff00;
    border-radius: 50%;
    box-shadow: 15px -15px #3581B8;
}


.logout:hover {
    cursor: pointer;
    color: #3581B8
}

.pie-menu .foto {
    position: relative;
    height: 45px;
    border-radius: 50%;
    width: 45px;
    margin: 0 7px 0px 7px;
}

.pie-menu .info {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 3px;
    text-align: justify;
    justify-content: center
}

.pie-menu .info .rol {
    font-size: calc(.72em + 0.04vw) !important;
    font-weight: 100;
}

.pie-menu .logout {
    position: relative;
    margin: auto auto;
}

.pie-menu .foto .img-fluid {
    width: 100%;
    border-radius: 50%;
}


.pie-menu .info .nombre {
    font-weight: 600;
    font-size: calc(.9em + 0.04vw) !important;
    margin-right: 15px;
}
</style>

<script setup>
import { ref } from "vue";
import router from "@/router";
import { generalStore } from '@/store/index.js'

const store = generalStore();
const cookies = document.cookie.split(';')
const nombreUsuario = store.desencriptarData(cookies[0].split('=')[1], 'nombreusuario')
const rol = store.desencriptarData(cookies[1].split('=')[1], 'rol');
const sucursalcode = store.desencriptarData(cookies[2].split('=')[1], 'sucursalcode')

/**
 * Recuperamos la información del localStorage y de las cookies
 */
const dataUsuario = JSON.parse(localStorage.getItem('usuario'))
const urlphoto = ref(dataUsuario[0]['urlphoto']);

const menu = store.menu
const opciones = ref('')

const cargarMenu = () => { 
    opciones.value = menu.filter(opcion => {
        for (let i = 0; i < opcion.permitidoPara.length; i++) {
            if (opcion.permitidoPara[i] == rol){
                return true
            }
        }
    });
}
cargarMenu()

const IDitem = ref(0)

/**
 * dev: Oned Gómez
 * @param {*} ID recibe el ID de la opción a la que se le ha dado click
 * @param {*} path recibe el path de la vista referenciada por la opción del menu
 */
const cambiarID = (ID, nameroute) => {
    IDitem.value = ID
    console.log(nameroute)
    router.push({ name: nameroute, params: { rol, sucursalcode } });
}

const cerrarSesion = () => {
    router.replace('/login')
    sessionStorage.removeItem('token')
}

</script>