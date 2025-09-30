// tests/petstore.spec.js
const pactum = require('pactum');

describe('Swagger PetStore API - Test Scenarios', () => {

  // 1. GET - Buscar inventário da loja
  it('GET - Get store inventory', async () => {
    await pactum.spec()
      .get('https://petstore.swagger.io/v2/store/inventory')
      .expectStatus(200);
  });

  // 2. POST - Criar novo pet
  it('POST - Add a new pet', async () => {
    await pactum.spec()
      .post('https://petstore.swagger.io/v2/pet')
      .withJson({
        id: 123456,
        name: "Bolt",
        status: "available"
      })
      .expectStatus(200);
  });

  // 3. GET - Buscar pet pelo ID existente
  it('GET - Find pet by ID', async () => {
    await pactum.spec()
      .get('https://petstore.swagger.io/v2/pet/123456')
      .expectStatus(200);
  });

  // 4. GET - Buscar pet inexistente
  it('GET - Pet not found', async () => {
    await pactum.spec()
      .get('https://petstore.swagger.io/v2/pet/99999999')
      .expectStatus(404);
  });

  // 5. PUT - Atualizar dados de um pet existente
  it('PUT - Update pet', async () => {
    await pactum.spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({
        id: 123456,
        name: "Bolt Updated",
        status: "sold"
      })
      .expectStatus(200);
  });

  // 6. POST - Criar uma ordem de compra
  it('POST - Place an order', async () => {
    await pactum.spec()
      .post('https://petstore.swagger.io/v2/store/order')
      .withJson({
        id: 777,
        petId: 123456,
        quantity: 1,
        status: "placed",
        complete: true
      })
      .expectStatus(200);
  });

  // 7. GET - Buscar ordem de compra existente
  it('GET - Find order by ID', async () => {
    await pactum.spec()
      .get('https://petstore.swagger.io/v2/store/order/777')
      .expectStatus(200);
  });

  // 8. GET - Buscar ordem inexistente
  it('GET - Order not found', async () => {
    await pactum.spec()
      .get('https://petstore.swagger.io/v2/store/order/999999')
      .expectStatus(404);
  });

  // 9. DELETE - Deletar ordem existente
  it('DELETE - Delete order', async () => {
    await pactum.spec()
      .delete('https://petstore.swagger.io/v2/store/order/777')
      .expectStatus(200);
  });

  // 10. DELETE - Deletar pet existente
  it('DELETE - Delete pet', async () => {
    await pactum.spec()
      .delete('https://petstore.swagger.io/v2/pet/123456')
      .expectStatus(200);
  });

});
