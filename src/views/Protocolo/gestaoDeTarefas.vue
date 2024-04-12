<template>
    <br><br><br>
    <div
        style="width: 100%;margin-top: 1rem; justify-content: space-between; display: flex; margin-bottom: none; text-align: center;
        border-bottom: 2px solid rgb(0, 0, 0); align-items: center; position: fixed; background-color: #FAF9F6; z-index: 1;">

        <i @click="verProjetos" style="font-size: 30px; margin-left: 2rem; cursor: pointer;"
            class="fa-solid fa-house-chimney botaoAdicionarSprint" :title="'Ir para tela de protocolos'"></i>

        <i @click="verProjetos" class="fa-solid fa-house-chimney botaoAdicionarSprint botaoHome"
            :title="'Ir para tela de protocolos'"></i>

        <h2 style="margin-left: 10rem;"><b>Gestão de Tarefas</b></h2>

        <i style="font-size: 30px; margin-right: 3rem; cursor: pointer; visibility: hidden;"
            class="bi bi-kanban botaoAdicionarSprint"></i>
    </div>
    <br><br><br><br>
    <div style="padding: 1rem;" class="container">
        <div
            style="border: 1px solid black; border-top-left-radius: 15px; border-top-right-radius: 15px; background-color: rgb(255, 255, 255); padding: 0.5rem; padding-bottom: 0rem; width: 100%; ">
            <div class="d-flex mb-3" style="display: flex; justify-content: center; align-content: center">

                <div class="p-2">
                    <div style="text-align: center;width: 7rem">
                        <strong>
                            Origem
                        </strong>
                        <select class="form-select" style="border: 1px solid black;">
                            <option>Todos</option>
                        </select>
                    </div>
                </div>
                <div class="p-2">
                    <div style="text-align: center;width: 10rem; margin-left: 1rem;">
                        <strong>
                            Responsável
                        </strong>
                        <select class="form-select" style="text-align: center; border: 1px solid black;">
                            <option>Lucas Lima</option>
                        </select>
                    </div>
                </div>
                <div class="ms-auto p-2" style="align-content: center;">
                    <button type="button" class="btn btn-outline-dark">
                        Filtrar
                    </button>
                </div>
            </div>
        </div>
        <div
            style="border: 1px solid black; border-top: 0px ;border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; background-color: rgb(255, 255, 255);margin-bottom: 1rem; padding: 0.5rem; width: 100%;">

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" style="width: 1rem;"></th>
                        <th scope="col">Origem</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Responsável</th>
                        <th scope="col">Fim Previsto</th>
                        <th scope="col">Fim Real</th>
                        <th scope="col" style="width: 17%;">Progresso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="text-align: center;" v-for="item in tarefas" :key="item" @click="abrirComentario(item)">
                        <td style="vertical-align: middle">
                            <i style="font-size: 25px;" :class="item.icone"></i>
                        </td>
                        <td style="vertical-align: middle">{{ item.origem }}</td>
                        <td style="vertical-align: middle; text-align: left;">{{ item.descricao }}</td>
                        <td style="vertical-align: middle">{{ item.responsavel }}</td>
                        <td style="vertical-align: middle">{{ item.fimPrevisto }}</td>
                        <td style="vertical-align: middle">{{ item.fimReal }}</td>
                        <td style="vertical-align: middle">
                            <v-progress-linear v-model="item.progresso"
                                :color="(item.status == 'Concluído') ? '#03A727' : (item.status == 'Em andamento') ? '#3575D2' : (item.status == 'Atrasado') ? '#FF0000' : (item.status == 'Concluído c/ atraso') ? '#D2E21B' : '#F9A825'"
                                height="35" style="border: 1px solid black; border-radius: 10px;">
                                <template v-slot>
                                    <span :style="{ 'color': (item.status == 'Concluído') ? 'white' : 'black' }">{{
                                        item.status }}</span>
                                </template>
                            </v-progress-linear>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
            </div>

        </div>
    </div>

    <!-- MODAL EDITAR BACKLOG-->
    <div class="modal-mask" v-if="showComentarioTarefa" @click="fecharModalFora">
        <div style="height: max-content; width: 50rem; background-color: white; padding: 1rem; border-radius: 5px;">

            <div style="width: 100%;">
                <h3 style="text-align: center; margin: 0;">Tarefa - 5 (TNC2424)</h3>
            </div>

            <div
                style="border: 1px solid black; border-radius: 5px; height: 20rem; margin: 1rem; padding-inline: 3rem;">

                <div style="margin: 1rem;">
                    <v-banner stacked style="border: 2px solid blue; border-radius: 10px" color="black" lines="two">
                        <template v-slot:prepend>
                            <img src="../../../public/img/IMG_2731.png" width="50" height="50">
                        </template>

                        <v-banner-text>
                            Devido a mudanças no escopo da planilha, solicitadas pelo Paulo. será necessário re-pactuar
                            o
                            prazo
                            de entrega.
                        </v-banner-text>

                        <template v-slot:actions>
                            25/03/2024 às 13:56h
                        </template>
                    </v-banner>
                    <br>
                    <v-banner stacked style="border: 2px solid green; border-radius: 10px;" color="black" lines="two">
                        <template v-slot:prepend>
                            <img src="../../../public/img/IMG_2717.png" width="50" height="50">
                        </template>

                        <v-banner-text>
                            Alinhamos sobre o novo prazo na reunião de sexta.
                        </v-banner-text>

                        <template v-slot:actions>
                            25/03/2024 às 15:44h
                        </template>
                    </v-banner>
                </div>

            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Escreva um comentário..."
                    style="border: 1px solid black;">
                <button class="btn btn-outline-info" style="border: 1px solid black;" type="button"><i
                        class="bi bi-send" style="color: black;"></i></button>
            </div>

        </div>
    </div>
    <!--END MODAL -->
</template>

<script>
// import { ref } from 'vue';
// import api from "../../services/api";

export default {

    name: "gestaoTarefas",

    data() {
        return {
            showComentarioTarefa: true,
            tarefas: [
                {
                    icone: "bi bi-people-fill",
                    origem: "RE6578",
                    descricao: "Elaborar tela de protocolo",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '01/04/2024',
                    fimReal: '01/04/2024',
                    progresso: 100,
                    status: 'Concluído'
                },
                {
                    icone: "bi bi-people-fill",
                    origem: "RE3062",
                    descricao: "Apresentar tela de protocolo",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '30/04/2024',
                    fimReal: '-',
                    progresso: 35,
                    status: 'Em andamento'
                },
                {
                    icone: "bi bi-file-earmark-excel-fill",
                    origem: "TNC2424",
                    descricao: "Criar nova planilha de suplimento",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '29/03/2024',
                    fimReal: '-',
                    progresso: 100,
                    status: 'Atrasado'
                },
                {
                    icone: "bi bi-file-earmark-excel-fill",
                    origem: "TNC2424",
                    descricao: "Elaborar treinamento de nova planilha",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '15/03/2024',
                    fimReal: '30/03/2024',
                    progresso: 100,
                    status: 'Concluído c/ atraso'
                },
                {
                    icone: "bi bi-list-nested",
                    origem: "PROJ235",
                    descricao: "Criar tela de criação de programas",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '20/03/2024',
                    fimReal: '15/03/2024',
                    progresso: 100,
                    status: 'Concluído'
                },
                {
                    icone: "bi bi-list-nested",
                    origem: "PA2982",
                    descricao: "Adaptar tela para consumo do back-end",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '05/04/2024',
                    fimReal: '-',
                    progresso: 90,
                    status: 'Em andamento'
                },
                {
                    icone: "bi bi-file-earmark-medical-fill",
                    origem: "OS3216",
                    descricao: "Realocar impressora",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '10/04/2024',
                    fimReal: '-',
                    progresso: 50,
                    status: 'Em andamento'
                },
                {
                    icone: "bi bi-file-earmark-medical-fill",
                    origem: "OS3216",
                    descricao: "Enviar impressora a manutenção",
                    responsavel: "Lucas Lima",
                    fimPrevisto: '15/04/2024',
                    fimReal: '-',
                    progresso: 30,
                    status: 'Pendente'
                }

            ],

        }
    },

    methods: {
        abrirComentario(tarefa) {
            tarefa
            this.showComentarioTarefa = true
        },

        fecharModalFora(event) {
            if (event.target.classList.contains('modal-mask')) {
                this.showComentarioTarefa = false;
            }

        },
    }
}
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

.hPoints {
    display: flex;
    border-radius: 50%;
    margin-right: 5px;
    width: 1.3rem;
    height: 1.3rem;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: rgb(78, 78, 78);
}

.botaoAdicionarSprint:hover {
    transition: 50ms linear;
    transform: scale(1.1);
}

.divFundoTabela {
    border: 1px solid black;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    margin-bottom: 2rem;
    padding: 0.5rem;
    width: 100%;
}

.divPaiTabela {
    display: flex;
    flex-flow: column;
    align-items: center;
}

.ocultar:hover {
    cursor: pointer;
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

.data:hover {
    cursor: default;
}

.data {
    text-align: right;
}

.data:disabled {
    color: black;
}


.custom-select-disabled {
    color: rgb(0, 255, 0);
}

select:disabled {
    color: black;
}

select {
    color: black;
    cursor: pointer;
}

input:disabled {
    color: black;
}

.apagar:hover {
    transform: scale(1.1);

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
    background-color: #fff;
    border-radius: 8px;
    padding: 100px;
    width: 90%;
    max-width: 1500px;
    max-height: 80%;
    overflow-y: auto;
    position: relative;
}
</style>