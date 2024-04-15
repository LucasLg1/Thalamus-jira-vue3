<template>
    <div>
        <div class="submenu-administrativo1">
            <br><br><br><br><br>

            <div style="min-width: fit-content;">
                <div style="min-width: fit-content;">
                    <div>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn class="categorias2" v-bind="props">
                                    <span style="text-decoration: none; color: black;">
                                        Adicionar <i class="bi bi-plus-circle"></i>
                                    </span>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="verPCMCriada('Programa'), this.tipo = 'Programa'">
                                    Novo Programa
                                </v-list-item>
                                <v-list-item @click="verPCMCriada('Projeto'), this.tipo = 'Projeto'">
                                    Novo Projeto
                                </v-list-item>
                                <v-list-item @click="verPCMCriada('Plano de Ação'), this.tipo = 'Plano de Ação'">
                                    Novo Plano de Ação
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <div class="categorias1" @click="verPCM">
                            <span style="text-decoration: none; color: rgb(255, 255, 255);">
                                <v-badge :content="1" floating dot color="rgb(255, 145, 0)" 
                                v-if="PCMs !== null ? PCMs.some(item => item.status === 'Aguardando Aprovação') : false"
                                >
                                    Aprovação
                                </v-badge>
                                <span v-else>Aprovação</span>
                            </span>
                        </div>
                        <hr>
                        <div class="categorias1" @click="verProgramas">
                            <span style="text-decoration: none; color: rgb(255, 255, 255);">Programas</span>
                        </div>
                        <div class="categorias1" @click="verProjetos">
                            <span style="text-decoration: none; color: rgb(255, 255, 255);">Projetos</span>
                        </div>
                        <div class="categorias1" @click="verPA">
                            <span style="text-decoration: none; color: rgb(255, 255, 255);">Planos de Ação</span>
                        </div>
                        <!-- <div class="categorias1" @click="verProtocolos">
                            <span style="text-decoration: none; color: rgb(255, 255, 255);">Protocolos</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'
import Menu from '@/models/Menu.js'
import api from '../../services/api'

export default {
    name: "TesteSideMenuView",

    data() {
        return {
            sgp: '',
            devURL: api.defaults.devURL,
            tipo: null,
            PCMs: null,

        }

    },

    methods: {
        verPCMCriada(tipo) {
            localStorage.setItem('Tipo', tipo);
            if (this.$route.path === '/PCM/Criar') {
                window.location.reload();
            } else {
                this.$router.push({ name: "CriarPCM" });
            }
        },
        verProtocolos() {
            this.$router.push({ name: "controleProtocolos" })
        },
        verProgramas() {
            this.$router.push('/Programas/controle');
        },
        verProjetos() {
            this.$router.push('/projetos');
        },
        verPA() {
            this.$router.push('/PA/Controle');
        },
        verPCM() {
            this.$router.push({ name: "ControlePCM" })
        },
        getPCMs() {
            api.get(`pcm/listar`, {})
                .then((response) => {
                    this.PCMs = response.data;                  
                })
                .catch((error) => {
                    console.error(error);
                });
        },


        getAllSidebar() {
            //axios.get(`http://192.168.0.6:8000/api/menu/estrutura/7`)
            api.get(`http://192.168.0.5:8000/api/menu/estrutura/7`)
                .then(response => {
                    this.sgp = response.data.data.map((p) => new Menu(p));
                    // console.log(this.sgp)
                    // console.log(this.devURL)
                })
        }
    },

    mounted() {
        this.getAllSidebar(),
            this.getPCMs()
    }
}
</script>

<style scoped>
.category1 {
    margin-bottom: 10px;
    cursor: pointer;
}

.submenu-administrativo1 {
    background-color: #333;
    text-align: center;
    min-width: fit-content;
    width: 15%;
    max-width: 15rem;
    height: 100vh;
    position: fixed;
    /* z-index: -1; */
    top: 0;
    left: 0px;
    overflow-y: auto;
    /* scroll */
    padding: 20px;
    color: #f0f0f0;
    z-index: 2;
}

/* @media only screen and (max-width: 768px) {
    .submenu-administrativo1 {
        width: 100%;
    }
} */

.option2 {
    padding: 5px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown {
    padding-left: 20px;
}

.dropdown .option2 {
    padding: 8px;
    background-color: #444;
    border: 1px solid #555;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown .option2:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}

.categorias1 {
    padding: 4px;
    background-color: #444;
    border: 1px solid #555;
    width: 100%;
    min-width: fit-content;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias2 {
    padding: 4px;
    background-color: #ffffff;
    border: 1px solid #000000;
    width: 100%;
    min-width: fit-content;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.categorias1:hover {
    transform: translateY(0.1px);
    box-shadow: 0 0 10px var(--second-color);
    cursor: pointer;
}
</style>