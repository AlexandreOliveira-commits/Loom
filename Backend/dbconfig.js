const mysql = require('mysql2');

const conexao = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'LoomSite'
});

conexao.connect((erro) => {
    if(erro) {
        console.error('Erro ao conectar ao banco');
        return;
    }

    console.log('Conexão estabelecida com sucesso');

}); 

module.exports = conexao;