<template>
    <br />
    <br /><br />

    <div class="container" style="padding: 2rem 0rem 0rem 0rem">
        <i @click="verPCMs" style="font-size: 30px;position: absolute; cursor: pointer"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>
        <br><br>
        <div style="text-align: center;">
            <h5><b>Área do Solicitante</b></h5>
        </div>
        <div style="border: 1px black solid; padding: 20px; border-radius: 20px">
            <div style=" display: flex; align-content: center; justify-content: center;">

                <div style=" display: flex; align-items: center; width: fit-content; flex-flow: column;">
                    <strong>
                        <br />
                        Nível
                        <br />
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem; text-align: center"
                        v-model="finalidade" @change="atualizarPCM('finalidade', finalidade)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option>Estratégico</option>
                        <option>Operacional</option>
                    </select>
                </div>

                <div
                    style=" display: flex; align-items: center;margin-left: 1rem; width: fit-content; flex-flow: column;">
                    <strong>
                        <br />
                        Tipo
                        <br />
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem; text-align: center"
                        v-model="tipo" @change="atualizarPCM('finalidade', finalidade)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option>Programa</option>
                        <option>Projeto</option>
                        <option>Plano de Ação</option>
                    </select>
                </div>

                <div
                    style=" display: flex; align-items: center;margin-left: 1rem; width: fit-content; flex-flow: column;">
                    <strong>
                        <br />
                        Finalidade
                        <br />
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem; text-align: center"
                        v-model="finalidade" @change="atualizarPCM('finalidade', finalidade)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option>Criação</option>
                        <option>Mudança</option>
                    </select>
                </div>
                <div
                    style=" display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column;">
                    <strong>
                        <br />
                        Área
                        <br />
                    </strong>
                    <select class="form-select" style="margin-left: 0.5rem; margin-top: 0.5rem; text-align: center;"
                        v-model="area" @change="atualizarPCM('area', area)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option>Processo</option>
                        <option>Produto</option>
                    </select>
                </div>
                <div
                    style=" display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column; text-align: center">
                    <strong style="width: 15rem; text-align: center">
                        Setor para encaminhamento da demanda
                    </strong>
                    <select class="form-select"
                        style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem; text-align: center;"
                        @change="atualizarPCM('setor_id', setor_id)" v-model="setor_id">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option v-for="setor in setores" :key="setor.id" :value="setor.id">
                            {{ setor.nome }}
                        </option>
                    </select>
                </div>
                <div
                    style=" display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column;">
                    <strong>
                        <br />
                        Data de abertura
                        <br />
                    </strong>
                    <input v-model="dtInicio" type="date" class="form-control"
                        style="margin-top: 0.5rem; text-align: center" @focusout="atualizarPCM('dtInicio', dtInicio)" />
                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                </div>
            </div>

            <div class="input-group" style="margin-top: 1rem">
                <span class="input-group-text"><b>Descrição do Problema:</b> </span>
                <textarea class="form-control" v-model="descricao_problema" style="height: 8rem"
                    @focusout="atualizarPCM('descricao_problema', descricao_problema)"></textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>
            <div class="input-group" style="margin-top: 1rem">
                <span class="input-group-text" style="width: 13rem"><b>Possível solução: </b>
                </span>
                <textarea class="form-control" v-model="possivel_solucao" style="height: 6rem"
                    @focusout="atualizarPCM('possivel_solucao', possivel_solucao)"></textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>
            <div class="input-group" style="margin-top: 1rem">
                <span class="input-group-text" style="width: 13rem"><b>Propósito da mudança:</b>
                </span>
                <textarea class="form-control" v-model="proposito_mudanca"
                    @focusout="atualizarPCM('proposito_mudanca', proposito_mudanca)">
            </textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>

            <div style="
                          display: flex;
                          align-content: center;
                          justify-content: center;
                          margin-top: 1rem;
                        ">
                <div style="display: flex; align-items: center; flex-flow: column">
                    <strong>Data limite de implementação</strong>
                    <input v-model="dtLimiteImplementacao" type="date"
                        @change="atualizarPCM('dtLimiteImplementacao', dtLimiteImplementacao)" class="form-control"
                        style="width: 9rem; margin-left: 0.5rem; margin-top: 0.5rem; text-align: center" />
                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                </div>
                <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column">
                    <strong>Responsável pela solicitação</strong>
                    <select class="form-select"
                        style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem; text-align: center"
                        v-model="solicitante_id" @change="atualizarPCM('solicitante_id', solicitante_id)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option v-for="item in usuarios" :key="item.id" :value="item.id">
                            {{ nomeEsobrenome(item.nomeCompleto) }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="container" style="padding: 2rem 0rem 0rem 0rem">
        <div style="text-align: center">
            <h5><b>Área do Responsável</b></h5>
        </div>
        <div style="border: 1px black solid; padding: 20px; border-radius: 20px">
            <div>
                <div
                    style=" border: 1px solid black; padding-bottom: 10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Análise de impactos e viabilidade da proposta</th>
                                <th scope="col"></th>
                                <th scope="col">Justificativa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in impacto_viabilidade" :key="index">
                                <th style=" border: 1px solid black; border-left: none; vertical-align: middle;">
                                    {{ index + 1 }}.
                                </th>
                                <td style="border: 1px solid black; vertical-align: middle">
                                    <div>
                                        {{ item.descricao }}
                                    </div>
                                </td>

                                <td style="border: 1px solid black; vertical-align: middle">
                                    <div style="display: flex" v-if="item !== 'Estimativa de Custo da Mudança'">
                                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionSim' + index" autocomplete="off" v-model="item.concordo"
                                            @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"
                                            value="1" />
                                        <label class="btn" :for="'optionSim' + index">Sim</label>
                                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionNão' + index" autocomplete="off" v-model="item.concordo"
                                            @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"
                                            value="0" />
                                        <label class="btn" :for="'optionNão' + index">Não</label>
                                    </div>
                                </td>

                                <td style="border: 1px solid black; border-right: none">
                                    <textarea class="form-control" v-model="item.justificativa"
                                        @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"></textarea>
                                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                </td>
                            </tr>

                            <tr>
                                <th style="
                                    border: 1px solid black; border-left: none; vertical-align: middle;">
                                    3.
                                </th>
                                <td style="border: 1px solid black; vertical-align: middle">
                                    <div>Estimativa de Custo da Mudança</div>
                                </td>

                                <td style="border: 1px solid black; vertical-align: middle">
                                    <strong>
                                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                        <money3 v-model="estimativa_custo"
                                            @focusout="atualizarPCM('estimativa_custo', estimativa_custo)"
                                            v-bind="config" style="width: 8rem; border: none; outline: none">
                                        </money3>
                                    </strong>

                                </td>

                                <td style="border: 1px solid black; border-right: none">
                                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                    <textarea v-model="custo_justificativa"
                                        @change="atualizarPCM('custo_justificativa', custo_justificativa)"
                                        class="form-control"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <div style="display: flex; margin-inline: 1rem;">

                        <div
                            style="border: 1px solid black; padding: 5px; width: 40rem; border-radius: 10px; margin-top: 0.5rem;">
                            <div style="display: flex;">
                                <input type="checkbox">
                                <label style="margin-left: 1rem;">
                                    O cenário geral do mercado é viável à proposta.
                                </label>
                            </div>
                        </div>
                        <div
                            style="margin-left: 1rem; border: 1px solid black; padding: 5px; width: 40rem; border-radius: 10px; margin-top: 0.5rem;">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A empresa possui capacidade interna para implementação da proposta.
                                </label>
                            </div>
                        </div>
                        <div
                            style="margin-left: 1rem; border: 1px solid black; padding: 5px; width: 40rem; border-radius: 10px; margin-top: 0.5rem;">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A implementação da proposta será rentável à empresa.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-content: center; justify-content: center; margin-top: 1rem;">
                        <div style="display: flex;align-items: center;width: fit-content;flex-flow: column;">
                            <strong> Parecer do Responsável </strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel !== 3" -->
                            <select v-model="parecer_responsavel" class="form-select"
                                @change="atualizarPCM('parecer_responsavel', parecer_responsavel)"
                                style="margin-left: 0.5rem; margin-top: 0.5rem; text-align: center" :style="{
                                    color: parecer_responsavel == 'Proposta viável' ? 'green' : 'red',
                                }">
                                <option style="color: green">Proposta viável</option>
                                <option style="color: red">Proposta inviável</option>
                            </select>
                        </div>
                        <div
                            style="display: flex;align-items: center;width: fit-content;margin-left: 1rem;flex-flow: column;">
                            <strong> Nome </strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel !== 3" -->
                            <select class="form-select"
                                style="margin-left: 0.5rem; width: 13rem; margin-top: 0.5rem; text-align: center"
                                v-model="responsavel_id" @change="atualizarPCM('responsavel_id', responsavel_id)">
                                <option v-for="item in usuarios" :key="item.id" :value="item.id">
                                    {{ nomeEsobrenome(item.nomeCompleto) }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="input-group" style="margin-top: 1rem; padding-inline: 10px">
                        <span class="input-group-text" style="width: 13rem"><b>Justificativa:</b>
                        </span>
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel !== 3"  -->
                        <textarea v-model="responsavel_justificativa" @focusout=" atualizarPCM('responsavel_justificativa', responsavel_justificativa)
                            " class="form-control"></textarea>
                    </div>
                </div>

                <div style="border: 1px solid black;padding: 5px;border-radius: 10px;margin-top: 1rem;">
                    <div style="display: flex; align-content: center; justify-content: center">
                        <div style="display: flex; align-items: center; width: 10rem; flex-flow: column">
                            <strong> Meio da mudança </strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <select v-model="meio_mudanca" @change="atualizarPCM('meio_mudanca', meio_mudanca)"
                                class="form-select" style="margin-top: 0.5rem;text-align: center">
                                <option>Plano de Ação</option>
                                <option>Projeto</option>
                            </select>
                        </div>
                        <div
                            style="display: flex; align-items: center; width: 15rem; flex-flow: column; margin-left: 2rem;">
                            <strong>{{ meio_mudanca == 'Projeto' ? 'Projeto associado' : 'Plano de ação associado'
                                }}</strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <select class="form-select" v-model="planoAcao_ou_Projeto_id"
                                @change="atualizarPCM(meio_mudanca == 'Projeto' ? 'projeto_id' : 'planoAcao_id', planoAcao_ou_Projeto_id)"
                                style="margin-top: 0.5rem;text-align: left">
                                <option v-for="item in (meio_mudanca == 'Projeto' ? projetosSemPCM : planoDeAcaoSemPCM)"
                                    :key="item.id" :value="item.id">{{ item.nome }}</option>
                            </select>
                        </div>
                        <div
                            style="  display: flex;  align-items: center;  width: fit-content;  margin-left: 2rem;  flex-flow: column;">
                            <strong> Necessidade de Cadastro no Omie? </strong>
                            <div style="display: flex; margin-top: 0.5rem">
                                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                <input type="radio" class="btn-check" name="cadastroOmie" id="omieSim"
                                    autocomplete="off" v-model="cadastro_omie"
                                    @change="atualizarPCM('cadastro_omie', cadastro_omie)" value="1" />
                                <label class="btn" for="omieSim">Sim</label>

                                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                <input type="radio" class="btn-check" name="cadastroOmie" id="omieNão"
                                    autocomplete="off" v-model="cadastro_omie"
                                    @change="atualizarPCM('cadastro_omie', cadastro_omie)" value="0" />
                                <label class="btn" for="omieNão">Não</label>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex;align-content: center;justify-content: center;margin-top: 1rem;">
                        <div style="display: flex;align-items: center;margin-left: 1rem;flex-flow: column;">
                            <strong>Responsável pelo cadastro no sistema</strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <select class="form-select"
                                style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem; text-align: center"
                                v-model="responsavelCadastro_id"
                                @change="atualizarPCM('responsavelCadastro_id', responsavelCadastro_id)">
                                <option v-for="item in usuarios" :key="item.id" :value="item.id">
                                    {{ nomeEsobrenome(item.nomeCompleto) }}
                                </option>
                            </select>
                        </div>
                        <div
                            style=" display: flex; align-items: center; width: fit-content;  margin-left: 1rem;  flex-flow: column; ">
                            <strong> Data </strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <input type="date" class="form-control"
                                style="width: 9rem; margin-left: 0.5rem; text-align: center" v-model="dtCadastro"
                                @change="atualizarPCM('dtCadastro', dtCadastro)" />
                        </div>
                        <div
                            style="  display: flex; align-items: center; width: fit-content; margin-left: 1rem; flex-flow: column;">
                            <strong>Código</strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <input type="text" v-model="codigo" @change="atualizarPCM('codigo', codigo)"
                                class="form-control" style="width: 15rem; margin-left: 0.5rem; text-align: center" />
                        </div>

                        <div
                            style="display: flex;align-items: center;width: fit-content;margin-left: 1rem;flex-flow: column;">
                            <strong>Nome</strong>
                            <input v-model="nome" @focusout="atualizarPCM('nome', nome)" type="text"
                                class="form-control" style="width: 15rem; margin-left: 0.5rem; text-align: center" />
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br /><br /><br />
</template>

<script>
// import { permissoes } from '../../services/api';
import { Money3Component } from "v-money3";
import api from '../../services/api'


export default {
    name: "VisualizaçãoCriaçãoPCM",
    components: { money3: Money3Component },

    data() {
        return {
            planoAcao_ou_Projeto_id: null,

            tipo: localStorage.getItem('Tipo'),

            projetosSemPCM: null,
            planoDeAcaoSemPCM: null,
            idUsuario: localStorage.getItem('id'),
            idPCM: localStorage.getItem("idPCM"),
            permissoes: this.getPermissoes(),

            permissaoCusto: false,
            codigo: "PCM - Nº 99999",
            finalidade: "",
            area: "",
            setor_id: 0,
            nome: "",
            dtInicio: null,
            descricao_problema: null,
            possivel_solucao: null,
            proposito_mudanca: null,
            dtLimiteImplementacao: null,
            solicitante_id: 0,
            solicitante_nome: "",
            estimativa_custo: 0,
            custo_justificativa: "",
            parecer_responsavel: "",
            responsavel_id: 0,
            responsavel_nome: "",
            responsavel_justificativa: null,
            meio_mudanca: null,
            cadastro_omie: null,

            responsavelCadastro_id: null,
            responsavelCadastro_nome: null,
            dtCadastro: null,
            codigo_cadastro: null,

            impacto_viabilidade: [
                {
                    "id": 1,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'Afetará a documentação de produtos já existentes? (B.O.M, Roteiro de Produção, Esquema elétrico, Estrutura, etc.)'
                },
                {
                    "id": 6,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'O produto a ser alterado/criado possui ou deve possuir certificação? Se positivo, comunicar mudança à certificadora e aguardar a autorização da mesma.'
                },
            ],
            setores: '',
            usuarios: null,


            teste: "teste",

            config: {
                masked: false,
                prefix: "R$ ",
                thousands: ".",
                decimal: ",",
                precision: 2,
            },
        };
    },

    created() {
        this.getSetores(),
        this.getProjetosePlanoSemPCM(),
        this.tipo = localStorage.getItem('Tipo')
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

        getProjetosePlanoSemPCM() {
            api.get(`planoacao-projeto/listar/sem-pcm`)
                .then((response) => {
                    this.projetosSemPCM = response.data.projeto
                    this.planoDeAcaoSemPCM = response.data.planoAcao
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        objetoSemIndiceDescricao(item) {
            if (item) {
                const { indice, descricao, ...resto } = item;
                indice
                descricao
                return [resto];
            }
        },

        nomeEsobrenome(nome) {
            const nomeESobrenome = nome.split(" ");

            if (nomeESobrenome.length >= 2) {
                const primeiroNome = nomeESobrenome[0];
                const segundoNome = nomeESobrenome[1];

                if (segundoNome.length <= 3 || segundoNome == "Paula") {
                    return `${primeiroNome} ${segundoNome} ${nomeESobrenome[2] || ""}`;
                } else {
                    return `${primeiroNome} ${segundoNome}`;
                }
            } else {
                return nome;
            }
        },

        atualizarPCM(itemEditado, valor) {
            api.put(`pcm/atualizar/${this.idPCM}`, {
                [itemEditado]: valor,
            })
                .then(() => { })
                .catch((error) => {
                    console.error(error);
                });
        },

        getSetores() {
            api.get(`usuario`, {

            })
                .then((response) => {
                    this.usuarios = response.data;
                    this.usuarios = this.usuarios.map((item) => ({
                        id: item.id,
                        nomeCompleto: item.name,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });

            // api.get('/setor')
            //     .then(response => {
            //         this.setores = response.data;
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

            api.get(`setor`, {

            })
                .then((response) => {
                    this.setores = response.data
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        // getPCM() {
        //     api.get(`pcm/buscar/${this.idPCM}`, {})
        //         .then(response => {
        //             this.codigo = response.data.codigo;
        //             this.finalidade = response.data.finalidade;
        //             this.area = response.data.area;
        //             this.setor_id = response.data.setor_id;
        //             this.nome = response.data.nome;
        //             this.dtInicio = response.data.dtInicio;
        //             this.descricao_problema = response.data.descricao_problema;
        //             this.possivel_solucao = response.data.possivel_solucao;
        //             this.proposito_mudanca = response.data.proposito_mudanca;
        //             this.dtLimiteImplementacao = response.data.dtLimiteImplementacao;
        //             this.solicitante_id = response.data.solicitante_id;
        //             this.solicitante_nome = response.data.solicitante_nome;
        //             this.estimativa_custo = response.data.estimativa_custo;
        //             this.custo_justificativa = response.data.custo_justificativa;
        //             this.parecer_responsavel = response.data.parecer_responsavel;
        //             this.responsavel_id = response.data.responsavel_id;
        //             this.responsavel_nome = response.data.responsavel_nome;
        //             this.responsavel_justificativa = response.data.responsavel_justificativa;
        //             this.meio_mudanca = response.data.meio_mudanca;
        //             this.cadastro_omie = response.data.cadastro_omie;
        //             this.impacto_viabilidade = response.data.impacto_viabilidade
        //             this.responsavelCadastro_id = response.data.responsavelCadastro_id;
        //             this.responsavelCadastro_nome = response.data.responsavelCadastro_nome;
        //             this.dtCadastro = response.data.dtCadastro;
        //             this.codigo_cadastro = response.data.codigo_cadastro;

        //             this.planoAcao_ou_Projeto_id = response.data.id_associacao;
        //             if (response.data.projeto == 1) {
        //                 this.projetosSemPCM.push({
        //                     "id": response.data.id_associacao, 
        //                     "nome": response.data.nome_associacao
        //                 })
        //             }

        //             if (response.data.projeto == 0) {
        //                 this.planoDeAcaoSemPCM.push({
        //                     "id": response.data.id_associacao, 
        //                     "nome": response.data.nome_associacao
        //                 })
        //             }

        //         })

        //         .catch((error) => {
        //             console.error(error);
        //         });
        // },

        verPCMs() {
            this.$router.push({ name: "ControlePCM" });
        },
    },
};
</script>

<style scoped>
@media (max-width: 1800px) {
    .container {
        margin-left: 13rem;
        max-width: 1100px;
    }

    .botaoHome {
        margin-left: 200px !important;
    }
}

.botaoHome {
    font-size: 30px;
    margin-left: 250px;
    cursor: pointer;
    position: absolute;
}
</style>
