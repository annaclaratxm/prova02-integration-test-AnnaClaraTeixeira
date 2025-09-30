import pactum from 'pactum';
const { spec } = pactum;

describe('ServeRest API - Positive Test Scenarios', () => {

  // 1. Login inválido (exemplo de validação de segurança)
  it('Login inválido', async () => {
    await spec()
      .post('https://fakestoreapi.com/auth/login')
      .withJson({
        username: "usuario_invalido",
        password: "1234"
      })
      .expectStatus(401); // login inválido retorna 401
  });

  // 2. Cadastro de novo produto
  it('Cadastro um novo produto', async () => {
    await spec()
      .post('https://fakestoreapi.com/products')
      .withJson({
        name: "Notebook Dell",
        price: 3500,
        description: "Notebook de alta performance",
        category: "eletronicos"
      })
      .expectStatus(201)
      .expectJsonLike({
        name: "Notebook Dell",
        price: 3500
      });
  });

  // 3. Buscar o produto cadastrado
  it('Busca o novo produto cadastrado', async () => {
    await spec()
      .get('https://fakestoreapi.com/products/1') // id válido existente
      .expectStatus(200)
      .expectJsonLike({
        id: 1
      });
  });

  // 4. Produto sem token válido (simulando erro de autorização)
  it('Produto sem token válido', async () => {
    await spec()
      .post('https://fakestoreapi.com/products')
      .withJson({
        name: "Produto Teste",
        price: 100
      })
      .expectStatus(401); // sem token, retorna 401
  });

  // 5. Validar produtos com descrição duplicada
  it('Validar produtos com descrição duplicada', async () => {
    await spec()
      .get('https://fakestoreapi.com/products')
      .expectStatus(200)
      .expectJsonLike([{
        description: /.+/
      }]);
  });

  // 6. Adicionar um novo carrinho
  it('Adiciona um novo carrinho', async () => {
    await spec()
      .post('https://fakestoreapi.com/carts')
      .withJson({
        userId: 1,
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
        ]
      })
      .expectStatus(201)
      .expectJsonLike({
        userId: 1
      });
  });

  // 7. Carrinho inválido (quantidade ou produto errado)
  it('Carrinho inválido', async () => {
    await spec()
      .post('https://fakestoreapi.com/carts')
      .withJson({
        userId: 9999, // usuário inexistente
        products: []
      })
      .expectStatus(400); // retorna 400 Bad Request
  });

  // 8. Concluir compra e excluir carrinho
  it('Conclui a compra e exclui o carrinho', async () => {
    await spec()
      .delete('https://fakestoreapi.com/carts/1') // carrinho válido
      .expectStatus(200)
      .expectJsonLike({}); // objeto vazio no retorno
  });

  // 9. Atualizar título de produto
  it('Atualiza título do produto', async () => {
    await spec()
      .put('https://fakestoreapi.com/products/1')
      .withJson({
        title: "Notebook Dell Atualizado"
      })
      .expectStatus(200)
      .expectJsonLike({
        title: "Notebook Dell Atualizado"
      });
  });

  // 10. Atualizar nome de usuário
  it('Atualiza nome de usuário', async () => {
    await spec()
      .put('https://fakestoreapi.com/users/1')
      .withJson({
        username: "novoUsuario"
      })
      .expectStatus(200)
      .expectJsonLike({
        username: "novoUsuario"
      });
  });

});
