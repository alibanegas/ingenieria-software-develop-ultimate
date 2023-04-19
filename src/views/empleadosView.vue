<template>
    <div id="vista-inventario">
      <MenuSpace />
      <div class="cuerpo-vista">
        <div class="cabecera-filtros">
          <!--Llamamos el componente de la cabecera y llenamos sus propiedades-->
          <cabeceraComp nombreModulo="EMPLEADOS" :nombreSucursal="encabezado['sucursalname']"
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
            
            <button @click="mostrarModalAgregarEmpleado" id="boton-agregar-empleado" type="button" class="btn boton-desplegable">
              <div class="contenido-boton d-flex">
                <span class="d-block icono-boton"><font-awesome-icon icon="circle-plus" /></span>
                <span class=" d-block nombre-boton"> Nuevo Empleado </span>
              </div>
            </button>
          </div>
        </div>
  
        <div class="container-fluid">
          <div class="row">
            <tarjetaInventario v-for="producto in dataProductos" :data="producto" modulo="Empleados" />
          </div>
        </div>
      </div>
    </div>
    <modalFiltros v-if="mostrandoFiltros === true" @ocultar-modal="() => mostrarModalFiltros()"
      @aplicar-filtros="(availableF, categoriaF, sucursalF) => configurarFiltros(availableF, categoriaF, sucursalF)" />
    <modalCRUD v-if="mostrandoAgregar === true" modulo="Empleados" accion="Crear"
      @ocultar-modal="() => mostrarModalAgregarEmpleado()" />
  
    <alerta v-if="mostrandoAlerta === true" :mensaje="mensaje" error='false' />
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
  
  /**
   * variable que contiene los metodos y variables de la store que retornamos (a modo de ser utilizadas como variables globales)
   */
  const store = generalStore()
  
  const mostrandoFiltros = ref(false)
  const mostrandoAgregar = ref(false)
  const mostrandoAlerta = ref(false)
  const mensaje = ref('')
  const dataProductos = ref([{}])
  const available = ref(true)
  const filtradaDisponibildad = ref(false)
  const filtradaCategoria = ref(false)
  const dataDisponibilidad = ref([{}])
  const dataCategoria = ref([{}])
  const dataFiltrada = ref([{}])
  
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
   * Función que servirá para abrir el modal con el formulario para agregar a nuevos empleados que no se encuentren registrados
   */
  const mostrarModalAgregarEmpleado = () => {
    mostrandoAgregar.value = !mostrandoAgregar.value
  }
  
  const cargarProductos = async () => {
    try {
      let { data, error } = await supabase
        .rpc('mostrarproductos', {
          sucursalcode: sucursalcode
        })
  
      if (error) console.error(error)
  
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
    filtrarDisponibilidad(availableF, categoriaF)
    //filtrarCategoria(categoriaF)
  }
  
  const filtrarDisponibilidad = (disponibilidadFiltro, categoriaFiltro) => {
    if(disponibilidadFiltro === 'true'){
      disponibilidadFiltro = true
    }
    if(disponibilidadFiltro === 'false'){
      disponibilidadFiltro = false
    }
  
    if(categoriaFiltro != ''){
      filtradaCategoria.value = true
    }else{
      filtradaCategoria.value = false
    }
    console.log(categoriaFiltro)
  
    if (disponibilidadFiltro == available.value && filtradaCategoria.value == false) {
      dataProductos.value = dataProductos.value
    } else {
      dataProductos.value = store.dataNoFiltrada.filter(producto => {
        available.value = !available.value
        filtradaDisponibildad.value = true
        if(filtradaCategoria.value == false){
          return producto.available == disponibilidadFiltro
        }else{
          return producto.available == disponibilidadFiltro && producto.categorycode == categoriaFiltro
        }
      })
    }
  }
  
  //store.dataNoFiltrada = data sin filtros (productos disponibles y no disponibles) por sucursal
  //dataDisponibilidad = data con filtro de disponibilidad
  //dataCategoria = data con filtro de categoria
  //datafiltrada = data con filtro de categoria y disponibilidad (para la barra de búsqueda)
  
  
  
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