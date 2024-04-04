<template>
    <br>

    <br><br><br>

    <div style="padding: 1rem;">
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">
            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div class="input-group mb-3" style="width: 20rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar Plano de Ação"
                            aria-label="Username" aria-describedby="basic-addon1" v-model="planoSelecionado"
                            @input="filtrarPlanosdeAção()">
                    </div>

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Plano de Ação</h3>
                    </div>

                    <button :title="'Adicionar Plano de Ação'" style="width: max-content; font-size: 30px;"
                        @click="this.modalNovoPA = true" class="botaoAdicionarSprint">
                        <i class="bi bi-plus-circle"></i>
                    </button>

                </div>
            </div>

            <br>

            <div>
                <div class="table responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nome do Plano de Ação </th>
                                <th scope="col">Status</th>
                                <th scope="col">Data de Início</th>
                                <th scope="col">Data de Término</th>
                                <th scope="col">Gerente Responsável</th>
                                <th scope="col">Setor Envolvido</th>
                                <th scope="col"></th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in listaPlanosFiltrada" :key="item.id" style="text-align: center;"
                                @mouseover="mostrarBotao(item.id, true)" @click="verBacklogs(item.id, item.nome)"
                                @mouseleave="mostrarBotao(item.id, false)">

                                <td style="vertical-align: middle; text-align: left;">{{ item.nome }}</td>
                                <td style="vertical-align: middle;">
                                    <select v-model="item.status" class="form-select"
                                        :disabled="(item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                        :style="{ 'color': (item.status == 'Pendente') ? 'rgb(255, 145, 0)' : (item.status == 'Em andamento') ? 'rgb(0, 47, 255)' : (item.status == 'Concluído') ? 'rgb(0, 192, 0)' : 'red', 'cursor': (item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : '' }"
                                        style="width: 8rem; outline: none; text-align: center; border: none; background-color: transparent; "
                                        @click.stop @change="editarPlanoInline(item.id, 'status', item.status)">
                                        <option style="color: red;">Proposto</option>
                                        <option style="color: rgb(255, 145, 0);">Pendente</option>
                                        <option style="color: rgb(0, 47, 255);">Em andamento</option>
                                        <option style="color: rgb(0, 192, 0);">Concluído</option>
                                    </select>
                                </td>
                                <td style="vertical-align: middle;">

                                    {{ item.dtInicio ?
                                `${formatarDataHora(item.dtInicio).split('-')[2]}/${formatarDataHora(item.dtInicio).split('-')[1]}/${formatarDataHora(item.dtInicio).split('-')[0]}`
                                : '' }}

                                </td>
                                <td style="vertical-align: middle;">

                                    {{ item.dtTermino ?
                                `${formatarDataHora(item.dtTermino).split('-')[2]}/${formatarDataHora(item.dtTermino).split('-')[1]}/${formatarDataHora(item.dtTermino).split('-')[0]}`
                                : '-' }}

                                </td>
                                <td style="vertical-align: middle;">{{ nomeEsobrenome(item.gerente_name) }}</td>
                                <td style="vertical-align: middle;">{{ item.setor_nome }}</td>
                                <td style="vertical-align: middle;">
                                    <div style="width: max-content; visibility: hidden;" :id="'botaoEdicao' + item.id">
                                        <v-menu v-if="Array.isArray(planosAcao) && planosAcao.length > 0">
                                            <template v-slot:activator="{ props }">
                                                <v-btn style="width: 1.6rem; height: 1.6rem; border: 1px solid black;"
                                                    class="botaoAdicionarSprint" icon="mdi-dots-horizontal"
                                                    v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item
                                                    :disabled="(item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }"
                                                    @click="modalCompartilharPlano = true, this.planoEditado = item">
                                                    Compartilhar
                                                    <br />
                                                </v-list-item>
                                                <v-list-item
                                                    :disabled="(item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }"
                                                    @click="modalEditarPlano = true, this.planoEditado = item, this.planoEditado.dtTermino !== null ? this.planoEditado.dtTermino = this.planoEditado.dtTermino.slice(0, 10) : '', this.planoEditado.dtInicio !== null ? this.planoEditado.dtInicio = this.planoEditado.dtInicio.slice(0, 10) : ''">Editar
                                                </v-list-item>
                                                <v-list-item
                                                    :disabled="(item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }"
                                                    @click="modalFinalizarPlano = true, this.planoEditado = item">
                                                    Finalizar
                                                </v-list-item>
                                                <v-list-item
                                                    :disabled="(item.permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1"
                                                    :style="{ 'cursor': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'not-allowed' : 'pointer', 'color': item.permissao.find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1 ? 'grey' : 'black' }"
                                                    @click="modalExcluirPlano = true, this.planoEditado = item"
                                                    style="color: red;">
                                                    Excluir
                                                </v-list-item>

                                            </v-list>
                                        </v-menu>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL compartilhar Plano-->

    <div style="overflow: auto" class="modal-mask" v-if="modalCompartilharPlano" @click="fecharModalFora">
        <div style="height: 100rem ;width: 50rem; padding: 3rem; margin-bottom: 2rem; " class="modal-container">

            <div>

                <h3 class="titulo">Compartilhar: {{ planoEditado.nome }} </h3>
                <hr>
                <br>
            </div>

            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; flex-flow: column; width: 100%; height: 10rem;">
                    <input type="text" v-model="pessoaSelecionada" class="form-control"
                        @focusin="this.procurar($event.target.value)"
                        style="background-color: #f1f1f1; color: black; padding-top : 1.5rem; padding-bottom: 1.5rem;"
                        @input="this.procurar($event.target.value)" @focusout="fecharLista()"
                        placeholder="Adicionar Participante">

                    <div style="height: fit-content; max-height: 15rem ; overflow: auto; background-color: #f1f1f1; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; position: absolute; margin-top: 3.5rem; width: 30rem;"
                        v-if="listaPessoasFiltrada">
                        <ul style="list-style: none;">
                            <li @click="atualizarPermissão(item, 'adicionar')" v-for="item in listaPessoasFiltrada"
                                :key="item.id">
                                <div style="display: flex; ; align-items: center; padding: 5px; border-radius: 10px; margin-right: 3rem;"
                                    :style="{ 'color': (this.planoEditado.permissao.map((item) => item.usuario_id)).includes(item.id) ? 'grey' : 'black', 'cursor': (this.planoEditado.permissao.map((item) => item.usuario_id)).includes(item.id) ? 'not-allowed' : '' }">
                                    {{ item.nomeCompleto }} {{ (this.planoEditado.permissao.map((item) =>
                                item.usuario_id)).includes(item.id) ? '(Já adicionado)' : '' }}
                                </div>
                            </li>
                        </ul>
                    </div>


                    <br>
                    <h5>Pessoas com acesso:</h5>
                    <ul style="list-style: none; padding-left: 0rem !important;">
                        <li v-for="item in reordenarArray(planoEditado.permissao) " :key="item.usuario_id"
                            style="display: flex; align-items: center;">
                            <div
                                style="display: flex; border: 1px solid black; align-items: center; justify-content: space-between; padding: 5px; border-radius: 10px; width: 90%; margin-top: 0.3rem;">
                                {{ item.nome }} {{ item.usuario_id == planoEditado.gerente_id ? '(Gerente)' :
                                item.usuario_id == this.idUsuario ? '(Você)' : '' }}
                                <select style="width: 7rem; text-align: center;" class="form-select"
                                    v-model="item.nivel" @change="atualizarPermissão(item, 'atualizar')"
                                    :disabled="item.usuario_id == planoEditado.gerente_id || item.usuario_id == this.idUsuario">
                                    <option :value="1">Leitor</option>
                                    <option :value="2">Editor</option>
                                </select>
                            </div>
                            <i v-if="parseInt(item.usuario_id) !== parseInt(this.idUsuario) && parseInt(item.usuario_id) !== parseInt(this.planoEditado.gerente_id)"
                                @click=" atualizarPermissão(item, 'remover')"
                                style="margin-left: 1rem; font-size: 20px; color: red;" :id="'botaoEdicao' + item.id"
                                class="bi bi-dash-circle botaoAdicionarSprint"></i>
                        </li>
                        <br><br><br>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--END MODAL-->

    <!-- MODAL FINALIZAR PLANO-->
    <div class="modal-mask" v-if="modalFinalizarPlano" @click="fecharModalFora">
        <div class="modal-container" style="height: min-content; width: 50rem;">
            <div style="display: flex; justify-content: center">
                <h5>{{ planoEditado.nome }}</h5>
            </div>
            <br>

            <div style="width: 100%;">
                <div>
                    <label>Data de término do plano de ação:</label>
                    <input :class="{ shake: disabled }" v-model="dataTerminoPlano" id="dataTermino" class="form-control"
                        type="date">
                </div>
                <div style="margin-top: 1rem;">
                    <button class="button-default" @click="finalizarPlano()">
                        Finalizar Plano de Ação</button>
                </div>
            </div>

        </div>
    </div>
    <!--END MODAL FINALIZAR PLANO-->

    <!-- MODAL EXCLUIR PLANO DE AÇÃO -->
    <div style="overflow: auto" class="modal-mask" v-if="modalExcluirPlano" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h6 class="titulo">Deseja excluir o plano de ação {{ planoEditado.nome }}?</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn button-cancel" @click="fecharModalExcluirPlano">Cancelar</button>
                    &nbsp;&nbsp;
                    <button type="button" class="btn btn-primary" @click="excluirPlano"
                        data-bs-dismiss="modal">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL EXCLUIR PLANO DE AÇÃO -->

    <!-- MODAL EDITAR PLANO DE AÇÃO -->
    <div style="overflow: auto" class="modal-mask" v-if="modalEditarPlano" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; "
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Editar: {{ planoEditado.nome }} </h3>
                    <button type="button" class="btn-close" aria-label="Close"
                        @click="this.getPlanoAcao, this.modalEditarPlano = false"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex; width: 100%;">
                    <div style="display: flex; flex-flow: column; width: 50%">


                        <div class="form-group">
                            <label for="nome">Nome do Plano de Ação</label>
                            <input id="nome" type="text" v-model="planoEditado.nome" class="form-control"
                                @focusout="editarPlano('nome', planoEditado.nome)">
                        </div>

                        <div class="form-group">
                            <label for="gerente">Gerente Responsável</label>
                            <select id="gerente" v-model="planoEditado.gerente_id" class="form-select"
                                @change="editarPlano('gerente_id', $event.target.value)">
                                <option v-for="item in gerente" :key="item.nome" :value="item.id">
                                    {{ item.nomeCompleto }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="programa">Programa</label>
                            <select id="programa" v-model="planoEditado.programa_id" class="form-select"
                                @change="editarPlano('programa_id', $event.target.value)">
                                <option v-for="item in programas" :key="item.nome" :value="item.id">
                                    {{ item.nome }}
                                </option>
                            </select>

                        </div>
                    </div>

                    <div style="display: flex; flex-flow: column; width: 50%;">

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="dataInicio">Data de Início</label>
                            <input id="dataInicio" type="date" v-model="planoEditado.dtInicio" class="form-control"
                                @change="editarPlano('dtInicio', $event.target.value)">
                        </div>
                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="dataTermino">Data de Término</label>
                            <input id="dataTermino" type="date" v-model="planoEditado.dtTermino" class="form-control"
                                @change="editarPlano('dtTermino', $event.target.value)">
                        </div>

                        <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                            <label for="setor">Setor Beneficiado</label>
                            <select v-model="planoEditado.setor_nome" class="form-select"
                                @change="editarPlano('setor_id', $event.target.value)">
                                <option v-for="setor in setores" :key="setor.id" :value="setor.nome">{{ setor.nome }}
                                </option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END MODAL EDITAR PLANO DE AÇÃO -->

    <!-- MODAL NOVO PLANO DE AÇÃO -->

    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPA" @click="fecharModalFora">
        <div style="max-height: 80%; width: 70%; padding: 3rem; " class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h3 class="titulo">Cadastrar Plano de Ação </h3>
                    <button type="button" @click="this.modalNovoPA = false" class="btn-close"
                        aria-label="Close"></button>
                </div>
                <hr>
                <br>
                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="nome">Nome</label>
                        <input id="nome" v-model="novoPlanoAcao.nome" type="text" class="form-control">
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="data">Data de Início</label>
                        <input id="data" v-model="novoPlanoAcao.dtInicio" type="date" ref="dtInicio"
                            class="form-control">
                    </div>
                </div>
                <div style="display: flex;">
                    <div class="form-group" style="width: 30rem;">
                        <label for="gerente">Gerente Responsável</label>
                        <select id="gerente" v-model="novoPlanoAcao.gerente_id" class="form-select">
                            <option v-for="item in gerente" :key="item.nomeCompleto" :value="item.id">
                                {{ item.nomeCompleto }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group" style="width: 20rem; margin-left: 2rem;">
                        <label for="setor">Setor Responsável</label>
                        <select id="setor" v-model="novoPlanoAcao.setor_id" class="form-select">
                            <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                                {{ setor.nome }}
                            </option>
                        </select>
                    </div>


                </div>
                <div class="form-group" style="width: 30rem;">
                    <label for="programa">Programa</label>
                    <select id="programa" v-model="novoPlanoAcao.programa_id" class="form-select">
                        <option v-for="item in programas" :key="item.id" :value="item.id">
                            {{ item.nome }}
                        </option>
                    </select>
                </div>

                <div style="display: flex; justify-content: right;">
                    <button @click="adicionarPlanoAcao" style="height: 2.5rem;"
                        class="btn btn-primary float-right mr-2">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END MODAL NOVO PLANO DE AÇÃO -->
</template>

<script>
import api from '../../services/api'

export default {
    name: "ControlePCM",

    data() {
        return {
            idUsuario: null,
            modalCompartilharPlano: false,

            planoSelecionado: null,
            listaPlanosFiltrada: null,

            listaPessoasFiltrada: null,
            pessoaSelecionada: null,


            modalNovoPA: false,
            planosAcao: [],
            novoPlanoAcao: {
                "nome": '',
                "dtInicio": new Date().toISOString().split('T')[0],
                "gerente_id": '',
                "setor_id": '',
                "programa_id": ''
            },
            gerente: [],
            setores: [],
            modalEditarPlano: false,
            modalExcluirPlano: false,
            modalFinalizarPlano: false,
            planoEditado: null,
            programas: [],
            dataTerminoPlano: null,

            teste: 'teste'

        }
    },

    mounted() {
        this.getPlanoAcao()
        this.getGerenteseSetor()
        this.getProgramas()

    },


    created() {
        this.idUsuario = localStorage.getItem('id')
    },

    methods: {

        nomeEsobrenome(nome) {
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
        },

        atualizarPermissão(item, ação) {
            if ((this.planoEditado.permissao.map((item) => item.usuario_id)).includes(item.id)) {
                return
            } else {

                if (ação == 'adicionar') {

                    var novaPermissão = {
                        usuario_id: item.id,
                        nivel: 1,
                        nome: item.nomeCompleto
                    }
                    this.planoEditado.permissao.push(novaPermissão);

                    api.post(`/permissao/planoAcao/${this.planoEditado.id}`, {
                        usuarios: this.planoEditado.permissao
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (ação == 'remover') {
                    this.planoEditado.permissao = this.planoEditado.permissao.filter(pessoa => pessoa.usuario_id !== parseInt(item.usuario_id));
                    api.post(`/permissao/planoAcao/${this.planoEditado.id}`, {
                        usuarios: this.planoEditado.permissao
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
                if (ação == 'atualizar') {

                    api.post(`/permissao/planoAcao/${this.planoEditado.id}`, {
                        usuarios: this.planoEditado.permissao
                        // .filter(item => item.usuario_id !== parseInt(this.idUsuario))
                    })
                        .then(() => {
                            this.listaPessoasFiltrada = null;
                            this.pessoaSelecionada = null
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }

        },

        reordenarArray(array) {
            var id = this.planoEditado.gerente_id
            // var idUserLogado = parseInt(localStorage.getItem('id'))

            const primeiroElemento = array.find(item => parseInt(item.usuario_id) === id);
            const arraySemPrimeiroElemento = [array.filter(item => item.usuario_id !== parseInt(id))];
            return [].concat(primeiroElemento, ...arraySemPrimeiroElemento)
        },

        procurar(texto) {
            if (!texto) {
                this.listaPessoasFiltrada = this.gerente
                // .filter(item => !(this.planoEditado.permissao.map((item) => item.usuario_id)).includes(item.id));
            } else {
                if (this.listaPessoasFiltrada !== null) {
                    // this.listaPessoasFiltrada = this.gerente.filter(item => !(this.planoEditado.permissao.map((item) => item.usuario_id)).includes(item.id));
                    this.listaPessoasFiltrada = this.gerente
                    this.listaPessoasFiltrada = this.listaPessoasFiltrada.filter(nome => nome.nomeCompleto.toLowerCase().includes(texto.toLowerCase()));
                }
            }
        },

        fecharLista() {
            setTimeout(() => {
                this.listaPessoasFiltrada = null;
                this.pessoaSelecionada = null;
            }, 200);
        },

        finalizarPlano() {
            if (this.dataTerminoPlano == null) {
                document.getElementById('dataTermino').style.border = '1px solid red';
                this.disabled = true
                setTimeout(() => {
                    this.disabled = false
                }, 1500)
                return
            }
            api.put(`/planoAcao/atualizar/${this.planoEditado.id}`, {
                dtTermino: this.dataTerminoPlano,
                status: "Concluído"
            })
            this.modalFinalizarPlano = false;
            setTimeout(() => {
                this.getPlanoAcao();
            }, 500)

        },

        filtrarPlanosdeAção() {
            if (!this.planoSelecionado) {
                this.listaPlanosFiltrada = this.planosAcao;
            } else {
                const textoLowerCase = this.planoSelecionado.toLowerCase();
                this.listaPlanosFiltrada = this.planosAcao.filter(planoAcao => {
                    return planoAcao.nome.toLowerCase().includes(textoLowerCase);
                });
            }
        },

        getProgramas() {
            api.get(`/programa/listar`, {})
                .then((response) => {
                    this.programas = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        excluirPlano() {
            const userId = localStorage.getItem('id')

            api.put(`/planoAcao/excluir/${this.planoEditado.id}`, {
                usuario_id: userId
            })
                .then(() => {
                    this.getPlanoAcao();
                    this.modalExcluirPlano = false;
                })
                .catch((error) => {
                    console.error('Erro ao excluir plano:', error);
                });
        },

        fecharModalExcluirPlano() {
            this.modalExcluirPlano = false;
        },

        formatarDataHora(valor) {
            if (valor) {
                return valor.slice(0, 10)
            } else {
                return ''
            }
        },

        editarPlanoInline(idProjeto, itemAlterado, novoValor) {
            if (novoValor !== "Concluído") {


                api.put(`/planoAcao/atualizar/${idProjeto}`, {
                    [itemAlterado]: novoValor,
                    dtTermino: null
                })
                    .then(() => {
                        this.getPlanoAcao()
                    })
            }
            if (novoValor == "Concluído") {
                var dataAtual = new Date().toISOString().split('T')[0];
                api.put(`${this.prodURL}/planoAcao/atualizar/${idProjeto}`, {

                    [itemAlterado]: novoValor,
                    dtTermino: dataAtual
                })
                    .then(() => {
                        this.getPlanoAcao()
                    })
            }
        },

        editarPlano(itemAlterado, novoValor) {

            api.put(`/planoAcao/atualizar/${this.planoEditado.id}`, {
                [itemAlterado]: novoValor,
            })
        },

        mostrarBotao(id, mostrar) {
            if (mostrar) {
                this.planoEditado = this.planosAcao.find(item => item.id === id);
                document.getElementById('botaoEdicao' + id).style.visibility = '';
            } else {
                document.getElementById('botaoEdicao' + id).style.visibility = 'hidden';
            }
        },

        adicionarPlanoAcao() {
            api.post(`/planoAcao/cadastrar`, {

                nome: this.novoPlanoAcao.nome,
                dtInicio: this.novoPlanoAcao.dtInicio,
                gerente_id: this.novoPlanoAcao.gerente_id,
                setor_id: this.novoPlanoAcao.setor_id,
                programa_id: this.novoPlanoAcao.programa_id,
                usuario_id: localStorage.getItem('id'),
                status: "Proposto"
            })

                .then((response) => {
                    this.getPlanoAcao();
                    this.modalNovoPA = false;
                    this.novoPlanoAcao = {
                        "nome": "",
                        "dtInicio": new Date().getFullYear() + '-' + '0' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                        "gerente_id": "",
                        "setor_id": "",
                        "programa_id": "",
                    };
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

        },

        getGerenteseSetor() {
            api.get(`/usuario`, {

            })
                .then((response) => {
                    this.gerente = response.data
                    this.gerente = this.gerente.map(item => ({
                        id: item.id,
                        nomeCompleto: item.name
                    }))
                })
                .catch((error) => {
                    console.error(error);
                });

            api.get(`/setor`, {

            })
                .then((response) => {
                    this.setores = response.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        getPlanoAcao() {
            api.get(`/planoAcao/listar`, {

            })
                .then((response) => {
                    this.planosAcao = response.data;
                    this.planosAcao = this.planosAcao.filter(item => item.permissao.some(permissao => permissao.usuario_id === parseInt(this.idUsuario)))
                    this.filtrarPlanosdeAção()
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalNovoPA = false;
                this.modalEditarPlano = false;
                this.modalExcluirPlano = false;
                this.modalFinalizarPlano = false;
                this.modalCompartilharPlano = false;
                return this.getPlanoAcao()
            }
        },

        verBacklogs(id, nomeProjeto) {

            if (this.planosAcao.length > 0) {
                if ((this.planosAcao.find(projeto => projeto.id == id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 2) {
                    this.$router.push({ name: "PA" })
                    sessionStorage.setItem('idProjeto', id)
                    sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
                }
                if ((this.planosAcao.find(projeto => projeto.id == id).permissao).find(pessoa => pessoa.usuario_id == this.idUsuario).nivel == 1) {
                    this.$router.push({ name: "PAVo" })
                    sessionStorage.setItem('idProjeto', id)
                    sessionStorage.setItem('nomeDoProjeto', nomeProjeto)
                }
            }

        },

        verPCM() {
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

.fa-solid {
    margin-left: 0rem !important;
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

.modal-container {
    max-height: 80%;
    width: 70%;
    padding: 3rem;
    overflow-y: auto;
    background-color: white;
    border-radius: 20px;
}
</style>