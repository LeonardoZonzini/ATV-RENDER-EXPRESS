// POST - Cadastrar uma nova pessoa
const formCadastro = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

formCadastro.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const pessoa = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        idade: document.getElementById('idade').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        telefone: document.getElementById('telefone').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    fetch('/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    })
        .then(response => response.json())
        .then(() => {
            mostrarMensagem('Pessoa cadastrada com sucesso!', 'sucesso');
            formCadastro.reset();
        })
        .catch(() => {
            mostrarMensagem('Erro ao cadastrar pessoa.', 'erro');
        });
});
