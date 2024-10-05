const apiURL = 'https://api-aula.up.railway.app/livros';

// Função para carregar livros na lista
const tabela = document.getElementById('livros-tabela').querySelector('tbody'); // Acesso ao tbody

const carregarLivros = () => {
  tabela.innerHTML = ''; // Limpar tabela antes de carregar novos dados
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na rede: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos da API:', data); // Log dos dados recebidos

      if (Array.isArray(data)) {
        data.forEach(livro => {
          const row = `<tr><td>${livro.title}</td><td>${livro.description}</td></tr>`;
          tabela.innerHTML += row; // Adicionar livros ao tbody da tabela
        });
      } else {
        console.error('Os dados retornados não são um array:', data);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
};

carregarLivros();

// Função de busca offline na lista de livros
document.getElementById('search').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const rows = tabela.querySelectorAll('tr');
  
  rows.forEach(row => {
    const titulo = row.querySelector('td').textContent.toLowerCase();
    row.style.display = titulo.includes(searchTerm) ? '' : 'none';
  });
});
