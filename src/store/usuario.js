/*
    dev: Oned Gómez
    description: Store para almacenar la información relacionada al usuario al momento de iniciar sesión 
*/
import { defineStore } from 'pinia'
import { generalStore } from '.'
import { ref } from 'vue'
import { SHA256 } from 'crypto-js'

export const useUsuarioStore = defineStore("usuariosStore", () => {
    const pub = generalStore()

    /**
     * dev: Oned Gómez
     * Función que nos ayudará a crear el token de sesión para cada usuario en los inicios de sesión
     * @param {*} data recibe la información del usuario que inició sesión
     * @constant {*} header Fragmento del token (siguiendo la idea de JSON WEB TOKEN)
     * @constant {*} firma Segundo fragmento del token, básicamente representa a quien pertenece el token
     * @constant {*} token Es el token ya cifrado con la normativa de JWT
     * El token se guarda en la SessionStorage
     */ 
    const crearToken = (data) => {
        const header = {
            "alg": "HS256",
            "typ": "JWT"
        }
        const firma = 'Corporación de salud Valenciana'

        const token = SHA256(
            (header) + "." +
            (data),
            firma);

        sessionStorage.setItem('token', token)
    }



    /*
    description: Ponemos a disposición todos los elementos que deseamos que sean accedidos desde fuera.
    */
    return {
        crearToken
    }
})