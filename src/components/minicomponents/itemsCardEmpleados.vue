<template>
    <div class="items-card">
        <div class="d-flex">
            <span class="item-card"> {{ dataProducto['categoryname'] }} </span>
        </div>
        <p class="card-text"> {{ dataProducto['productdescription'] }} </p>
    </div>
</template>

<script setup>
const propsProducto = defineProps([
    'dataProducto'
])
</script>

<style scoped>
.items-card div {
    justify-content: center;
}

.items-card {
    font-weight: 600;
    flex-direction: column;
    text-align: center;
    font-family: 'fredoka-family';
    font-size: calc(.9em + 0.04vw);
    overflow: hidden;
}

.card-text {
    font-size: calc(.9em + 0.04vw) !important;
    font-weight: 100!important;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
}

/*
* Media Query para tablet
*/
@media (max-width: 991.5px) {

    .items-card {
        font-size: calc(.5em + .7vw);
    }

    .card-text {
        font-size: calc(.5em + .6vw) !important;
    }

}


/*
* Media Query para celular
*/
@media (max-width: 678px) {

.items-card {
    font-size: calc(.5em + 1.2vw);
}

.card-text {
    font-size: calc(.5em + 1vw) !important;
}

}
</style>