document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.btn-remover');

  botoes.forEach(botao => {
    botao.addEventListener('click', async () => {
      const id = botao.getAttribute('data-id');
      const confirmacao = confirm('Tem certeza que deseja remover este curso?');

      if (!confirmacao) return;

      try {
        const resposta = await fetch(`/major/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (resposta.ok) {
          alert('Curso removido!');
          location.reload();
        } else {
          alert('Erro ao remover curso.');
        }
      } catch (err) {
        console.error('Erro AJAX:', err);
        alert('Erro inesperado.');
      }
    });
  });
});
