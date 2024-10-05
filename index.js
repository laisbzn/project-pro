const apiURL = 'https://api-aula.up.railway.app/livros';

// Função para cadastrar livro
document.getElementById('cadastrar').addEventListener('click', () => {
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const mensagem = document.getElementById('mensagem');

  if (!titulo) {
    mensagem.textContent = 'Título Obrigatório';
    mensagem.className = '';
    mensagem.classList.add('erro');
    return;
  }

  fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: titulo, description: descricao }) // Propriedades corrigidas
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar o livro: ' + response.statusText);
      }
      return response.json();
    })
    .then(() => {
      mensagem.textContent = 'SUCESSO!';
      mensagem.className = '';
      mensagem.classList.add('sucesso');
      document.getElementById('titulo').value = '';
      document.getElementById('descricao').value = '';
    })
    .catch(error => {
      mensagem.textContent = 'Erro ao cadastrar o livro. Tente novamente.';
      mensagem.className = '';
      mensagem.classList.add('erro');
      console.error('Erro:', error);
    });
});
