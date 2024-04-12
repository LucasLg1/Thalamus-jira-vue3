import { createRouter, createWebHashHistory } from 'vue-router'

//Projetos
import ControleDeProjetos from '../views/Projetos/ControleDeProjetos.vue'

//Backlogs
import PainelKanbanView from '../views/Projetos/PainelKanban'
import SprintsView from '../views/Projetos/SprintsView'
import SprintsViewOnly from '@/views/Projetos/SprintsView-Only.vue'
import PainelKanbanViewOnlyVue from '@/views/Projetos/PainelKanban-ViewOnly.vue'

//Login
import LoginViewVue from '@/views/Login/LoginView.vue'

//Home
// import HomeView from '@/views/Home/HomeView.vue'

//Senha
import EsqueceuSenhaView from "@/views/Senha/EsqueceuSenhaView"
import ValidarSenhaView from "@/views/Senha/ValidarSenhaView"
import AlterarSenhaView from "@/views/Senha/AlterarSenhaView"
import ConfiguracaoUsuario from '@/views/Senha/ConfiguracaoUsuario.vue'
import axios from 'axios'

//PCM
import VisualizaçãoCriaçãoPCM from '@/views/PCM/VisualizaçãoCriaçãoPCM.vue'
import ControlePCM from '@/views/PCM/ControlePCM'
import LeituraPlanodeAção from '@/views/PA/LeituraPlanodeAção.vue'
// import CadastroPCM from '@/views/PCM/CadastroPCM.vue'

//Plano de Ação
import ControledePlanodeAção from '@/views/PA/ControleDePlanodeAção.vue'
import VisualizaçãoPlanodeAção from '@/views/PA/VisualizaçãoPlanodeAção.vue'

//Programas
import controleProgramas from '@/views/Programas/ControleProgramas'
import homeGestãoDeProjetos from '../views/Home/HomeGestãoDeProjetos.vue'
//Protocolos
import ControleDeProtocolo from '@/views/Protocolo/controleDeProtocolo.vue'
import visualizaçãoProtocolo from '@/views/Protocolo/visualizaçãoProtocolo.vue'
import GestaoDeTarefas from '@/views/Protocolo/gestaoDeTarefas.vue'
import CriarPCM from '@/views/PCM/CriarPCM.vue'


function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next();
  }
  else {
    next('/');
  }
}

function guardMyroute2(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {

    var idUsuario = localStorage.getItem('id');
    var projetos = null
    var idProjeto = sessionStorage.getItem('idProjeto')
    axios.get(`http://192.168.0.5:8000/api/projeto/usuario/${idUsuario}`, {
    })
      .then((response) => {
        projetos = response.data;

        if ((projetos.find(projeto => projeto.id == idProjeto).permissao).find(pessoa => pessoa.usuario_id == idUsuario).nivel == 2) {
          next();
        } else {
          next('/projetos');
        }
      })
  }
  else {
    next('/');
  }
}

function guardMyroute3(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('LoggedUser'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {

    var idUsuario = localStorage.getItem('id');
    var planos = null
    var idProjeto = sessionStorage.getItem('idProjeto')
    axios.get(`http://192.168.0.5:8000/api/planoAcao/listar`, {
    })
      .then((response) => {
        planos = response.data;

        if ((planos.find(projeto => projeto.id == idProjeto).permissao).find(pessoa => pessoa.usuario_id == idUsuario).nivel == 2) {
          next();
        } else {
          next('/PA/Controle');
        }
      })
  }
  else {
    next('/');
  }
}


const routes = [

  //Protocolos
  {
    path: '/protocolos',
    name: 'controleProtocolos',
    component: ControleDeProtocolo,
    beforeEnter: guardMyroute,
  },
  {
    path: '/protocolo',
    name: 'visualizaçãoProtocolo',
    component: visualizaçãoProtocolo,
    beforeEnter: guardMyroute,
  },
  {
    path: '/gestaoTarefas',
    name: 'gestaoTarefas',
    component: GestaoDeTarefas,
    beforeEnter: guardMyroute,
  },

  //Login
  {
    path: '/',
    name: 'login',
    component: LoginViewVue,
    meta: {
      hideMenu: true
    },


  },

  //Home
  {
    path: '/home',
    name: 'home',
    component: homeGestãoDeProjetos,
    beforeEnter: guardMyroute,
  },

  //PCM
  {
    path: '/PCM',
    name: 'PCM',
    component: VisualizaçãoCriaçãoPCM,
    beforeEnter: guardMyroute,
  },

  {
    path: '/PCM/Controle',
    name: 'ControlePCM',
    component: ControlePCM,
    beforeEnter: guardMyroute,
  },
  {
    path: '/PCM/Criar',
    name: 'CriarPCM',
    component: CriarPCM,
    beforeEnter: guardMyroute,
  },


  //Plano de Ação

  {
    path: '/PA/Controle',
    name: 'ControlePA',
    component: ControledePlanodeAção,
    beforeEnter: guardMyroute,
  },

  {
    path: '/PA',
    name: 'PA',
    beforeEnter: guardMyroute3, guardMyroute,
    component: VisualizaçãoPlanodeAção,
  },

  {
    path: '/PA/Vo',
    name: 'PAVo',
    component: LeituraPlanodeAção,
    beforeEnter: guardMyroute,
  },

  

  //programas

  {
    path: '/Programas/controle',
    name: 'controleProgramas',
    component: controleProgramas,
    beforeEnter: guardMyroute,
  },

  //Projetos
  {
    path: '/sprints',
    name: 'sprints',
    component: SprintsView,
    props: { sharedVariable: 'backlogs' },
    beforeEnter: guardMyroute2, guardMyroute
  },
  {
    path: '/sprintsVo',
    name: 'sprintsVo',
    component: SprintsViewOnly,
    props: { sharedVariable: 'backlogs' },
    beforeEnter: guardMyroute,
  },
  {
    path: '/projetos',
    name: 'ControleDeProjetos',
    component: ControleDeProjetos,
    beforeEnter: guardMyroute,

  },

  {
    path: '/painel',
    name: 'painel',
    component: PainelKanbanView,
    beforeEnter: guardMyroute2, guardMyroute
  },

  {
    path: '/painelVo',
    name: 'painelVo',
    component: PainelKanbanViewOnlyVue,
    beforeEnter: guardMyroute,

  },

  // Senha
  {
    path: '/alterarSenha',
    name: 'AlterarSenha',
    component: AlterarSenhaView,
    beforeEnter: guardMyroute,

  },

  {
    path: '/esqueceuSenha',
    name: 'EsqueceuSenha',
    component: EsqueceuSenhaView,
    meta: {
      hideMenu: true
    }

  },

  {
    path: '/validarSenha',
    name: 'ValidarSenha',
    component: ValidarSenhaView,
    meta: {
      hideMenu: true
    },

  },
  {
    path: '/configuracao',
    name: 'Configuracao',
    component: ConfiguracaoUsuario,
    beforeEnter: guardMyroute,
  },


  {
    path: '/:pathMatch(.*)*', redirect: '/'
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
