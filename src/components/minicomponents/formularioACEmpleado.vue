<script setup>
import { ref, defineExpose } from 'vue';
import { generalStore } from '@/store/index.js'

const store = generalStore()
const firstname = ref('')
const secondname = ref('')
const paternalsurname = ref('')
const maternalsurname = ref('')
const telephonenumber = ref('')
const email = ref('')
const jobname = ref('')
const agreedsalary = ref('')
const urlprofilephoto = ref('')

//Props para realizar la actualizacion del formulario empleados

const propsFormularioActualizar = defineProps([
    'data',
    'accion'
])

if (propsFormularioActualizar.accion === 'Actualizar') {
    telephonenumber.value = propsFormularioActualizar.data['telephonenumber']
    email.value = propsFormularioActualizar.data['email']
    jobname.value = propsFormularioActualizar.data['jobname']
    agreedsalary.value = propsFormularioActualizar.data['agreedsalary']
}

const obtenerNombre = (event) => {
    urlprofilephoto.value = event.target.files[0].name
}


defineExpose({
    firstname,
    secondname,
    paternalsurname,
    maternalsurname,
    jobname,
    agreedsalary,
    email,
    telephonenumber,
    urlprofilephoto
})
</script>

<template>

    <div class="formularios">
        <div v-if="accion === 'Actualizar'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Primer Nombre:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" disabled :value=data.firstname class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="snombre-input">Segundo Nombre:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="snombre-input" type="text" disabled :value=data.secondname class="form-control" aria-label="secondName"
                        aria-describedby="snombre-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="apellidoPaterno-input">Apellido Paterno:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="apellidoPaterno-input" type="text" disabled :value=data.paternalsurname class="form-control" aria-label="apellidoPaterno"
                        aria-describedby="apellidoPaterno-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="apellidoMaterno-input">Apellido Materno:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="apellidoMaterno-input" type="text" disabled :value=data.maternalsurname class="form-control" aria-label="apellidoPaterno"
                        aria-describedby="apellidoMaterno-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="numero-input">Número De Teléfono:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="numero-input" type="text" disabled :value=data.telephonenumber class="form-control" aria-label="numero"
                        aria-describedby="numero-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="email-input">Correo Electrónico:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="email-input" type="text" disabled :value=data.email class="form-control"
                        aria-label="email" aria-describedby="email-input">
                </div>
            </div>
            
            
            <div class="textbox">
                <label class="etiqueta" for="ptrabajo-input">Puesto De Trabajo:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="ptrabajo-input" type="text" disabled :value=data.jobname class="form-control"
                        aria-label="ptrabajo" aria-describedby="ptrabajo-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="sueldo-input">Sueldo Acordado:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="sueldo-input" type="text" disabled :value=data.agreedsalary class="form-control"
                        aria-label="Sueldo" aria-describedby="Sueldo-input">
                </div>
            </div>
            
            
        </div>

        <div v-if="accion === 'Crear'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="codigo-input">Primer Nombre:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" maxlength="14" type="text" v-model="firstname" class="form-control" aria-label="Nombre"
                        aria-describedby="Nombre-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="snombre-input">Segundo Nombre:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="snombre-input" type="text" maxlength="50" v-model="secondname" class="form-control" aria-label="snombre"
                        aria-describedby="snombre-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="apellidoPaterno-input">Apellido Paterno:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="apellidoPaterno-input" type="text" maxlength="50" v-model="paternalsurname" class="form-control" aria-label="apellidoPaterno"
                        aria-describedby="apellidoPaterno-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="apellidoMaterno-input">Apellido Materno:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="apellidoMaterno-input" type="text" maxlength="50" v-model="maternalsurname" class="form-control" aria-label="apellidoMaterno"
                        aria-describedby="apellidoMaterno-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="numero-input">Número De Teléfono:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="numero-input" type="text" maxlength="20" v-model="telephonenumber" class="form-control" aria-label="numero"
                        aria-describedby="numero-input">
                </div>
            </div>
            
            <div class="textbox">
                <label class="etiqueta" for="email-input">Correo Electrónico:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="email-input" type="text" maxlength="20" v-model="email" class="form-control" aria-label="email"
                        aria-describedby="email-input">
                </div>

            </div>

            <div class="textbox">
                <label class="etiqueta" for="ptrabajo-input">Puesto De Trabajo:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="ptrabajo-input" type="text" maxlength="20" v-model="jobname" class="form-control" aria-label="ptrabajo"
                        aria-describedby="ptrabajo-input">
                </div>
            </div>

            <div class="col-6 textbox">
                <label class="etiqueta" for="sueldo-input">Sueldo Acordado:</label>
                <div class="input-group">
                     <span class="input-group-text"></span>
                     <input id="sueldo-input" type="number" min="0" v-model="agreedsalary" class="form-control" aria-label="sueldo"
                                aria-describedby="sueldo-input">
                </div>
            </div>
                
            <div class="textbox">
                <label class="etiqueta" for="fotografia-input">Fotografia: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".pdf,.jpg,.png" />
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="contrato-input">Contrato: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".pdf,.jpg,.png" />
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="cv-input">Curriculum Vitae: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".pdf,.jpg,.png" />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.formularios .formulario .input-group .input-group-text {
    background-color: #3581B8;
    padding: 0.375rem 0.95rem;
    border: none;
    border-radius: 0;
}

.formularios .formulario .textbox .input-group {
    width: 230px;
}

.formularios .formulario {
    margin-top: 15px;
}

.formularios .formulario {
    padding: 0;
}

.formularios .formulario {
    padding: 0;
    justify-content: space-around;
}

.etiqueta {
    font-weight: 400;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.09vw) !important;
}

.form-control {
    border-radius: 0 25px 24px 0;
    border: none;
    border-bottom: #3581B8 solid 2px;
    filter: none;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.form-control:focus {
    box-shadow: none;
    border-bottom: #3581B8 solid 2px;
}

.input-group {
    margin: 0 0 20px 0;
}

</style>