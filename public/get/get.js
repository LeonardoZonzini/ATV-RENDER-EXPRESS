// GET - Listar pessoas e buscar por CPF
const tabela = document.getElementById('tabela-corpo');
const mensagem = document.getElementById('mensagem');
const cpfBusca = document.getElementById('cpfBusca');

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function renderizarLinhas(pessoas) {
    tabela.innerHTML = '';
    pessoas.forEach((pessoa) => {
        const linha = `<tr>
            <td>${pessoa.id}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.sobrenome}</td>
            <td>${pessoa.email}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.cpf}</td>
            <td>${pessoa.rg}</td>
            <td>${pessoa.telefone}</td>
            <td>${pessoa.rua}</td>
            <td>${pessoa.bairro}</td>
            <td>${pessoa.cidade}</td>
            <td>${pessoa.estado}</td>
        </tr>`;
        tabela.innerHTML += linha;
    });
}

function carregarTodas() {
    fetch('/pessoas')
        .then(response => response.json())
        .then(pessoas => renderizarLinhas(pessoas))
        .catch(() => mostrarMensagem('Erro ao carregar pessoas.', 'erro'));
}

document.getElementById('btnBuscar').addEventListener('click', function () {
    const cpf = cpfBusca.value.trim();
    if (!cpf) {
        carregarTodas();
        return;
    }
    fetch('/pessoas')
        .then(response => response.json())
        .then(pessoas => {
            const encontrada = pessoas.filter(p => p.cpf === cpf);
            if (encontrada.length === 0) {
                mostrarMensagem('Nenhuma pessoa encontrada com esse CPF.', 'erro');
            } else {
                mensagem.className = 'mensagem';
            }
            renderizarLinhas(encontrada);
        });
});

document.getElementById('btnLimpar').addEventListener('click', function () {
    cpfBusca.value = '';
    mensagem.className = 'mensagem';
    carregarTodas();
});

// Carrega a lista completa ao abrir a página
carregarTodas();
