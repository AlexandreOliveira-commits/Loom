const express = require('express');
const cors = require('cors');

const conexao = require('./dbconfig');

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// ROTA DE CADASTRO
// =========================
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


// =========================
// ROTA DE LOGIN
// =========================
app.post('/Login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res.status(400).json({
            mensagem: 'Preencha email e senha.'
        });

    }

    const sql = `
        SELECT *
        FROM usuarios
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

            if (resultado.length === 0) {

                return res.status(401).json({
                    mensagem: 'Email ou senha inválidos.'
                });

            }

            const usuario = resultado[0];

            res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                usuario: usuario
            });

        }
    );

});


// =========================
// BUSCAR USUÁRIO PELO ID
// =========================
app.get('/usuarios/:id', (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT id, nome, email
        FROM usuarios
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [id],
        (erro, resultado) => {

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

            res.status(200).json(resultado[0]);

        }
    );

});

// ==========================================
// BUSCAR PERFIL
// ==========================================

app.get('/Perfil/:id', (req, res) => {

  const id = req.params.id;

  const sql = `
    SELECT id, nome, email
    FROM usuarios
    WHERE id = ?
  `;

  conexao.query(
    sql,
    [id],
    (erro, resultado) => {

      if (erro) {

        console.log(erro);

        return res.status(500).json({
          mensagem: 'Erro ao buscar perfil.'
        });

      }


      if (resultado.length === 0) {

        return res.status(404).json({
          mensagem: 'Usuário não encontrado.'
        });

      }


      res.status(200).json(
        resultado[0]
      );

    }
  );

});

// =========================
// VER AVALIAÇÕES
// =========================
app.get('/VerAvaliacoes', (req, res) => {

    const sql = `
        SELECT
            id_postagem,
            nota,
            comentario,
            data_postagem
        FROM postagens
        ORDER BY data_postagem DESC
    `;

    conexao.query(
        sql,
        (erro, resultados) => {

            if (erro) {
                console.log(
                    'Erro ao buscar avaliações:',
                    erro
                );

                return res.status(500).json({
                    mensagem: 'Erro ao buscar avaliações.'
                });
            }

            res.status(200).json(resultados);
        }
    );
});


// =========================
// FAZER AVALIAÇÃO
// =========================
app.post('/FazerAvaliacao', (req, res) => {

    const { nota, comentario } = req.body;

    if (!nota || !comentario) {

        return res.status(400).json({
            mensagem: 'Preencha a nota e o comentário.'
        });

    }

    const sql = `
        INSERT INTO postagens
        (nota, comentario)
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [nota, comentario],
        (erro, resultado) => {

            if (erro) {

                console.log(erro);

                return res.status(500).json({
                    mensagem: 'Erro ao registrar avaliação'
                });

            }

            res.status(201).json({
                mensagem: 'Avaliação cadastrada com sucesso!',
                ok: true
            });

        }
    );

});


// =========================
// INICIAR SERVIDOR
// =========================
app.listen(3000, () => {

    console.log('Servidor rodando na porta 3000');

});