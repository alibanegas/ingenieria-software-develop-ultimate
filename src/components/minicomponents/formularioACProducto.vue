<template>
    <div class="formularios">
        <div v-if="accion === 'Actualizar'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del producto:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" disabled :value=data.name class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="lote-input">Número de lote:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="lote-input" type="text" disabled :value=data.lotnumber class="form-control" aria-label="Lote"
                        aria-describedby="Lote-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="descripcion-input">Descripción:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <textarea class="form-control" maxlength="100" name="descripcion-input" disabled :value=data.productdescription cols="1"
                        rows="1"></textarea>
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="fecha-input">Fecha de vencimiento:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="fecha-input" type="text" disabled :value=data.expirationdate class="form-control"
                        aria-label="Fecha" aria-describedby="Fecha-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Nombre de proveedor:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="proveedor-input" type="text" disabled :value=data.vendorname class="form-control"
                        aria-label="Proveedor" aria-describedby="Proveedor-input">
                </div>
            </div>

            <div class="textbox">
                <label class="etiqueta" for="category-input">Categoria:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="category-input" type="text" disabled :value=data.categoryname class="form-control"
                        aria-label="Category" aria-describedby="Category-input">
                </div>
            </div>
            
            <div class="container zona-numerica d-flex">
                <div class="row">
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="cantidad-input">Cantidad Recibida:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="cantidad-input" type="number" v-model="stock" class="form-control"
                                aria-label="Cantidad" min="0" aria-describedby="Cantidad-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="unidades-input">Unidades en caja:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="unidades-input" type="number" disabled :value=data.units class="form-control"
                                aria-label="Unidades" aria-describedby="Unidades-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="precio-input">Precio de compra:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="precio-input" type="money" disabled :value=data.purchaseprice class="form-control"
                                aria-label="Precio" aria-describedby="Precio-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="accion === 'Crear'" class="formulario">
            <div class="textbox">
                <label class="etiqueta" for="codigo-input">Código del producto:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="codigo-input" maxlength="14" type="text" v-model="productcode" class="form-control" aria-label="Nombre"
                        aria-describedby="Nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="nombre-input">Nombre del producto:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="nombre-input" type="text" maxlength="50" v-model="name" class="form-control" aria-label="Nombre"
                        aria-describedby="nombre-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="lote-input">Número de lote:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="lote-input" type="text" maxlength="20" v-model="lotnumber" class="form-control" aria-label="Lote"
                        aria-describedby="Lote-input">
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="descripcion-input">Descripción:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <textarea class="form-control" minlength="35" maxlength="250" v-model="productdescription" name="descripcion-input" cols="1"
                        rows="1"></textarea>
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="fecha-input">Fecha de vencimiento:</label>
                <div class="input-group">
                    <span class="input-group-text"></span>
                    <input id="fecha-input" type="date" :min="fecha" max="2025-01-01" v-model="expirationdate" class="form-control" aria-label="Fecha"
                        aria-describedby="Fecha-input">
                </div>
            </div>
            <selectBox @codigo="(codigo) => asignarProveedor(codigo)" :data="proveedores"
                label="Nombre/Número de proveedor:" />
            <selectBox @codigo="(codigo) => asignarCategoria(codigo)" :data="categorias" label="Categoria:" />
            <div class="mb-3 form-check">
                <input v-model="unitsale" type="checkbox" class="form-check-input" id="ventaUnit">
                <label class="form-check-label" for="exampleCheck1">Venta Unitaria</label>
            </div>
            <div class="container zona-numerica d-flex">
                <div class="row">
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="cantidad-input">Cantidad Recibida:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="cantidad-input" type="number" v-model="stock" class="form-control"
                                aria-label="Cantidad" min="0" aria-describedby="Cantidad-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="unidades-input">Unidades en caja:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="unidades-input" :disabled="unitsale === false" type="number" v-model="units"
                                class="form-control" min="0" aria-label="Unidades" aria-describedby="Unidades-input">
                        </div>
                    </div>
                    <div class="col-6 textbox">
                        <label class="etiqueta" for="precio-input">Precio de compra:</label>
                        <div class="input-group">
                            <span class="input-group-text"></span>
                            <input id="precio-input" type="number" min="0" v-model="purchaseprice" class="form-control" aria-label="Precio"
                                aria-describedby="Precio-input">
                        </div>
                    </div>
                </div>
            </div>
            <div class="textbox">
                <label class="etiqueta" for="proveedor-input">Imagen del producto: </label>
                <div class="input-group">
                    <input @change="obtenerNombre" type="file" name="adjunto" accept=".pdf,.jpg,.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.etiqueta {
    font-weight: 500;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw) !important;
}

.formularios .formulario .input-group .input-group-text {
    background-color: #3581B8;
    padding: 0.375rem 0.95rem;
    border: none;
    border-radius: 0;
}

.formularios .formulario .zona-numerica .textbox .input-group {
    width: 120px;
}

.formularios .formulario .zona-numerica {
    margin-top: 10px;
}

.formularios .formulario .zona-numerica .row>* {
    padding: 0;
}

.formularios .formulario .zona-numerica .row {
    padding: 0;
    justify-content: space-around;
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

.form-check {
    margin: 20px 0 20px 0;
}

.select-group {
    margin-bottom: 20px;
}
</style>

<script setup>
import { ref, defineExpose } from 'vue';
import selectBox from '@/components/selectBox.vue';
import { generalStore } from '@/store/index.js'

const store = generalStore()
const categorias = ref('')
const proveedores = ref('')
const productcode = ref('')
const sucursalinventorycode = ref('')
const name = ref('')
const lotnumber = ref('')
const productdescription = ref('')
const expirationdate = ref('')
const vendorcode = ref('')
const categorycode = ref('')
const stock = ref('')
const units = ref('')
const purchaseprice = ref('')
const urlimage = ref('')
const unitsale = ref(false)
const categoryname = ref('')
const vendorname = ref('')
const fecha = store.fechaActual


const propsFormularioActualizar = defineProps([
    'data',
    'accion'
])

if (propsFormularioActualizar.accion === 'Actualizar') {
    productcode.value = propsFormularioActualizar.data['productcode']
    sucursalinventorycode.value = propsFormularioActualizar.data['sucursalinventorycode']
    lotnumber.value = propsFormularioActualizar.data['lotnumber']
    expirationdate.value = propsFormularioActualizar.data['expirationdate']
}

const obtenerNombre = (event) => {
    urlimage.value = event.target.files[0].name
}

const asignarCategoria = (codigo) => {
    categorycode.value = codigo
    categoryname.value = categorias.value.filter(categoria => categoria.code === codigo)[0]['name']
}

const asignarProveedor = (codigo) => {
    vendorcode.value = codigo
    vendorname.value = proveedores.value.filter(proveedor => proveedor.code === codigo)[0]['name']
}


const cargarSelect = () => {
    categorias.value = localStorage.getItem('categorias');
    categorias.value = categorias.value.replaceAll('"categorycode":', '"code":')
    categorias.value = categorias.value.replaceAll('"categoryname":', '"name":')
    categorias.value = JSON.parse(categorias.value)

    proveedores.value = localStorage.getItem('proveedores');
    proveedores.value = proveedores.value.replaceAll('"vendorcode":', '"code":')
    proveedores.value = proveedores.value.replaceAll('"vendorname":', '"name":')
    proveedores.value = JSON.parse(proveedores.value)
}
cargarSelect()

defineExpose({
    productcode,
    sucursalinventorycode,
    name,
    lotnumber,
    productdescription,
    expirationdate,
    vendorcode,
    categorycode,
    stock,
    units,
    purchaseprice,
    urlimage,
    unitsale,
    categoryname,
    vendorname
})
</script>