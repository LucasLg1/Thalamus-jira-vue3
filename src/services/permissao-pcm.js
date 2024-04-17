// PermissoesService.js
import api from './api'; // Supondo que você tenha um módulo API para fazer chamadas à API

export function getPermissoes() {
    return Promise.all([
        api.get('grupo/2/usuarios'),
        api.get('grupo/3/usuarios'),
        api.get('grupo/4/usuarios')
    ]).then(([aprovadores, criadores, leitores]) => {
        var mergedArray = [
            ...aprovadores.data.map(item => ({
                "usuario_id": item.id,
                "nivel": 3,
                "nome": item.name
            })),
            ...criadores.data.map(item => ({
                "usuario_id": item.id,
                "nivel": 2,
                "nome": item.name
            })),
            ...leitores.data.map(item => ({
                "usuario_id": item.id,
                "nivel": 1,
                "nome": item.name
            }))
        ];
        
        const usuariosMap = {};
        mergedArray.forEach(usuario => {
            const { usuario_id, nivel } = usuario;
            if (!(usuario_id in usuariosMap) || nivel > usuariosMap[usuario_id].nivel) {
                usuariosMap[usuario_id] = usuario;
            }
        });
        
        return Object.values(usuariosMap);
    });
}
