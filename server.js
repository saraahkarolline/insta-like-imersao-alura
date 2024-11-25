// Importa a biblioteca Express.js para criar o servidor web.
import express from 'express';
import routes from './src/routes/postsRoutes.js';


// Cria uma instância do aplicativo Express.
const app = express();
app.use(express.static("uploads"));
routes(app);
// Inicia o servidor na porta 3000 e imprime uma mensagem no console.
app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000...'); // Melhora a mensagem para indicar a porta
});



// function buscaPostID(id){
//     return posts.findIndex((post)=>{
//         return post.id === Number(id);
//     });
// };

// app.get('/posts/:id',(req, res) => {
//     const index  = buscaPostID(req.params.id);
//     res.status(200).json(posts[index]);
// });


// console.log(process.env.STRING_CONEXAO);
// const posts = [
//     {
//       id: 1,
//       descricao: 'Uma foto',
//       imagem: 'https://placecats.com/millie/300/150'
//     },
//     {
//       id: 2,
//       descricao: 'Gatinho fofo',
//       imagem: 'https://placecats.com/meow/200/100'
//     },
//     {
//       id: 3,
//       descricao: 'Gato brincalhão',
//       imagem: 'https://placecats.com/fuzzy/350/200'
//     },
//     {
//       id: 4,
//       descricao: 'Gato dormindo',
//       imagem: 'https://placecats.com/sleepy/400/250'
//     },
//     {
//       id: 5,
//       descricao: 'Olhos azuis',
//       imagem: 'https://placecats.com/blue/300/150'
//     },
//     {
//       id: 6,
//       descricao: 'Gato de botas',
//       imagem: 'https://placecats.com/boots/250/125'
//     }
//   ];