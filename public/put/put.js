// PUT - Buscar pessoa por CPF e atualizar os dados
const formAtualizar = document.getElementById('formAtualizar');
const mensagem = document.getElementById('mensagem');
const cpfBusca = document.getElementById('cpfBusca');

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function preencherFormulario(pessoa) {
    document.getElementById('id').value = pessoa.id;
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('sobrenome').value = pessoa.sobrenome;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('idade').value = pessoa.idade;
    document.getElementById('cpf').value = pessoa.cpf;
    document.getElementById('rg').value = pessoa.rg;
    document.getElementById('telefone').value = pessoa.telefone;
    document.getElementById('rua').value = pessoa.rua;
    document.getElementById('bairro').value = pessoa.bairro;
    document.getElementById('cidade').value = pessoa.cidade;
    document.getElementById('estado').value = pessoa.estado;
}

document.getElementById('btnBuscar').addEventListener('click', function () {
    const cpf = cpfBusca.value.trim();
    if (!cpf) {
        mostrarMensagem('Digite um CPF para buscar.', 'erro');
        return;
    }
    fetch('/pessoas')
        .then(response => response.json())
        .then(pessoas => {
            const pessoaEncontrada = pessoas.find(p => p.cpf === cpf);
            if (pessoaEncontrada) {
                preencherFormulario(pessoaEncontrada);
                mensagem.className = 'mensagem';
            } else {
                formAtualizar.reset();
                mostrarMensagem('Pessoa não encontrada com esse CPF.', 'erro');
            }
        });
});

formAtualizar.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const id = document.getElementById('id').value;
    if (!id) {
        mostrarMensagem('Busque uma pessoa pelo CPF antes de atualizar.', 'erro');
        return;
    }

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

    fetch(`/pessoas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    })
        .then(response => response.json())
        .then(() => {
            mostrarMensagem('Pessoa atualizada com sucesso!', 'sucesso');
            formAtualizar.reset();
            cpfBusca.value = '';
        })
        .catch(() => {
            mostrarMensagem('Erro ao atualizar pessoa.', 'erro');
        });
});
