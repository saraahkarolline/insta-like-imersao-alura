import express from "express";
import multer from "multer";
import { listarPosts , criarPost, uploadImagem, atualizarPost} from "../controller/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});
const routes = (app) => {
        // Habilita o middleware para analisar o corpo das requisições como JSON.
    app.use(express.json());
    app.use(cors(corsOptions));
        // Define a rota GET para '/posts'.
    app.get('/posts',listarPosts);
    //Rota para criar um post
    app.post("/posts",criarPost);
    app.post("/upload",upload.single("imagem"),uploadImagem);
    app.put("/upload/:id",atualizarPost);
};



export default routes;

