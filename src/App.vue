<template>
  <router-view/>
</template>

<style>

/*
  Fuente a utilizar con sus respectivas variaciones de weight
*/
@font-face {
  font-family: "fredoka-family";
  src: url("assets/fonts/Fredoka-VariableFont_wdth\,wght.ttf");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a{
  color: #848484!important;
  text-decoration: none!important;
  text-align: start;
  width: fit-content;
  font-size: calc(.9em + 0.01vw);
  font-weight: 400;
}

/**Estilos custom a css de bootstrap */
.row{
  padding: inherit;
}

.img-fluid {
    height: 100%!important;
}

.modal-content{
  border: .2px solid #3581B8!important;
}
</style>
