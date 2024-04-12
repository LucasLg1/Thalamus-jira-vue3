<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container"
        v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario) : false"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div class="input-group mb-3" style="width: 16rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar PCM" aria-label="Username"
                            aria-describedby="basic-addon1" v-model="PCMSelecionado" @input="filtrarPCMs()">
                    </div>

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Propostas de Criação ou Mudança</h3>
                    </div>

                    <v-menu
                    v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel !== 1 : false"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                style="width: max-content; font-size: 20px; height: fit-content ;background-color: transparent; box-shadow: none"
                                class="botaoAdicionarSprint" icon="bi bi-plus-circle" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="novoPCM">
                                Novo documento
                            </v-list-item>
                            <v-list-item @click="''">
                                Cancelar
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>

            <br>
            <div>
                <div class="table responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Código </th>
                                <th scope="col">Nome </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de abertura</th>
                                <th scope="col">Aprovador</th>
                                <th scope="col" style="width: 15rem;"
                                v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 3 : false"
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="verPCM(item.id)" style="vertical-align: middle;"
                                v-for="item in listaPCMsFiltrada" :key="item.id">
                                <td style="text-align: center; vertical-align: middle;">
                                    {{ item.codigo }}
                                </td>

                                <td style="text-align: center; vertical-align: middle; width: 10rem ;">
                                    {{ item.nome }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;"
                                    :style="{ 'color': (item.status == 'Aguardando Aprovação') ? 'rgb(255, 145, 0)' : (item.status == 'Reprovado') ? '#e02130' : (item.status == 'Aprovado') ? 'rgb(0, 192, 0)' : 'red', }">
                                    {{ item.status }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;">

                                    {{ item.dtInicio ?
                                        `${formatarDataHora(item.dtInicio).split('-')[2]}/${formatarDataHora(item.dtInicio).split('-')[1]}/${formatarDataHora(item.dtInicio).split('-')[0]}`
                                        : '' }}

                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    {{ nomeEsobrenome(item.responsavel_nome) }}
                                </td>

                                <td style="text-align: center; vertical-align: middle;"
                                v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 3 : false"
                                >
                                    <div style="display: flex;" @click.stop>

                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar" :disabled="item.aprovada !== null"
                                                @click="atualizarPCM('status', 'Aprovado', item.id)">
                                                Aprovar
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar"
                                                @click="atualizarPCM('status', 'Reprovado', item.id)"
                                                :disabled="item.aprovada !== null">
                                                Reprovar
                                                <i class="fa-solid fa-thumbs-down"></i>
                                            </button>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container" v-else
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; text-align: center; ">
            <h5 style="color: red">
                Você não tem permissão para acessar esta tela! <br>
                Por favor, contate o administrador do sistema
            </h5>
        </div>
    </div>
</template>
<script>

import api from '../../services/api';
// import { permissoes } from '../../services/api'

export default {
    name: "ControlePCM",

    data() {
        return {
            permissoes: this.getPermissoes(),
            PCMSelecionado: null,
            listaPCMsFiltrada: null,

            PCMs: null,
            idUsuario: localStorage.getItem('id'),

            teste: null
        }
    },

    mounted() {
        this.getPCMs()
        // this.idUsuario = localStorage.getItem('id')
    },

    methods: {

        getPermissoes() {
            let permissoes

            var promiseAprovadores = api.get('grupo/2/usuarios')
                .then((response) => {
                    return response.data.map(item => ({
                        "usuario_id": item.id,
                        "nivel": 3,
                        "nome": item.name
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });

            var promiseCriadores = api.get('grupo/3/usuarios')
                .then((response) => {
                    return response.data.map(item => ({
                        "usuario_id": item.id,
                        "nivel": 2,
                        "nome": item.name
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });

            var promiseLeitores = api.get('grupo/4/usuarios')
                .then((response) => {
                    return response.data.map(item => ({
                        "usuario_id": item.id,
                        "nivel": 1,
                        "nome": item.name
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });

            Promise.all([promiseAprovadores, promiseCriadores, promiseLeitores])
                .then(([aprovadores, criadores, leitores]) => {
                    var mergedArray = [...aprovadores, ...criadores, ...leitores];
                    const usuariosMap = {};
                    // Preencha o mapeamento
                    mergedArray.forEach(usuario => {
                        const { usuario_id, nivel } = usuario;
                        if (!(usuario_id in usuariosMap) || nivel > usuariosMap[usuario_id].nivel) {
                            usuariosMap[usuario_id] = usuario;
                        }
                    });
                    // Converta o mapeamento de volta para uma array
                    permissoes = Object.values(usuariosMap);
                    this.permissoes = permissoes
                    console.log(permissoes)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        atualizarPCM(itemEditado, valor, id) {
            if (valor == 'Aprovado') {
                api.put(`pcm/atualizar/${id}`, {
                    [itemEditado]: valor,
                    aprovada: 1
                })
                    .then(() => {
                        this.getPCMs()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (valor == 'Reprovado') {
                api.put(`pcm/atualizar/${id}`, {
                    [itemEditado]: valor,
                    aprovada: 0
                })
                    .then(() => {
                        this.getPCMs()
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },

        formatarDataHora(valor) {
            if (valor) {
                if (valor) {
                    return valor.slice(0, 10)
                } else {
                    return ''
                }
            }
        },

        novoPCM() {
            var novoCodigo = 'Aguardando Importação!';
            // if (this.PCMs.length > 0) {
            //     var PCMsOrdenados = this.PCMs.sort((a, b) => {
            //         if (a.codigo < b.codigo) {
            //             return 1; // retorna 1 para indicar que a deve vir depois de b
            //         } else if (a.codigo > b.codigo) {
            //             return -1; // retorna -1 para indicar que a deve vir antes de b
            //         } else {
            //             return 0; // retorna 0 se os valores são iguais
            //         }
            //     });
            //      novoCodigo = parseInt(PCMsOrdenados[0].codigo.substring(3));
            // } else {
            //      novoCodigo = 'ERRO';
            // }

            api.post(`pcm/cadastrar`, {

                codigo: `PCM${novoCodigo + 1}`,
                dtInicio: new Date().toISOString().split('T')[0],
                impacto_viabilidade: [],
                status: 'Aguardando Aprovação',
                usuario_id: this.idUsuario
            })
                .then((response) => {
                    this.verPCM(response.data.id)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        nomeEsobrenome(nome) {
            if (nome) {
                const nomeESobrenome = nome.split(" ");


                if (nomeESobrenome.length >= 2) {
                    const primeiroNome = nomeESobrenome[0];
                    const segundoNome = nomeESobrenome[1];

                    if (segundoNome.length <= 3 || segundoNome == 'Paula') {
                        return `${primeiroNome} ${segundoNome} ${nomeESobrenome[2] || ''}`;
                    } else {
                        return `${primeiroNome} ${segundoNome}`;
                    }
                } else {
                    return nome;
                }
            }
        },

        filtrarPCMs() {
            if (!this.PCMSelecionado) {
                this.listaPCMsFiltrada = this.PCMs;
            } else {
                const textoLowerCase = this.PCMSelecionado.toLowerCase();
                this.listaPCMsFiltrada = this.PCMs.filter(pcm => {
                    return pcm.codigo.toLowerCase().includes(textoLowerCase);
                });
            }
        },

        getPCMs() {
            api.get(`pcm/listar`, {})
                .then((response) => {
                    this.PCMs = response.data;
                    this.filtrarPCMs()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        verPCM(id) {
            localStorage.setItem('idPCM', id);
            this.$router.push({ name: "PCM" })
        },

        verPCMvazio() {
            this.$router.push({ name: "PCMv" })
        }
    }

}
</script>

<style scoped>
.botaoAdicionarSprint:hover {
    transition: 50ms linear;
    transform: scale(1.1);
}

.fa-solid {
    margin-left: 0rem !important;
}

input:disabled {
    color: black
}

select:disabled {
    color: black
}

@media (max-width: 1800px) {
    .container {
        margin-left: 12rem !important;
        max-width: 1100px !important;
    }

    .botaoHome {
        font-size: 30px;
        margin-left: 6rem !important;
        cursor: pointer;
        position: absolute;
    }
}

.button-reprovar:disabled {
    width: 10rem;
    background-color: #e0213171 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: not-allowed;
}

.button-reprovar {
    width: 10rem;
    background-color: #e02130 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-aprovar:disabled {
    width: 10rem;
    background-color: #4298677e !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: not-allowed;
}

.button-aprovar {
    width: 10rem;
    background-color: #429867 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-aprovar:hover {
    transition: 50ms linear;
    transform: scale(1.1);
}

.button-reprovar:hover {
    transition: 50ms linear;
    transform: scale(1.1);
}
</style>