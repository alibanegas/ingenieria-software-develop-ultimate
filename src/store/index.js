import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import menuOpciones from '@/jsons/elementosMenu.json'
import { useUsuarioStore } from './usuario.js'
import { supabase } from '@/lib/supabaseClient'

export const generalStore = defineStore('store', () => {
  const storeUsuario = useUsuarioStore()
  const menu = ref(menuOpciones.elementos);
  const dataNoFiltrada = ref([{}])
  const ordenarModo = ref(false)
  const respuesta = ref('')
  const filtradaDisponibildad = ref(false)
  const filtradaCategoria = ref(false)
  const filtradaBusqueda = ref(false)
  const productosOrden = ref([{}])

  const nuevoProducto = ref('')

  const date = new Date();
  const fechaActual = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');


  const limpiarStorages = () => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('productos')
    localStorage.removeItem('sucursales')
    localStorage.removeItem('categorias')
  }

  const limpiarFiltros = () => {
    localStorage.removeItem('filtro-existencia')
    localStorage.removeItem('filtro-categoria')
    localStorage.removeItem('filtro-sucursal')
  }
  limpiarFiltros()

  /**
   * dev: Oned Gómez
   * Función que nos ayudará a guardar en el LocalStorage toda la información que necesitamos que persista
   * @param {*} data Recibe la información que deseamos guardar en el localStorage
   * @param {*} key Se usa como la key de la tupla {key: value} y se usa como filtro para saber que tipo de información guardamos
   * @constant {*} usuario Almacena la información que respecta al usuario (rol, nombre, foto) para crear un JSON que utilizaremos para crear el token de sesión
   */
  const guardarLocalStorage = (data, key) => {
    if (key === 'usuario') {
      data['rol'] = encriptarData(data['rol'], 'rol')
      const usuario = ref([
        {
          rol: data['rol'],
          nombreusuario: data['nombreUsuario'],
          urlphoto: data['urlphoto']
        }
      ])
      storeUsuario.crearToken(JSON.stringify(usuario.value))
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * dev: Oned Gómez
   * Función para hacer la petición de categorias a la API de la base de datos para posteriormente almacenar la data en localStorge
   */
  const cargaCategorias = async () => {
    try {
      let { data: categories, error } = await supabase
        .from('categories')
        .select('*')

      if (error instanceof Error) {
        alert(error)
      }

      if (categories != '') {
        guardarLocalStorage(categories, 'categorias')
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
 * dev: Oned Gómez
 * Función para hacer la petición de sucursales a la API de la base de datos para posteriormente almacenar la data en localStorge
 */
  const cargarSucursales = async () => {
    try {

      let { data: sucursals, error } = await supabase
        .from('sucursals')
        .select('sucursalcode,sucursalname')


      if (error instanceof Error) {
        alert(error)
      }

      if (sucursals != '') {
        guardarLocalStorage(sucursals, 'sucursales')
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
* dev: Oned Gómez
* Función para hacer la petición de proveedores a la API de la base de datos para posteriormente almacenar la data en localStorge
*/
  const cargarProveedores = async () => {
    try {
      let { data: vendors, error } = await supabase
        .from('vendors')
        .select('vendorcode, vendorname')
        .eq('active', 'TRUE')

      if (error instanceof Error) {
        alert(error)
      }

      if (vendors != '') {
        guardarLocalStorage(vendors, 'proveedores')
      }
    } catch (error) {
      alert(error)
    }
  }


  /**
   * Función que nos ayuda a cambiar el valor del modo para ordenar productos
   */
  const setModoOrden = () => {
    ordenarModo.value = !ordenarModo.value
  }


  const actualizarProducto = async (valores) => {
    filtradaCategoria.value=false
    filtradaDisponibildad.value = false
    try {
      const { data, error } = await supabase
        .from('sucursalsinventory')
        .update({ stock: valores.stock })
        .eq('sucursalinventorycode', valores.sucursalinventorycode)

      if (error) {
        respuesta.value = [{
          'mensaje': error,
          'error': true
        }]
      } else {
        respuesta.value = [{
          'mensaje': '¡Producto actualizado exitosamente!',
          'error': false
        }]
      }
    } catch (error) {
      respuesta.value = [{
        'mensaje': error,
        'error': true
      }]
    } finally {
      return respuesta.value
    }
  }

  //ref: funcion en DB
  const agregarProducto = async (valores) => {
    filtradaCategoria.value = false
    filtradaDisponibildad.value = false
    const cookies = document.cookie.split(';')
    const sucursalcode = desencriptarData(cookies[2].split('=')[1], 'sucursalcode')
    const codigoempleado = desencriptarData(cookies[3].split('=')[1], 'employeecode')
    try {
      //Primero buscamos si existe el producto que deseamos almacenar
      let { data: products, error } = await supabase
        .from('products')
        .select("*")
        .eq('productcode', valores.productcode)
        .eq('lotnumber', valores.lotnumber)
        .eq('categorycode', valores.categorycode)
        .eq('vendorcode', valores.vendorcode)
        .eq('purchaseprice', valores.purchaseprice)

      //En caso de no existir ningun producto igual al que vamos a ingresar, se hará la inserción en la tabla productos y en el inventario
      if (products.length < 1) {
        //tabla productos
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              productcode: valores.productcode,
              productname: valores.name,
              purchaseprice: valores.purchaseprice,
              productdescription: valores.productdescription,
              lotnumber: valores.lotnumber,
              unitsale: valores.unitsale,
              units: valores.units,
              categorycode: valores.categorycode,
              vendorcode: valores.vendorcode,
              urlimage: valores.urlimage
            }
          ])

        if (error) {
          respuesta.value = [{
            'mensaje': error,
            'error': true
          }]
        } else {
          //guardar en el inventario
          const { data, error } = await supabase
            .from('sucursalsinventory')
            .insert([
              {
                stock: valores.stock,
                expirationdate: valores.expirationdate,
                lotnumber: valores.lotnumber,
                sucursalcode: sucursalcode,
                productcode: valores.productcode,
                registeredby: codigoempleado,
              }
            ])

          if (error) {
            respuesta.value = [{
              'mensaje': error,
              'error': true
            }]
          } else {
            respuesta.value = [{
              'mensaje': '¡Producto guardado exitosamente!',
              'error': false
            }]
            //Variable para capturar la información completa del producto ingresado
            const available = ref(false)
            if (valores.stock >= 1) {
              available.value = true
            }
            nuevoProducto.value = {
              'available': available.value,
              'expirationdate': valores.expirationdate,
              'lotnumber': valores.lotnumber,
              'sucursalcode': sucursalcode,
              'productcode': valores.productcode,
              'registeredby': codigoempleado,
              'stock': valores.stock,
              'name': valores.name,
              'purchaseprice': valores.purchaseprice,
              'productdescription': valores.productdescription,
              'unitsale': valores.unitsale,
              'units': valores.units,
              'categorycode': valores.categorycode,
              'categoryname': valores.categoryname,
              'vendorcode': valores.vendorcode,
              'vendorname': valores.vendorname,
              'urlimage': valores.urlimage
            }
          }
        }
      } else {
        //En caso de que si exista un producto igual al que estamos ingresando
        //Consultamos su codigo en la sucursal
        let { data: sucursalinventorycode, error } = await supabase
          .from('sucursalsinventory')
          .select("sucursalinventorycode")
          .eq('sucursalcode', sucursalcode)
          .eq('productcode', valores.productcode)
          .eq('expirationdate', valores.expirationdate)

        if (error) {
          respuesta.value = [{
            'mensaje': error,
            'error': true
          }]
        } else {
          //Actualizamos el stock con su codigo de sucursal
          const { data, error } = await supabase
            .from('sucursalsinventory')
            .update({ stock: valores.stock })
            .eq('sucursalinventorycode', sucursalinventorycode[0]['sucursalinventorycode'])

          if (error) {
            respuesta.value = [{
              'mensaje': error,
              'error': true
            }]
          } else {
            respuesta.value = [{
              'mensaje': '¡Producto actualizado exitosamente!',
              'error': false
            }]
          }
        }
      }

      if (error) {
        respuesta.value = [{
          'mensaje': error,
          'error': true
        }]
      }

    } catch (error) {
      respuesta.value = [{
        'mensaje': error,
        'error': true
      }]
    } finally {
      return respuesta.value
    }
  }

  watchEffect(() => {
    const sucursalsinventory = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sucursalsinventory' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              dataNoFiltrada.value.unshift(nuevoProducto.value)
              break;
            case 'UPDATE':
              const productoTMP = dataNoFiltrada.value.filter(producto => producto.sucursalinventorycode == payload.old['sucursalinventorycode']);
              const productoActualizao = {
                'available': payload.new['available'],
                'categorycode': productoTMP[0].categorycode,
                'categoryname': productoTMP[0].categoryname,
                'expirationdate': productoTMP[0].expirationdate,
                'lotnumber': productoTMP[0].lotnumber,
                'name': productoTMP[0].name,
                'productcode': productoTMP[0].productcode,
                'productdescription': productoTMP[0].productdescription,
                'purchaseprice': productoTMP[0].purchaseprice,
                'stock': payload.new['stock'],
                'sucursalinventorycode': productoTMP[0].sucursalinventorycode,
                'units': productoTMP[0].units,
                'unitsale': productoTMP[0].unitsale,
                'urlimage': productoTMP[0].urlimage,
                'vendorcode': productoTMP[0].vendorcode,
                'vendorname': productoTMP[0].vendorname
              }
              dataNoFiltrada.value = (JSON.parse(JSON.stringify(dataNoFiltrada.value).replaceAll(JSON.stringify(productoTMP[0]), JSON.stringify(productoActualizao))))
              break;
          }
        }
      )
      .subscribe()

    return () => supabase.removeChannel(sucursalsinventory);
  })


  /**
* Funciones de utilidad pública
*/
  const encriptarData = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  const desencriptarData = (data, key) => {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }

  return {
    menu,
    setModoOrden,
    ordenarModo,
    encriptarData,
    desencriptarData,
    guardarLocalStorage,
    cargarProveedores,
    cargarSucursales,
    cargaCategorias,
    actualizarProducto,
    dataNoFiltrada,
    agregarProducto,
    limpiarStorages,
    limpiarFiltros,
    fechaActual,
    filtradaDisponibildad,
    filtradaCategoria,
    filtradaBusqueda
  }
})