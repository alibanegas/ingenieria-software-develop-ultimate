import { generalStore } from '.'
import { SHA256 } from 'crypto-js'
import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import CryptoJS from 'crypto-js'
import { supabase } from '@/lib/supabaseClient'




export const useEmpleadosStore = defineStore("empleadosStore", () => {

    const dataNoFiltradaEmpleados = ref([{}])
    const store = generalStore()
    const respuesta = ref('')

    const nuevoEmpleado = ref('')

    /**
 * Función que nos facilitará la actualización del proveedor 
 * @param {*} valores: Contiene la información necesaria para efectuar correctamente la actualización
 * @returns: Devuelve un mensaje de éxito o fracaso al realizar la actualización
 */
    const actualizarEmpleado = async (valores) => {
        store.filtradaDisponibildad = false
        try {

            const { data, error } = await supabase
                .from('contactinformation')
                .update({
                    telephonenumber: valores.telephonenumber,
                    email: valores.email,
                    urlimage: valores.urlimage
                })
                .eq('dniperson', valores.dniperson)

            if (error) {
                respuesta.value = [{
                    'mensaje': error,
                    'error': true
                }]
            } else {
                respuesta.value = [{
                    'mensaje': '¡Empleado actualizado exitosamente!',
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


    const agregarEmpleado = async (valores) => {
        try {

            const { data, error } = await supabase
                .from('persons')
                .insert([
                    {
                        firstname: valores.firstname,
                        secondname: valores.secondname,
                        urlprofilephoto: valores.urlprofilephoto
                    },
                ])
            const dni = CryptoJS.MD5('MK-2023-04-18-Estados Unidos').toString()
            nuevoEmpleado.value = {
                'available': false,
                'firstname': valores.firstname,
                'secondname': valores.secondname,
                'paternalsurname': valores.paternalsurname,
                'maternalsurname': valores.maternalsurname,
                'urlprofilephoto': valores.urlprofilephoto,
                'dni': dni.substring(0, 11)
            }

            if (!error) {
                respuesta.value = [{
                    'mensaje': 'Empleado agregado éxitosamente',
                    'error': false
                }]
            }else{
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
        const persons = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'persons' },
                (payload) => {
                    switch (payload.eventType) {
                        case 'INSERT':
                            dataNoFiltradaEmpleados.value.push(nuevoEmpleado.value)
                            break;
                        case 'UPDATE':
                            const empleadoTMP = dataNoFiltradaEmpleados.value.filter(empleados => empleados.dni == payload.old['dni']);
                            const empleadoActualizado = {
                                'available': proveedorTMP[0].available,
                                'country': payload.new['country'],
                                'name': proveedorTMP[0].name,
                                'relationshipinitiation': proveedorTMP[0].relationshipinitiation,
                                'representativename': proveedorTMP[0].representativename,
                                'urlimage': proveedorTMP[0].urlimage,
                                'vendorcode': proveedorTMP[0].vendorcode
                            }
                            dataNoFiltradaEmpleados.value = (JSON.parse(JSON.stringify(dataNoFiltradaEmpleados.value).replaceAll(JSON.stringify(empleadoTMP[0]), JSON.stringify(empleadoActualizado))))
                            break;
                    }
                }
            )
            .subscribe()

        return () => supabase.removeChannel(persons);
    })

    return {
        actualizarEmpleado,
        agregarEmpleado,
        dataNoFiltradaEmpleados
    }
})