<template>
    <br>
    <br><br><br>
    <div style="padding: 1rem;">
        <div class="d-flex flex-row-reverse">
            <div class="p-2" style="margin-right: 1rem;">
                <button @click="verGestaoTarefas" type="button" class="btn btn-dark">Gerenciar Tarefas</button>
            </div>
        </div>
        <div class="container"
            style="border: 1px solid black; border-radius: 15px ; background-color: rgb(255, 255, 255); margin-bottom: 1rem; padding: 0.5rem; width: 100%; ">

            <div class="col-sm-12" style="text-align: center;">
                <div style="display: flex;">

                    <div class="input-group mb-3" style="width: 20rem; position: absolute;">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" class="form-control" placeholder="Pesquisar Protocolo" aria-label="Username"
                            aria-describedby="basic-addon1">
                    </div>

                    <div style="width: 100%;">
                        <h3 style="text-align: center; margin: 0;">Protocolos</h3>
                    </div>
                    <button :title="'Adicionar Programa'" style="width: max-content; font-size: 30px;"
                        class="botaoAdicionarSprint">
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
                                <th scope="col">N°</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Data de Registro</th>
                                <th scope="col">Responsável</th>
                                <th scope="col">Setor Envolvido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="text-align: center;" @click="verProtocolo">
                                <td style="vertical-align: middle;">
                                    RE3546
                                </td>
                                <td
                                    style="vertical-align: middle; display: flex; align-items: center; justify-content: center; border: none">
                                    Alinhamento thalamus
                                </td>
                                <td style="vertical-align: middle;">
                                    Reunião
                                </td>
                                <td style="vertical-align: middle;">
                                    <!-- 
                                    {{ item.dtTermino ?
                                `${formatarDataHora(item.dtTermino).split('-')[2]}/${formatarDataHora(item.dtTermino).split('-')[1]}/${formatarDataHora(item.dtTermino).split('-')[0]}`
                                : '-' }} -->
                                    25/01/2024
                                </td>
                                <td style="vertical-align: middle;">
                                    Lucas Lima Gonçalves
                                </td>
                                <td style="vertical-align: middle;">
                                    P&D
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL NOVO PROGRAMA -->

    <div style="overflow: auto" class="modal-mask" v-if="modalNovoPrograma" @click="fecharModalFora">
        <div style="max-height: 80%; max-width: 900px ;width: 70%; padding: 3rem;" class="modal-container">

        </div>
    </div>

    <!-- END MODAL NOVO PROGRAMA -->

</template>


<script>

export default {
    name: "ControleProtocolo",

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        verGestaoTarefas(){
            this.$router.push({ name: "gestaoTarefas" })

        },
        verProtocolo() {
            this.$router.push({ name: "visualizaçãoProtocolo" })
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

.fa-solid {
    margin-left: 0rem !important;
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