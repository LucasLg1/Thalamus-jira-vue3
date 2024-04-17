<template>
    <br />
    <br /><br />
    <div
        style="width: 100%;margin-top: 1rem;justify-content: space-between;display: flex;margin-bottom: none;border-bottom: 2px solid rgb(0, 0, 0);align-items: center;position: fixed;background-color: #faf9f6;z-index: 1;">
        <i @click="voltarHome" style="font-size: 30px; margin-left: 3rem; cursor: pointer"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>

        <i @click="voltarHome" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
            :title="'Ir para tela de inicial'"></i>
        <h2 style="margin-left: 5rem;">
            <input type="text" v-model="codigo" @change="atualizarPCM('codigo', codigo)" style="text-align: center" />
        </h2>
        <i style="font-size: 30px; margin-right: 3rem; cursor: pointer; visibility: hidden"
            class="bi bi-kanban botaoAdicionarSprint" :title="'Ir para painel KanBan'"></i>
    </div>
    <br /><br /><br />

    <div class="container" style="padding: 2rem 0rem 0rem 0rem">
        <!-- <i @click="voltarHome()" style="font-size: 30px;position: absolute; cursor: pointer"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela inicial'"></i>
        <br> -->
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
                        v-model="nivel" @change="atualizarPCM('nivel', nivel)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option :hidden="tipo == 'Plano de Ação'">Estratégico</option>
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
                        v-model="tipo" @change="atualizarPCM('tipo', tipo)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option>Programa</option>
                        <option>Projeto</option>
                        <option :hidden="nivel == 'Estratégico'">Plano de Ação</option>
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
                <span class="input-group-text" :class="{ shake: disabled }" id="descricao_problema"><b>Descrição do
                        Problema:</b> </span>
                <textarea class="form-control" :class="{ shake: disabled }" v-model="descricao_problema"
                    style="height: 8rem" id="descricao_problema2"
                    @focusout="atualizarPCM('descricao_problema', descricao_problema)"></textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>
            <div class="input-group" style="margin-top: 1rem">
                <span class="input-group-text" :class="{ shake: disabled }" style="width: 13rem"
                    id="possivel_solucao"><b>Possível solução: </b>
                </span>
                <textarea class="form-control" :class="{ shake: disabled }" v-model="possivel_solucao"
                    style="height: 6rem" id="possivel_solucao2"
                    @focusout="atualizarPCM('possivel_solucao', possivel_solucao)"></textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>
            <div class="input-group" style="margin-top: 1rem;">
                <span class="input-group-text" :class="{ shake: disabled }" style="width: 13rem;"
                    id="proposito_mudanca"><b>Propósito da
                        mudança:</b>
                </span>
                <textarea class="form-control" :class="{ shake: disabled }" v-model="proposito_mudanca"
                    id="proposito_mudanca2" @focusout="atualizarPCM('proposito_mudanca', proposito_mudanca)">
            </textarea>
                <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
            </div>


            <div style=" display: flex; align-content: center; justify-content: center; margin-top: 1rem;">
                <div style="display: flex;align-items: center;width: fit-content;margin-left: 1rem;flex-flow: column;">
                    <strong>Nome do {{ tipo }}</strong>
                    <input v-model="nome" @focusout="atualizarPCM('nome', nome)" type="text" class="form-control"
                        style="width: 15rem; margin-left: 0.5rem; text-align: center" />
                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                </div>

                <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column">
                    <strong>Data limite de implementação</strong>
                    <input v-model="dtLimiteImplementacao" type="date" :class="{ shake: disabled }" id="solicitante_id2"
                        @change="atualizarPCM('dtLimiteImplementacao', dtLimiteImplementacao)" class="form-control"
                        style="width: 9rem; margin-left: 0.5rem; margin-top: 0.5rem; text-align: center" />
                    <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                </div>
                <div style="display: flex; align-items: center; margin-left: 1rem; flex-flow: column">
                    <strong>Responsável pela solicitação</strong>
                    <select class="form-select"
                        style="margin-left: 0.5rem; width: 15rem; margin-top: 0.5rem; text-align: center"
                        v-model="solicitante_id" :class="{ shake: disabled }" id="solicitante_id"
                        @change="atualizarPCM('solicitante_id', solicitante_id)">
                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                        <option v-for="item in usuarios" :key="item.id" :value="item.id">
                            {{ nomeEsobrenome(item.nomeCompleto) }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- <div style="display: flex; justify-content: right; margin-top: 0.5rem;">
                <button type="button" class="btn btn-light" @click="novoPCM()"
                    style="border: 1px solid black;">Salvar</button>
                <button type="button" class="btn btn-dark" @click="voltarHome()"
                style="margin-left: 1rem;">Cancelar</button>
            </div> -->
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
                            <tr v-for="(item, index) in impacto_viabilidade.slice(0, 2)" :key="index">
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
                                            value="true" />
                                        <label class="btn" :for="'optionSim' + index">Sim</label>
                                        <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                                        <input type="radio" class="btn-check" :name="'options' + index"
                                            :id="'optionNão' + index" autocomplete="off" v-model="item.concordo"
                                            @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"
                                            value="false" />
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
                                <th style="border: 1px solid black; border-left: none; vertical-align: middle;">
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
                    <div style="align-items: center; display: flex; margin-inline: 1rem;">
                        <div v-for="item in impacto_viabilidade.slice(2)" :key="item.id"
                            style="border: 1px solid black; padding: 5px; width: 40rem; border-radius: 10px; margin-top: 0.5rem; margin-inline: 0.5rem;">
                            <div class="form-check">
                                <input class="form-check-input"
                                    @change="atualizarPCM('impacto_viabilidade', objetoSemIndiceDescricao(item))"
                                    type="checkbox" v-model="item.concordo" :id="'pergunta' + item.id">
                                <label class="form-check-label" :for="'pergunta' + item.id">
                                    {{ item.descricao }}
                                    <!-- {{ objetoSemIndiceDescricao(item) }} -->
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
                        <!-- <div style="display: flex; align-items: center; width: 10rem; flex-flow: column">
                            <strong> Meio da mudança </strong>
                            :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1"
                            <select v-model="meio_mudanca" @change="atualizarPCM('meio_mudanca', meio_mudanca)"
                                class="form-select" style="margin-top: 0.5rem;text-align: center">
                                <option>Plano de Ação</option>
                                <option>Projeto</option>
                            </select>
                        </div> -->
                        <div
                            style="display: flex; align-items: center; width: 15rem; flex-flow: column; margin-left: 2rem;">
                            <strong>{{ tipo }} associado</strong>
                            <!-- :disabled="permissoes.find(pessoa => pessoa.usuario_id == idUsuario).nivel == 1" -->
                            <input disabled style="background-color: white; text-align: center;" type="text"
                                class="form-control" v-model="nome_associacao">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal confirmação de criação -->
    <div style="overflow: auto" class="modal-mask" v-if="modalConfirmacao" @click="fecharModalFora">
        <div style="max-height: 85%; width: 50rem; padding: 3rem; margin-bottom: 3rem; overflow: hidden; border: solid 1px black;"
            class="modal-container">
            <div>
                <div style="display: flex; justify-content: space-between">
                    <h4 class="titulo">{{ this.tipo }} submetido para aprovação!</h4>
                </div>
                <div class="modal-footer">
                    &nbsp;&nbsp;
                    <button type="button" style="background-color: rgb(0, 192, 0); border: none;"
                        class="btn btn-primary" @click="voltarHome()" data-bs-dismiss="modal">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- end modal -->
    <br /><br /><br />
</template>

<script>
// import { permissoes } from '../../services/api';
import { Money3Component } from "v-money3";
import api from '../../services/api';
import { getPermissoes } from '@/services/permissao-pcm';
import { consultarSetores } from '@/services/usuario-setor';

export default {
    name: "VisualizaçãoCriaçãoPCM",
    components: { money3: Money3Component },

    data() {
        return {
            modalConfirmacao: false,

            nome_associacao: null,
            projetosSemPCM: null,
            planoDeAcaoSemPCM: null,
            idUsuario: localStorage.getItem('id'),
            idPCM: localStorage.getItem("idPCM"),
            permissoes: this.carregarPermissoes(),

            tipo: null,
            nivel: null,
            codigo: "",
            finalidade: "",
            area: "",
            setor_id: 0,
            nome: "",
            dtInicio: new Date().toISOString().split('T')[0],
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
            disabled: false,
            codigo_cadastro: null,
            impacto_viabilidade: [
                {
                    "impactoViabilidade_id": 1,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'Afetará a documentação de produtos já existentes? (B.O.M, Roteiro de Produção, Esquema elétrico, Estrutura, etc.)'
                },
                {
                    "impactoViabilidade_id": 6,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'O produto a ser alterado/criado possui ou deve possuir certificação? Se positivo, comunicar mudança à certificadora e aguardar a autorização da mesma.'
                },
                {
                    "impactoViabilidade_id": 7,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'O cenário geral do mercado é viável à proposta.'
                },
                {
                    "impactoViabilidade_id": 8,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'A empresa possui capacidade interna para implementação da proposta.'
                },
                {
                    "impactoViabilidade_id": 9,
                    "concordo": null,
                    "justificativa": "",
                    "descricao": 'A implementação da proposta será rentável à empresa.'
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

    mounted() {
        this.getSetores(),
            this.getPCM()
    },

    methods: {
        voltarHome() {
            this.$router.push({ name: "ControlePCM" })
        },

        validarCampos() {
            var camposVazios = []
            if (!this.descricao_problema) camposVazios.push('descricao_problema');
            if (!this.possivel_solucao) camposVazios.push('possivel_solucao');
            if (!this.proposito_mudanca) camposVazios.push('proposito_mudanca');
            if (!this.solicitante_id) camposVazios.push('solicitante_id');
            return camposVazios
        },

        novoPCM() {
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

            var campoVazio = this.validarCampos()
            if (campoVazio.length !== 0) {
                campoVazio.forEach(item => {
                    document.getElementById(item).style.border = 'solid 1px red';
                    document.getElementById(item + '2').style.border = 'solid 1px red'
                    this.disabled = true
                    setTimeout(() => {
                        this.disabled = false
                    }, 1500)
                    return
                });
            } else {
                api.post(`pcm/cadastrar`, {

                    tipo: this.tipo,
                    nivel: this.nivel,
                    codigo: 'TESTE',
                    finalidade: this.finalidade,
                    area: this.area,
                    setor_id: this.setor_id,
                    nome: this.nome,

                    descricao_problema: this.descricao_problema,
                    possivel_solucao: this.possivel_solucao,
                    proposito_mudanca: this.proposito_mudanca,

                    dtLimiteImplementacao: this.dtLimiteImplementacao,
                    solicitante_id: this.solicitante_id,
                    solicitante_nome: this.solicitante_nome,
                    estimativa_custo: this.estimativa_custo,
                    custo_justificativa: this.custo_justificativa,
                    parecer_responsavel: this.parecer_responsavel,
                    responsavel_id: this.responsavel_id,
                    responsavel_nome: this.responsavel_nome,
                    responsavel_justificativa: this.responsavel_justificativa,
                    meio_mudanca: this.meio_mudanca,
                    cadastro_omie: this.cadastro_omie,
                    responsavelCadastro_id: this.responsavelCadastro_id,
                    responsavelCadastro_nome: this.responsavelCadastro_nome,
                    dtCadastro: this.dtCadastro,
                    codigo_cadastro: this.codigo_cadastro,
                    impacto_viabilidade: this.impacto_viabilidade,

                    dtInicio: this.dtInicio,

                    status: 'Aguardando Aprovação',
                    usuario_id: this.idUsuario
                })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                if (this.nivel == 'Operacional') {
                    // this.criarElemento();
                    this.modalConfirmacao = true
                }
                if (this.nivel == 'Estratégico') {
                    this.modalConfirmacao = true
                }
            }
        },

        criarElemento() {
            if (this.tipo == 'Projeto') {
                api.post(`projeto/cadastrar`, {

                    nome: this.nome,
                    dtInicio: this.dtInicio,
                    gerente_id: this.solicitante_id,
                    setor_id: this.setor_id,
                    usuario_id: this.idUsuario,
                    status: "Proposto"
                })
                    .then((response) => {
                        this.$router.push({ name: "sprints" })
                        sessionStorage.setItem('idProjeto', response.data.id)
                        sessionStorage.setItem('nomeDoProjeto', this.nome)
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } if (this.tipo == 'Plano de Ação') {
                api.post(`planoAcao/cadastrar`, {

                    nome: this.nome,
                    dtInicio: this.dtInicio,
                    gerente_id: this.solicitante_id,
                    setor_id: this.setor_id,
                    usuario_id: this.idUsuario,
                    status: "Proposto"
                })

                    .then((response) => {
                        this.$router.push({ name: "PA" })
                        sessionStorage.setItem('idProjeto', response.data.id)
                        sessionStorage.setItem('nomeDoProjeto', this.nome)
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } if (this.tipo == 'Programa') {
                api.post(`programa/cadastrar`, {
                    nome: this.nome,
                    dtInicio: this.dtInicio,
                    gerente_id: this.solicitante_id,
                    setor_id: this.setor_id,
                    usuario_id: this.idUsuario,
                    status: "Proposto"
                })
                    .then(() => {
                        this.$router.push({ name: "controleProgramas" })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
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

        async getSetores() {
            try {
                const { usuarios, setores } = await consultarSetores();
                this.usuarios = usuarios;
                this.setores = setores;
            } catch (error) {
                console.error(error);
            }
        },

        getPCM() {
            api.get(`pcm/buscar/${this.idPCM}`, {})
                .then(response => {
                    this.codigo = response.data.codigo;
                    this.finalidade = response.data.finalidade;
                    this.area = response.data.area;
                    this.setor_id = response.data.setor_id;
                    this.nome = response.data.nome;
                    this.dtInicio = response.data.dtInicio;
                    this.descricao_problema = response.data.descricao_problema;
                    this.possivel_solucao = response.data.possivel_solucao;
                    this.proposito_mudanca = response.data.proposito_mudanca;
                    this.dtLimiteImplementacao = response.data.dtLimiteImplementacao;
                    this.solicitante_id = response.data.solicitante_id;
                    this.solicitante_nome = response.data.solicitante_nome;
                    this.estimativa_custo = response.data.estimativa_custo;
                    this.custo_justificativa = response.data.custo_justificativa;
                    this.parecer_responsavel = response.data.parecer_responsavel;
                    this.responsavel_id = response.data.responsavel_id;
                    this.responsavel_nome = response.data.responsavel_nome;
                    this.responsavel_justificativa = response.data.responsavel_justificativa;
                    this.meio_mudanca = response.data.meio_mudanca;
                    this.cadastro_omie = response.data.cadastro_omie;
                    this.impacto_viabilidade = response.data.impacto_viabilidade
                    this.responsavelCadastro_id = response.data.responsavelCadastro_id;
                    this.responsavelCadastro_nome = response.data.responsavelCadastro_nome;
                    this.dtCadastro = response.data.dtCadastro;
                    this.codigo_cadastro = response.data.codigo_cadastro;
                    this.nivel = response.data.nivel,
                        this.tipo = response.data.tipo,

                        this.nome_associacao = response.data.nome_associacao;


                })

                .catch((error) => {
                    console.error(error);
                });
        },

        verPCMs() {
            this.$router.push({ name: "ControlePCM" });
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.modalConfirmacao = false;
            }
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

.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
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
