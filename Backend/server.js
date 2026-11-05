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
                mensagem: 'Usuário cadastrado com sucesso!',
                usuario: { id: resultado.insertId, nome, email }
            });

        }
    );

});

    
app.post('/Login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res.status(400).json({
            mensagem: 'Preencha email e senha.'
        });

    }

    const sql = `
        SELECT id, nome, email
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

  const id = Number(req.params.id);
  if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ mensagem: 'ID de usuário inválido.' });
  }

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

// ==========================================
// SALVAR ALTERAÇÕES DO PERFIL
// ==========================================
app.post('/EditarPerfil/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ mensagem: 'ID de usuário inválido.' });
  }

  const { nome, email, senhaAtual, novaSenha = '', confirmarSenha = '' } = req.body || {};
  if (typeof nome !== 'string' || !nome.trim() ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof senhaAtual !== 'string' || !senhaAtual.trim() ||
      typeof novaSenha !== 'string' || typeof confirmarSenha !== 'string') {
    return res.status(400).json({ mensagem: 'Informe nome, e-mail válido e senha atual.' });
  }
  if (novaSenha !== '' && (!novaSenha.trim() || novaSenha !== confirmarSenha)) {
    return res.status(400).json({ mensagem: 'As novas senhas não são iguais ou estão vazias.' });
  }

  conexao.query('SELECT id, senha FROM usuarios WHERE id = ?', [id], (erro, usuarios) => {
    if (erro) {
      console.log('Erro ao consultar perfil:', erro);
      return res.status(500).json({ mensagem: 'Não foi possível consultar o perfil.' });
    }
    if (usuarios.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    if (usuarios[0].senha !== senhaAtual) {
      return res.status(401).json({ mensagem: 'Senha atual incorreta.' });
    }

    const sql = novaSenha === ''
      ? 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ? AND senha = ?'
      : 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ? AND senha = ?';
    const valores = novaSenha === ''
      ? [nome.trim(), email.trim(), id, senhaAtual]
      : [nome.trim(), email.trim(), novaSenha, id, senhaAtual];

    conexao.query(sql, valores, (erroAtualizacao, resultado) => {
      if (erroAtualizacao) {
        if (erroAtualizacao.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' });
        }
        console.log('Erro ao atualizar perfil:', erroAtualizacao);
        return res.status(500).json({ mensagem: 'Não foi possível atualizar o perfil.' });
      }
      if (resultado.affectedRows === 0) {
        return res.status(409).json({ mensagem: 'O perfil foi alterado. Recarregue e tente novamente.' });
      }
      return res.status(200).json({
        mensagem: 'Perfil atualizado com sucesso!',
        usuario: { id, nome: nome.trim(), email: email.trim() }
      });
    });
  });
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