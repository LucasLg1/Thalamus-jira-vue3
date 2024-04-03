import axios from "axios";

const prodURL = 'http://192.168.0.5:8000/api';
const baseURL = 'http://192.168.0.6:8082';
const devURL = 'http://192.168.0.6:8000/api';
const permissoes = [
  {
    "usuario_id": 4,
    "nivel": 3,
    "nome": "Lucas Lima Gonçalves"
  },
  {
    "usuario_id": 3,
    "nivel": 1,
    "nome": "Mariana Mozzer Arantes"
  }
];


const api = axios.create({
  baseURL: baseURL,
  devURL: devURL,
});

//local de armazenamento das fotos de visitante e colaborador
export const urlFoto = {
  caminhoFoto: `http://192.168.0.5:8000/storage/`,
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

export { devURL };
export { prodURL };
export { permissoes }

export default api;