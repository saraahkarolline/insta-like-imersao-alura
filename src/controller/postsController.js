import {getTodosPosts, enviaPost, atualizaPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"; 

export async function listarPosts(req, res)  {
        // Busca todos os posts usando a função getTodosPosts.
    const posts = await getTodosPosts();
        // Envia a resposta com código de status 200 (OK) e os posts como JSON.
    res.status(200).json(posts);
}
export async function criarPost(req, res){
    const novoPost = req.body;
    try{
        const postCriado = await enviaPost(novoPost);
        res.status(200).json(postCriado);

    }catch (erro){
       console.error(erro.message);
       res.status(500).json({"Erro": "Falha na requisicao"});
    };

};

export async function uploadImagem(req, res){
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
        const postCriado = await enviaPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);

    }catch (erro){
       console.error(erro.message);
       res.status(500).json({"Erro": "Falha na requisicao"});
    };

};

export async function atualizarPost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;

    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            descricao: descricao,
            imgUrl: urlImg,
            alt: req.body.alt
        };
        const post = await atualizaPost(id, postAtualizado);
        res.status(200).json(post);

    }catch (erro){
       console.error(erro.message);
       res.status(500).json({"Erro": "Falha na requisicao"});
    };

};