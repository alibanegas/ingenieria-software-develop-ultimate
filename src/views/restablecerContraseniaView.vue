<script>
// @ is an alias to /src
import restablecerContrasenia from '@/components/restablecerContrasenia.vue'
import { supabase } from "@/lib/supabaseClient";

export default {
  name: 'restablecerContraseniaView',
  components: {
    restablecerContrasenia
  }
}
</script>

<template>
    <div class="logo d-flex justify-content-center">
      <img src="@/assets/logo.png" alt="Logo">
    </div>
    <div class="container-fluid">
      <div class="row">
        <div id="banner-vertical" class="col-lg-6 d-flex justify-content-center align-items-center">
          <img class="img-fluid" src="@/assets/img/prueba.jpg" alt="Banner">
        </div>
        <restablecerContrasenia/>
      </div>
    </div>
  </template>

<style scoped>
.logo {
  position: absolute;
  left: 50%;
  right: 50%;
  height: calc(1.9em + 4vw);
  z-index: 100;
}

.container-fluid,
.row {
  height: 100%;
}

#banner-vertical,
#banner-vertical img {
  height: 100vh;
  padding: 0;
}

#banner-vertical img {
  width: 100%;
}

@media (max-width: 991.5px) {
  #banner-vertical {
    position: absolute;
    z-index: -10;
    filter: opacity(15%) blur(40px);
  }

  #banner-vertical {
    transition: all 420ms ease-in-out;
  }
}

@media (min-width: 991.5px) {

  #banner-vertical {
    transition: all 420ms ease-in-out, height 0ms, filter 360ms ease-in-out 200ms;
  }
}
</style>
