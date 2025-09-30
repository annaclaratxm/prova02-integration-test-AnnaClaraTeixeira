const pactum = require('pactum');
const { spec } = pactum;

describe('FakeStore API - Test Scenarios', () => {

  // 1. GET - Listar todos os produtos
  it('GET - List all products', async () => {
    await spec()
      .get('https://fakestoreapi.com/products')
      .expectStatus(200)
      .expectJsonLike([{}]);
  });

  // 2. GET - Buscar um produto por ID válido
  it('GET - Get single product by ID', async () => {
    await spec()
      .get('https://fakestoreapi.com/products/1')
      .expectStatus(200)
      .expectJsonLike({
        id: 1,
        title: /.+/
      });
  });

  // 3. GET - Produto não encontrado
  it('GET - Get product not found', async () => {
    await spec()
      .get('https://fakestoreapi.com/products/99999')
      .expectStatus(404);
  });

  // 4. PUT - Atualizar título de um produto
  it('PUT - Update product title', async () => {
    await spec()
      .put('https://fakestoreapi.com/products/1')
      .withJson({
        title: "Notebook atualizado"
      })
      .expectStatus(200)
      .expectJsonLike({
        title: "Notebook atualizado"
      });
  });

  // 5. PUT - Atualizar preço de um produto
  it('PUT - Update product price', async () => {
    await spec()
      .put('https://fakestoreapi.com/products/2')
      .withJson({
        price: 199.99
      })
      .expectStatus(200)
      .expectJsonLike({
        price: 199.99
      });
  });

  // 6. GET - Buscar categorias de produtos
  it('GET - List all categories', async () => {
    await spec()
      .get('https://fakestoreapi.com/products/categories')
      .expectStatus(200)
      .expectJsonLike([ /.+/ ]);
  });

  // 7. GET - Produtos de uma categoria
  it('GET - Get products by category', async () => {
    await spec()
      .get('https://fakestoreapi.com/products/category/electronics')
      .expectStatus(200)
      .expectJsonLike([{
        category: "electronics"
      }]);
  });

  // 8. PUT - Atualizar descrição de produto
  it('PUT - Update product description', async () => {
    await spec()
      .put('https://fakestoreapi.com/products/3')
      .withJson({
        description: "Descrição de teste alterada"
      })
      .expectStatus(200)
      .expectJsonLike({
        description: "Descrição de teste alterada"
      });
  });

  // 9. GET - Buscar todos os usuários
  it('GET - List all users', async () => {
    await spec()
      .get('https://fakestoreapi.com/users')
      .expectStatus(200)
      .expectJsonLike([{}]);
  });

  // 10. PUT - Atualizar nome de usuário
  it('PUT - Update user name', async () => {
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
