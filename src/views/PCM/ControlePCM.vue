<template>
    <br><br><br><br>
    <div style="padding: 1rem;">
        <div class="container" v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario) : false"
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

                    <!-- <v-menu
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
</v-menu> -->
                </div>
            </div>
            <br>
            <div>
                <div class="table responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th scope="col">
                                    <button 
                                    >
                                    <!-- @click="ordenarLista('tipo')" -->
                                        Tipo
                                    </button>
                                    <i class="bi bi-caret-down-fill" style="display: none;" id="setaBaixotipo"></i>
                                    <i class="bi bi-caret-up-fill" style="display: none;" id="setaCimatipo"></i>
                                </th>
                                
                                <th scope="col">
                                    <button 
                                    >
                                    <!-- @click="ordenarLista('nome')" -->
                                        Nome
                                    </button>
                                    <i class="bi bi-caret-down-fill" style="display: none;" id="setaBaixonome"></i>
                                    <i class="bi bi-caret-up-fill" style="display: none;" id="setaCimanome"></i>
                                </th>
                                <th scope="col">
                                    <button
                                    >
                                    <!-- @click="ordenarLista('codigo')" -->
                                        Setor
                                    </button>
                                    <i class="bi bi-caret-down-fill" style="display: none;" id="setaBaixocodigo"></i>
                                    <i class="bi bi-caret-up-fill" style="display: none;" id="setaCimacodigo"></i>
                                </th>
                                <th scope="col">
                                    <button 
                                    >
                                    <!-- @click="ordenarLista('status')" -->
                                        Status
                                    </button>
                                    <i class="bi bi-caret-down-fill" style="display: none;" id="setaBaixostatus"></i>
                                    <i class="bi bi-caret-up-fill" style="display: none;" id="setaCimastatus"></i>
                                </th>
                                <th scope="col" style="width: 10rem;">
                                    <button
                                    >
                                     <!-- @click="ordenarLista('dtInicio')" -->
                                        Data de abertura
                                    </button>
                                    <i class="bi bi-caret-down-fill" style="display: none;" id="setaBaixodtInicio"></i>
                                    <i class="bi bi-caret-up-fill" style="display: none;" id="setaCimadtInicio"></i>
                                </th>
                                <th scope="col" style="width: 15rem;"
                                    v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 3 : false">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr @click="verPCM(item.id)" style="vertical-align: middle;"
                                v-for="item in listaPCMsFiltrada" :key="item.id">

                                <td style="vertical-align: middle;text-align: center;" @click.stop>
                                    <i v-if="item.nivel == 'Estratégico'" style="font-size: 20px; color: black"
                                        class="fa-solid fa-lightbulb"></i>
                                    <i v-else style="font-size: 20px; color: black" class="bi bi-gear-fill"></i>
                                </td>

                                <td style="text-align: center; vertical-align: middle;">
                                    <!-- <select v-model="item.responsavel_nome" class="form-select" >
                                        <option></option>
                                    </select> -->
                                    <!-- {{ nomeEsobrenome(item.responsavel_nome) }} -->
                                    {{ item.tipo }}
                                </td>

                                <td style="text-align: center; vertical-align: middle; width: max-content ;">
                                    {{ item.nome }}
                                </td>
                                
                                <td style="text-align: center; vertical-align: middle; width: min-content; width: 9rem;">
                                    <select disabled>
                                        <option v-for="item in setores" :key="item.id" :value="item.id">{{ item.nome }}</option>
                                    </select>
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

                                <td style="text-align: center; vertical-align: middle;"
                                    v-if="permissoes ? permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 3 : false">
                                    <div style="display: flex;" @click.stop>

                                        <div style="margin-left: 1rem;">
                                            <button class="button-aprovar"
                                                :style="{ 'background-color': (item.status == 'Reprovado') ? '#4298677e' : '#429867' }"
                                                @click="criarElemento(item), atualizarPCM('status', 'Aprovado', item.id)">
                                                
                                                {{item.status == 'Aprovado' ? 'Aprovado' : 'Aprovar'}}
                                                <i class="fa-solid fa-thumbs-up"></i>
                                            </button>
                                        </div>
                                        <div style="margin-left: 1rem;">
                                            <button type="button" class="button-reprovar"
                                                :style="{ 'background-color': (item.status == 'Aprovado') ? '#e0213171' : '#e02130' }"
                                                @click="avisoExclusao(item)">
                                                {{item.status == 'Reprovado' ? 'Reprovado' : 'Reprovar'}}
                                                <i class="fa-solid fa-thumbs-down"></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- 
                        {{ setores ? setores : null }}
                        {{ permissoes }}
                        {{ teste }}
                        {{ PCMs ? PCMs : null }} <br>
                    -->
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

    <div style="overflow: auto" class="modal-mask" v-if="modalConfirmacao" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; border: solid 1px black;"
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Deseja reprovar {{ pcmReprovado.codigo }}?</h3>
                </div>
                <h6>O {{ tipo }} associado ao PCM que você está reprovando será excluido.</h6>
                <h6>
                    Atualmente ele possui
                    <strong>
                        {{ quantidadeTarefas }}
                    </strong>
                    {{ quantidadeTarefas > 1 ? 'tarefas registradas.' : 'tarefa registrada.' }}
                </h6>

                <div class="modal-footer">
                    <button type="button" class="btn btn-light"
                        @click="excluirElemento(pcmReprovado), atualizarPCM('status', 'Reprovado', pcmReprovado.id), modalConfirmacao = false"
                        style="border: 1px solid black;">Confirmar</button>
                    <button type="button" class="btn btn-dark" @click="modalConfirmacao = false"
                        style="margin-left: 0.5rem;">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import api from '../../services/api';
import { getPermissoes } from '@/services/permissao-pcm';
import { consultarSetores } from '@/services/usuario-setor';

export default {
    name: "ControlePCM",

    data() {
        return {
            permissoes: this.carregarPermissoes(),
            PCMSelecionado: null,
            listaPCMsFiltrada: null,
            pcmReprovado: null,
            modalConfirmacao: false,
            quantidadeTarefas: null,
            tipo: null,

            PCMs: null,
            idUsuario: localStorage.getItem('id'),

            teste: 'teste',
            usuarios: null,
            setores: null
        }
    },

    created() {
        this.getPCMs();
        this.getSetores();
        // this.idUsuario = localStorage.getItem('id')
    },

    methods: {
        apagarPCM(item) {
            api.put(`pcm/excluir/${item.id}`, {
                usuario_id: this.idUsuario
            })
                .then(() => {
                    this.getPCMs()
                })
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalConfirmacao = false;
            }
        },

        avisoExclusao(item) {
            if (item.tipo == 'Projeto') {
                api.get('projeto/listar').then((response) => {
                    var quantidadeTarefas = response.data.find(projeto => projeto.id === item.associadao_id).quantidade_tarefas
                    if (quantidadeTarefas !== 0) {
                        this.modalConfirmacao = true
                        this.quantidadeTarefas = quantidadeTarefas
                        this.tipo = item.tipo
                        this.pcmReprovado = item
                    } else {
                        this.excluirElemento(item)
                        this.atualizarPCM('status', 'Reprovado', item.id)
                    }
                })
            }
            if (item.tipo == 'Plano de Ação') {
                api.get('planoAcao/listar').then((response) => {
                    var quantidadeTarefas = response.data.find(plano => plano.id === item.associadao_id).quantidade_tarefas
                    if (quantidadeTarefas !== 0) {
                        this.modalConfirmacao = true
                        this.quantidadeTarefas = quantidadeTarefas
                        this.tipo = item.tipo
                        this.pcmReprovado = item
                    } else {
                        this.excluirElemento(item)
                        this.atualizarPCM('status', 'Reprovado', item.id)
                    }
                })
            }
            if (item.tipo == 'Programa') {
                this.excluirElemento(item)
                this.atualizarPCM('status', 'Reprovado', item.id)
            }
        },

        excluirElemento(item) {
            if (item.tipo == 'Projeto') {
                api.put(`projeto/excluir/${item.associadao_id}`, {
                    usuario_id: this.idUsuario
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (item.tipo == 'Plano de Ação') {
                api.put(`planoAcao/excluir/${item.associadao_id}`, {
                    usuario_id: this.idUsuario
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (item.tipo == 'Programa') {
                api.put(`programa/excluir/${item.associadao_id}`, {
                    usuario_id: this.idUsuario
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },

        criarElemento(item) {
            if (item.associadao_id == null) {
                if (item.tipo == 'Projeto') {
                    api.post(`projeto/cadastrar`, {
                        nome: item.nome,
                        dtInicio: item.dtInicio.split(' ')[0],
                        gerente_id: 4,
                        setor_id: item.setor_id,
                        usuario_id: item.solicitante_id,
                        status: "Pendente"
                    })
                        .then((response) => {
                            api.put(`pcm/atualizar/${item.id}`, {
                                // projeto: 1,
                                projeto_id: response.data.id
                            })
                                .catch((error) => {
                                    console.error(error);
                                });
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (item.tipo == 'Plano de Ação') {
                    api.post(`planoAcao/cadastrar`, {
                        nome: item.nome,
                        dtInicio: item.dtInicio.split(' ')[0],
                        gerente_id: 4,
                        setor_id: item.setor_id,
                        usuario_id: item.solicitante_id,
                        status: "Pendente"
                    })
                        .then((response) => {
                            api.put(`pcm/atualizar/${item.id}`, {
                                // projeto: 0,
                                planoAcao_id: response.data.id
                            })
                                .catch((error) => {
                                    console.error(error);
                                });
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (item.tipo == 'Programa') {
                    api.post(`programa/cadastrar`, {
                        nome: item.nome,
                        dtInicio: item.dtInicio.split(' ')[0],
                        gerente_id: 4,
                        status: "Pendente"
                    })
                        .then((response) => {
                            api.put(`pcm/atualizar/${item.id}`, {
                                // projeto: 0,
                                programa_id: response.data.id
                            })
                                .catch((error) => {
                                    console.error(error);
                                });
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        },

        carregarPermissoes() {
            getPermissoes()
                .then(permissoes => {
                    this.permissoes = permissoes;
                    console.log(permissoes);
                })
                .catch(error => {
                    console.error(error);
                });
        },

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
                    // Verifica se alguma chave do objeto contém o texto
                    return Object.values(pcm).some(value => {
                        if (typeof value === 'string') {
                            return value.toLowerCase().includes(textoLowerCase);
                        }
                        return false;
                    });
                });
            }
        },

        getPCMs() {
            api.get(`pcm/listar`)
                .then((response) => {
                    this.PCMs = response.data;
                    this.PCMs = this.PCMs.sort((a, b) => a.status.localeCompare(b.status));
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
        },

        async getSetores() {
            try {
                const { usuarios, setores } = await consultarSetores();
                this.usuarios = usuarios;
                this.setores = setores;
            } catch (error) {
                console.error(error);
            }
        },

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

.button-reprovar:hover {
    width: 10rem;
    background-color: #e02130 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    /* cursor: not-allowed; */
}

.button-reprovar {
    width: 10rem;
    background-color: #e02130;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    cursor: pointer;
}

.button-aprovar:hover {
    width: 10rem;
    background-color: #429867 !important;
    color: rgb(255, 255, 255) !important;
    padding: 5px !important;
    /* margin: 6px 0 !important; */
    border: none !important;
    border-radius: 6px !important;
    /* cursor: not-allowed; */
}

.button-aprovar {
    width: 10rem;
    background-color: #429867;
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

.modal-container {
    max-height: 80%;
    width: 70%;
    padding: 3rem;
    overflow-y: auto;
    background-color: white;
    border-radius: 20px;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>