<template>

    <body style="background-color: #FAF9F6; min-height: 100vh">
        <div class="estilos">
            <div class="menu">
                <MenuComponent v-if="!$route.meta.hideMenu"></MenuComponent>
            </div>
            <menuLateral v-if="!$route.meta.hideMenu" :style="{'display': (!$route.meta.hideMenu) ? '' : 'none'}"></menuLateral>
            <div class="router">
                <router-view />
                <br><br>
            </div>
            <FooterComponent></FooterComponent>
        </div>
    </body>
</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"
import MenuComponent from "./components/menu/MenuComponent.vue";
import menuLateral from './components/menuLateral/MenuLateral'

export default {
    data() {
        return {

        }

    },

    components: {
        FooterComponent: FooterComponent,
        MenuComponent: MenuComponent,
        menuLateral: menuLateral
    }
}
</script>


<style>
.menu {
    z-index: 3;
    position: absolute;
    width: 100%;
    margin-top: 0;
}


:root {
    --cor-primaria: #343537;
    --cor-secundaria: #F89E31;
    --dark-color: #292A2A;
    --botao: #F89E31;
    --botao-hover: #FBBF77;
    --botao-secondary: #AAAAAA;
    --botao-secondary-hover: #C2BFBF;
    --menu-lateral-background: #333;
    --menu-lateral-botao: #444;
    --menu-lateral-borda: #555;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: var(--cor-secundaria);
}

/* button {
    width: 100%;
    background-color: var(--cor-primaria) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
} */

/* button:hover {
    background-color: #FBBF77 !important;
} */

.estilos {
    font-family: 'montserrat', sans-serif;
}

/* .titulo {
    font-size: 15px;
    font-weight: 100;
    margin-top: 10px
} */



.router {
    margin-left: 30px;
    margin-top: 0px;
}

.footer {
    position: absolute;
    z-index: 3;
}

.button-default {
    width: 100%;
    background-color: var(--botao) !important;
    color: rgb(255, 255, 255) !important;
    padding: 10px !important;
    margin: 6px 0 !important;
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

/* .button-default:hover {
    background-color: var(--botao-hover) !important;
} */

/* .btn-primary {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
} */

/* .btn-primary:hover {
    background-color: var(--botao-hover) !important;
} */

.button-cadastrar {
    background-color: var(--botao) !important;
    margin: 6px 0 !important;
    border: none !important;
    width: 150px;
    height: 40px;
    border: none !important;
    border-radius: 6px !important;
    color: white;
}

.button-cadastrar:hover {
    background-color: var(--botao-hover) !important;
}

.button-cancelar {
    color: white !important;
    background-color: var(--botao-secondary) !important;
}

.button-cancelar:hover {
    background-color: var(--botao-secondary-hover) !important;
}

.button-visita {
    background-color: var(--botao);
    color: white;
    border: none;
    border-radius: 2px !important;
}

.button-visita:hover {
    background-color: var(--botao-hover) !important;
}

header {
    width: 100vw;
    margin-top: 0;
    background-color: var(--dark-color);
    padding: 0px;
}

thead {
    text-align: center;
}

::-webkit-scrollbar {
    width: 0px;
}

</style>
