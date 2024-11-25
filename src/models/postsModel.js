// Importa a função para conectar ao banco de dados.  O arquivo dbConfig.js provavelmente contém as credenciais e a lógica de conexão.
import 'dotenv/config'; //google cloud
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente.  A espera (`await`) é necessária porque `conectarAoBanco` é uma função assíncrona.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'.
    const db = conexao.db('imersao-instabytes');
    // Seleciona a coleção 'posts'.
    const colecao = db.collection('posts');
    // Busca todos os documentos da coleção e retorna como um array.
    return colecao.find().toArray();
};
export async function enviaPost(novoPost) {
    //  Selecionao banco de dados 'imersao-instabytes'.
    const db = conexao.db('imersao-instabytes');
    // Seleciona a coleção 'posts'.
    const colecao = db.collection('posts');
    // Envia o novo post
    return colecao.insertOne(novoPost);
};

export async function atualizaPost(id, atualizaNovoPost) {
    //  Selecionao banco de dados 'imersao-instabytes'.
    const db = conexao.db('imersao-instabytes');
    // Seleciona a coleção 'posts'.
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id);
    // Envia o novo post
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: atualizaNovoPost});
};