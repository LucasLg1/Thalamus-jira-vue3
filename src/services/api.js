import axios from "axios";

const api = axios.create({
  baseURL:  process.env.VUE_APP_ROOT_API,
  devURL: process.env.VUE_APP_ROOT_DEV,
});


const permissoes = [
  {
    "usuario_id": 12,
    "nivel": 1,
    "nome": "Alessandro José Ribeiro da Silveira"
  },
  {
    "usuario_id": 6,
    "nivel": 1,
    "nome": "Artur Wilson Dias"
  },
  {
    "usuario_id": 2,
    "nivel": 1,
    "nome": "Brenda Larissa Alves Teodoro"
  },
  {
    "usuario_id": 8,
    "nivel": 1,
    "nome": "Carlos Alexandre Lourenço Jardim"
  },
  {
    "usuario_id": 7,
    "nivel": 3,
    "nome": "Darley Wilson Dias"
  },
  {
    "usuario_id": 14,
    "nivel": 3,
    "nome": "Emerson Mozzer"
  },
  {
    "usuario_id": 11,
    "nivel": 1,
    "nome": "Fábio Henrique Resende Vieira"
  },
  {
    "usuario_id": 10,
    "nivel": 1,
    "nome": "Isabela Resende Lourenço"
  },
  {
    "usuario_id": 13,
    "nivel": 1,
    "nome": "Leyrislayne Santos do Nascimento"
  },
  {
    "usuario_id": 4,
    "nivel": 3,
    "nome": "Lucas Lima Gonçalves"
  },
  {
    "usuario_id": 3,
    "nivel": 2,
    "nome": "Mariana Mozzer Arantes"
  }
];

//local de armazenamento das fotos de visitante e colaborador
export const urlFoto = {
  caminhoFoto: process.env.VUE_APP_ROOT_STORAGE,
};

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { permissoes}

export default api;