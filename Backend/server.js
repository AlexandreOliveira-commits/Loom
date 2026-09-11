const express = require('express');
const cors = require('cors');

const conexao = require('./dbconfig');

const app = express();

app.use(cors());
app.use(express.json());


// ROTA DE CADASTRO
app.post('/Cadastro', (req, res) => {

    const { nome, email, senha } = req.body;

    const sql = `
        INSERT INTO usuarios
        (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, email, senha],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao cadastrar usuário'
                });
            }

            res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!'
            });

        }
    );

});


// ROTA DE LOGIN
app.post('/Login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Preencha email e senha.'
        });
    }

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? AND senha = ?
    `;

    conexao.query(
        sql,
        [email, senha],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao realizar login.'
                });
            }

            // nenhum usuário encontrado
            if (resultado.length === 0) {

                return res.status(401).json({
                    mensagem: 'Email ou senha inválidos.'
                });

            }

            // usuário encontrado
            const usuario = resultado[0];

            res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                usuario: usuario
            });

        }
    );

});

app.get('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT id, nome, email
        FROM usuarios
        WHERE id = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {

        if (erro) {
            console.log(erro);

            return res.status(500).json({
                mensagem: 'Erro ao buscar usuário'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado'
            });
        }

        res.json(resultado[0]);
    });
}); 
app.get('/verAvaliacao', (req, res) => {
    const sql = `
        SELECT * FROM postagens
    `;
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro);
            return res.status(500).json({
                mensagem: 'Erro ao buscar avaliações'
            });
        }
        res.status(200).json({
            mensagem: 'Avaliações encontradas com sucesso!',
            avaliacoes: resultado
        });
    });
});
app.post('/FazerAvaliacao', (req, res)=>{
    const {nota, setNota} = req.body;
    const {comentario, setComentario} = req.body;

    const sql = `
    INSERT INTO postagens 
    (nota, comentario)
    VALUES(?,?)
    `;
    conexao.query(
        sql,
        [nota, comentario],
        (erro, resultado)=>{
            if(erro){
                console.log(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao registrar postagem'
                });
            }else{
                res.status(201).json({
                    mensagem: 'Postagem Cadastrada com sucesso!',
                    ok:true
                });
            }
            
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});