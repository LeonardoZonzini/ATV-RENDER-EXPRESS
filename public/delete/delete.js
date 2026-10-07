// DELETE - Buscar pessoa por CPF e excluir o cadastro
const cpfBusca = document.getElementById('cpfBusca');
const resultado = document.getElementById('resultado');
const mensagem = document.getElementById('mensagem');
let pessoaAtual = null;

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function preencherResultado(pessoa) {
    document.getElementById('rId').textContent = pessoa.id;
    document.getElementById('rNome').textContent = pessoa.nome;
    document.getElementById('rSobrenome').textContent = pessoa.sobrenome;
    document.getElementById('rEmail').textContent = pessoa.email;
    document.getElementById('rIdade').textContent = pessoa.idade;
    document.getElementById('rCpf').textContent = pessoa.cpf;
    document.getElementById('rRg').textContent = pessoa.rg;
    document.getElementById('rTelefone').textContent = pessoa.telefone;
    document.getElementById('rRua').textContent = pessoa.rua;
    document.getElementById('rBairro').textContent = pessoa.bairro;
    document.getElementById('rCidade').textContent = pessoa.cidade;
    document.getElementById('rEstado').textContent = pessoa.estado;
    resultado.style.display = 'block';
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
                pessoaAtual = pessoaEncontrada;
                preencherResultado(pessoaEncontrada);
                mensagem.className = 'mensagem';
            } else {
                pessoaAtual = null;
                resultado.style.display = 'none';
                mostrarMensagem('Pessoa não encontrada com esse CPF.', 'erro');
            }
        });
});

document.getElementById('btnExcluir').addEventListener('click', function () {
    if (!pessoaAtual) {
        mostrarMensagem('Busque uma pessoa pelo CPF antes de excluir.', 'erro');
        return;
    }
    fetch(`/pessoas/${pessoaAtual.id}`, {
        method: 'DELETE'
    })
        .then(() => {
            mostrarMensagem('Pessoa excluída com sucesso!', 'sucesso');
            resultado.style.display = 'none';
            cpfBusca.value = '';
            pessoaAtual = null;
        })
        .catch(() => {
            mostrarMensagem('Erro ao excluir pessoa.', 'erro');
        });
});
