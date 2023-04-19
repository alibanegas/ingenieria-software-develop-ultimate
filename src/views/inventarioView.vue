<template>
  <div id="vista-inventario">
    <MenuSpace />
    <div class="cuerpo-vista">
      <div class="cabecera-filtros">
        <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
        <cabeceraComp nombreModulo="INVENTARIO" :nombreSucursal="encabezado['sucursalname']"
          :codigoSucursal="encabezado['sucursalcode']" :departamento="encabezado['department']"
          :colonia="encabezado['colony']" />

        <div class="controles-filtrado-inventario container-fluid">
          <div class="barra-filtros d-flex align-items-end">
            <barraBusqueda @busqueda="(buscar) => filtrarBusqueda(buscar)" />
            <button @click="mostrarModalFiltros" type="button" class="btn boton-filtros">
              <div class="contenido-boton d-flex">
                <span class="d-block icono-boton"><font-awesome-icon icon="arrow-down-wide-short" /></span>
                <span class=" d-block nombre-boton"> Filtros </span>
              </div>
            </button>
          </div>
          <button @click="Ordenar" id="boton-generar-orden" type="button" class="btn boton-desplegable">
            <div v-if="modoOrdenar === false" class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="file-circle-plus" /></span>
              <span class=" d-block nombre-boton"> Generar Orden </span>
            </div>
            <div v-if="modoOrdenar === true" class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="file-circle-xmark" /></span>
              <span class=" d-block nombre-boton"> Terminar orden </span>
            </div>
          </button>
          <button v-if="modoOrdenar === false && encabezado.sucursalname === 'Bodega Central'"
            @click="mostrarModalAgregarProductos" id="boton-agregar-producto" type="button" class="btn boton-desplegable">
            <div class="contenido-boton d-flex">
              <span class="d-block icono-boton"><font-awesome-icon icon="circle-plus" /></span>
              <span class=" d-block nombre-boton"> Nuevo Producto </span>
            </div>
          </button>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <tarjetaInventario v-for="producto in dataProductos" :data="producto"
            modulo="Inventario" />
        </div>
      </div>
    </div>
  </div>
  <modalFiltros v-if="mostrandoFiltros === true" @ocultar-modal="() => mostrarModalFiltros()"
    @aplicar-filtros="(availableF, categoriaF, sucursalF) => configurarFiltros(availableF, categoriaF, sucursalF)" />
  <modalCRUD v-if="mostrandoAgregar === true" modulo="Inventario" accion="Crear"
    @ocultar-modal="(alerta) => mostrarModalAgregarProductos(alerta)" />

  <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" :error="err" />
</template>
  
<script setup>
import { generalStore } from '@/store/index.js'
import { supabase } from '@/lib/supabaseClient'
import { ref, watchEffect } from 'vue'

import MenuSpace from '@/components/menu.vue'
import cabeceraComp from '@/components/cabecera.vue'
import tarjetaInventario from '@/components/tarjeta.vue'
import barraBusqueda from '@/components/barraBusqueda.vue'
import modalFiltros from '@/components/modalFiltros.vue'
import modalCRUD from '@/components/modalCRUD.vue'
import alerta from '@/components/minicomponents/alerta.vue'
import { faL } from '@fortawesome/free-solid-svg-icons'

/**
 * variable que contiene los metodos y variables de la store que retornamos (a modo de ser utilizadas como variables globales)
 */
const store = generalStore()

const mostrandoFiltros = ref(false)
const mostrandoAgregar = ref(false)
const modoOrdenar = ref(store.ordenarModo)
const mostrandoAlerta = ref(false)
const mensaje = ref('')
const err = ref(false)
const dataProductos = ref([{}])
const available = ref(true)

const cookies = document.cookie.split(';')
const sucursalcode = store.desencriptarData(cookies[2].split('=')[1], 'sucursalcode')

const dataVista = ref(JSON.parse(localStorage.getItem('usuario')))

const encabezado = ref({
  sucursalname: dataVista.value[0]['sucursalname'],
  sucursalcode: sucursalcode,
  department: dataVista.value[0]['department'],
  colony: dataVista.value[0]['colony']
})

/**
 * Función para cambiar el valor de la bool para mostrar u ocultar el modal de los filtros
 */
const mostrarModalFiltros = () => {
  mostrandoFiltros.value = !mostrandoFiltros.value
}

/**
 * La función cambia el valor de la bool para activar o desactivar el modo para Ordenar
 * El valor de la variable activará o no el botón para agregar a la orden un producto de las tarjetas
 * despues de actualizar la variable en el store, volvemos a actualizar la variable local
 */
const Ordenar = () => {
  store.setModoOrden()
  modoOrdenar.value = store.ordenarModo

  if (modoOrdenar.value === true) {
    mensaje.value = 'Orden abierta'
    err.value = false
    usarAlerta()
  } else {
    mensaje.value = 'Orden culminada'
    err.value = false
    usarAlerta()
  }
}

const usarAlerta = () => {
  mostrandoAlerta.value = !mostrandoAlerta.value
  setTimeout(() => { mostrandoAlerta.value = !mostrandoAlerta.value; }, 1900);
}

/**
 * Función que servirá para abrir el modal con el formulario para agregar los productos al inventario general
 */
const mostrarModalAgregarProductos = (alerta) => {
  mostrandoAgregar.value = !mostrandoAgregar.value
  if (mostrandoAgregar.value == false && alerta != '') {
    mensaje.value = alerta[0]['mensaje']
    err.value = alerta[0]['error']
    usarAlerta()
  }
}

const cargarProductos = async () => {
  try {
    let { data, error } = await supabase
      .rpc('mostrarproductos', {
        sucursalcode: sucursalcode
      })

    if (data != '') {
      store.dataNoFiltrada = data
      dataProductos.value = store.dataNoFiltrada.filter(producto => producto.available == available.value)
    }

  } catch (error) {
    alert(error)
  }
}
cargarProductos()


const configurarFiltros = (availableF, categoriaF, sucursalF) => {
  if (sucursalF != '') {
    //cargarProductos(sucursalF)
  }
  filtrar(availableF, categoriaF)
}

const filtrar = (disponibilidadFiltro, categoriaFiltro) => {
  if (disponibilidadFiltro === 'true') {
    disponibilidadFiltro = true
  }
  if (disponibilidadFiltro === 'false') {
    disponibilidadFiltro = false
  }

  if (categoriaFiltro != '') {
    store.filtradaCategoria = true
  } else {
    store.filtradaCategoria = false
  }

  if (disponibilidadFiltro == available.value && store.filtradaCategoria == false) {
    dataProductos.value = dataProductos.value
  } else {
    dataProductos.value = store.dataNoFiltrada.filter(producto => {
      available.value = disponibilidadFiltro
      store.filtradaDisponibildad = true
      if (store.filtradaCategoria == false) {
        return producto.available == disponibilidadFiltro
      } else {
        return producto.available == disponibilidadFiltro && producto.categorycode == categoriaFiltro
      }
    })
  }
}

const filtrarBusqueda = (buscar) => {
  if (buscar == '') {
    store.filtradaBusqueda = false
    dataProductos.value = store.dataNoFiltrada.filter(producto => producto.available == available.value)
  } else {
    store.filtradaBusqueda = true
    dataProductos.value = dataProductos.value.filter(producto => {
      return ((producto.name).toLowerCase()).match((buscar).toLowerCase())
    })
  }
}

watchEffect(() => {
  if (store.filtradaDisponibildad == false && store.filtradaCategoria == false && store.filtradaBusqueda == false) {
    available.value = true
    dataProductos.value = store.dataNoFiltrada.filter(producto => producto.available == available.value)
  }
})

</script>

<style scoped>
#vista-inventario .cuerpo-vista {
  width: 100%;
  max-width: 100%;
  height: fit-content;
  position: relative;
  margin: 5px 0px 00px 10px;
}

#vista-inventario .cuerpo-vista .cabecera-filtros {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

#vista-inventario .cuerpo-vista .cabecera-filtros .controles-filtrado-inventario .barra-filtros .boton-filtros {
  border-radius: 13px;
  border-bottom: 1.2px solid #3581B8;
  margin: 0 0 0 10px;
  color: #3581B8;
  background-color: #fff;
  transition: all 100ms ease-in-out;
  padding: 0.2rem 0.75rem !important;
}

#vista-inventario .cuerpo-vista .cabecera-filtros .controles-filtrado-inventario .barra-filtros .boton-filtros:hover {
  border: 1.2px solid #3581B8;
}

.icono-boton {
  font-size: large;
  margin: auto 8px auto 0;
}

.nombre-boton {
  font-weight: 500;
  font-size: small;
}

.contenido-boton {
  width: max-content;
  align-items: center;
}

.btn {
  font-family: 'fredoka-family';
  font-size: calc(.9em + 0.04vw);
}

.btn:hover {
  cursor: pointer;
}


#vista-inventario {
  width: 100%;
  display: inline-flex;
}

#vista-inventario .cuerpo-vista .controles-filtrado-inventario .boton-desplegable {
  color: #fff;
  background-color: #3581B8;
  width: 36px;
  overflow-x: hidden;
  padding: 3px 10px 3px 8.5px !important;
  border-radius: 20px;
  transition: all 200ms ease-out;
  margin: 3px 7px 15px 0;
}

#vista-inventario .cuerpo-vista .controles-filtrado-inventario .boton-desplegable:hover {
  width: 140px;
}

.row {
  padding-left: 25px;
  padding-right: 5px;
}

/*
* Media Query para dispositivos moviles
* Considerando que: el dispositivo mantiene las configuraciones por defecto de tamaño de texto y tamaños de visualización
 */
@media (max-width: 991.5px) {
  #vista-inventario .cuerpo-vista .controles-filtrado-inventario .boton-desplegable {
    width: 140px !important;
  }
}
</style>