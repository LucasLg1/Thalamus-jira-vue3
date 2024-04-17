import api from './api';

export async function consultarSetores() {
    try {
        const responseUsuarios = await api.get(`usuario`);
        const usuarios = responseUsuarios.data.map(item => ({
            id: item.id,
            nomeCompleto: item.name,
        }));

        const responseSetores = await api.get(`setor`);
        const setores = responseSetores.data.map(item => ({
            id: item.id,
            nome: item.nome,
        }));

        return { usuarios, setores };
    } catch (error) {
        console.error(error);
        throw error; 
    }
}