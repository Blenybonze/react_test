import axios from 'axios';

//const colors = require('http://testefrontend.linearsm.com.br/api/Cores/Selecionar')
//const get = require('http://testefrontend.linearsm.com.br/api/Produtos/Selecionar');
//const insert = require('http://testefrontend.linearsm.com.br/api/Produtos/CadastrarAtualizar');
//const delet = require('http://testefrontend.linearsm.com.br/api/Produtos/Excluir');

const api = axios.create({
    baseURL: 'http://testefrontend.linearsm.com.br'
})

export default api;