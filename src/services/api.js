import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  devURL: process.env.VUE_APP_ROOT_DEV,
});

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
    console.log(permissoes)
  })
  .catch((error) => {
    console.error(error);
  });

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

export default api;
export { permissoes };