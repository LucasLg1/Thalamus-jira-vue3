<template>
    <div class="login">
        <form @submit.prevent="login" class="container reset-margin" style="padding-top: 1rem;">
    
            <div class="box-login">
                <div style="text-align: center;">
                    <img class="logo" src="../../../public/img/logo/thalamus-logo.png" style="width: 120px;"><br><br>
                </div>
    
    
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="email" placeholder="roboflex@roboflex.com.br">
                </div>
    
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                    </div>
                    <input type="password" class="form-control" v-model="password" placeholder="12345678">
                </div>
    
                <ul style="list-style: none;  margin: 0; padding: 0;">
                    <li v-for="local in localData" :key="local.local_nome">
                        <input type="radio" :value="local.id" v-model="localSelecionado" @change="salvarLocalSelecionado" style="margin-right: 5px;" />
                        <span>{{ local.local_nome }}</span>
                    </li>
                </ul>
    
                <br>
                <div class="col-sm-12 text-center">
                    <button class="button-default" value="Entrar">
                                                                  <i v-if="loading" class="fas fa-spinner fa-spin"></i> &nbsp;
                                                                  <span v-if="!loading">Entrar</span>
                                                                  <span v-if="loading">Processando...</span>
                                                                </button>
                </div>
    
                <div class="col-sm-12" style="text-align: center; font-size: 15px;">
                    <a href="/#/esqueceuSenha" style="color: rgb(0, 0, 0);">Esqueceu sua senha ?</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import api from '../../services/api';



const toaster = createToaster({
    position: "top-right",
    duration: "4000",
});

export default {
    name: 'LoginComponent',

    components: {

    },


    data() {
        return {
            local: '',
            email: '',
            password: '',
            token: '',
            id: '',
            loading: false,
            user: null,
            menuUrl: '',
            localSelecionado: null,
            localData: [],


        }
    },

    mounted() {
        this.buscaLocal();

        if (localStorage.localSelecionado) {
            this.localSelecionado = localStorage.localSelecionado
        }



    },

    watch: {
        local(newLocal) {
            localStorage.localSelecionado = newLocal;
        }
    },




    methods: {
        async login() {
            if (!this.email || !this.password) {
                toaster.show(`Preencha e-mail e senha`, { type: "error" });
                return;
            }

            try {
                // const response = await axios.post('http://192.168.0.5:8000/api/login', {
                const response = await api.post(`login`, {
                    email: this.email,
                    password: this.password,
                });

                const { user, token } = response.data;
                const userId = user.id;

                // Salvar informações no sessionStorage
                localStorage.setItem('id', userId);
                localStorage.setItem('userName', user.name);
                localStorage.setItem('token', token);
                localStorage.setItem('LoggedUser', true);

                // Atualizar permissões do usuário
                // const menuUrl = `http://192.168.0.5:8000/api/menu/usuario/${userId}`;
                const menuUrl = `menu/usuario/${userId}`;

                const menuResponse = await api.get(menuUrl);
                const userPermissions = menuResponse.data.map((item) => item.nome.toLowerCase());

                // Chamar a ação para atualizar as permissões no Vuex
                this.$store.dispatch('updateUserPermissions', userPermissions);

                this.$router.push({ name: "home" });
            } catch (error) {
                this.email = '';
                this.password = '';
                console.error(error);
                toaster.show(`E-mail e/ou senha estão incorretos!`, { type: "error" });
            }
        },


        async buscaLocal() {
            try {
                const response = await api.get('local');
            

                this.localData = response.data;
            } catch (error) {
                console.error('Erro ao buscar empresas', error);
                toaster.show(`Erro ao buscar empresa`, { type: "error" });
            }
        },


        salvarLocalSelecionado() {
            localStorage.setItem('localSelecionado', this.localSelecionado);
        },

    }
}
</script>

<style scoped>
.fa-solid {
    margin-left: 0rem !important;
}

/* .reset-margin {
  margin-left: 0px !important;
  margin-bottom: 0px;
} */

.botaoLogin {
    border: 1px solid;
    border-radius: 20px;
    width: 70%;
}

.box-login {
    max-width: 80%;
    margin: auto;
    border: 2px solid #ddd;
    margin-top: 10px;
    padding: 30px;
    border-radius: 20px;
}

@media (max-width: 1800px) {
    .box-login {
        max-width: 50%;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 10px;
        padding: 30px;
        border-radius: 20px;
        margin-left: 380px !important;
    }
    .logo {
        font-size: 18px;
    }
}

.logo {
    text-align: center;
    color: var(--first-color);
    padding: 100;
    font-size: 22px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}

@media (max-width: 768px) {
    .box-login {
        max-width: 50%;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 10px;
        padding: 30px;
        border-radius: 20px;
    }
    .logo {
        font-size: 18px;
    }
}

@media (max-width: 576px) {
    .box-login {
        max-width: 90%;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 10px;
        padding: 30px;
        border-radius: 20px;
    }
    .logo {
        font-size: 16px;
    }
}
</style>
