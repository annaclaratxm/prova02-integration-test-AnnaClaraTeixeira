import pactum from 'pactum';
const { spec } = pactum;

describe('Pet Store API - 20 Positive Test Scenarios', () => {

  let petId1: number, petId2: number;
  let orderId1: number, orderId2: number;

  it('Create Pet 1', async () => {
    const res = await spec()
      .post('https://petstore.swagger.io/v2/pet')
      .withJson({
        id: Math.floor(Math.random() * 100000),
        name: "Rex",
        category: { id: 1, name: "Dogs" },
        status: "available"
      })
      .expectStatus(200)
      .expectJsonLike({ name: "Rex", status: "available" });
    petId1 = res.body.id;
  });

  it('Create Pet 2', async () => {
    const res = await spec()
      .post('https://petstore.swagger.io/v2/pet')
      .withJson({
        id: Math.floor(Math.random() * 100000),
        name: "Mia",
        category: { id: 2, name: "Cats" },
        status: "available"
      })
      .expectStatus(200)
      .expectJsonLike({ name: "Mia", status: "available" });
    petId2 = res.body.id;
  });

  it('Get Pet 1 by ID', async () => {
    await spec()
      .get(`https://petstore.swagger.io/v2/pet/${petId1}`)
      .expectStatus(200)
      .expectJsonLike({ id: petId1 });
  });

  it('Get Pet 2 by ID', async () => {
    await spec()
      .get(`https://petstore.swagger.io/v2/pet/${petId2}`)
      .expectStatus(200)
      .expectJsonLike({ id: petId2 });
  });

  it('Update Pet 1 status', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId1, name: "Rex", status: "sold" })
      .expectStatus(200)
      .expectJsonLike({ status: "sold" });
  });

  it('Update Pet 2 status', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId2, name: "Mia", status: "pending" })
      .expectStatus(200)
      .expectJsonLike({ status: "pending" });
  });

  it('Get pets by status sold', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByStatus?status=sold')
      .expectStatus(200);
  });

  it('Get pets by status pending', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByStatus?status=pending')
      .expectStatus(200);
  });

  it('Update Pet 1 name', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId1, name: "Rexy", status: "sold" })
      .expectStatus(200)
      .expectJsonLike({ name: "Rexy" });
  });

  it('Update Pet 2 name', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId2, name: "Miazinha", status: "pending" })
      .expectStatus(200)
      .expectJsonLike({ name: "Miazinha" });
  });

  it('Create Order 1', async () => {
    const res = await spec()
      .post('https://petstore.swagger.io/v2/store/order')
      .withJson({
        id: Math.floor(Math.random() * 100000),
        petId: petId1,
        quantity: 1,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: true
      })
      .expectStatus(200)
      .expectJsonLike({ petId: petId1, status: "placed" });
    orderId1 = res.body.id;
  });

  it('Create Order 2', async () => {
    const res = await spec()
      .post('https://petstore.swagger.io/v2/store/order')
      .withJson({
        id: Math.floor(Math.random() * 100000),
        petId: petId2,
        quantity: 2,
        shipDate: new Date().toISOString(),
        status: "placed",
        complete: false
      })
      .expectStatus(200)
      .expectJsonLike({ petId: petId2, status: "placed" });
    orderId2 = res.body.id;
  });

  it('Get store inventory', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/store/inventory')
      .expectStatus(200);
  });

  it('Get pets by status available', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
      .expectStatus(200);
  });

  it('Update Pet 1 status to available', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId1, name: "Rexy", status: "available" })
      .expectStatus(200)
      .expectJsonLike({ status: "available" });
  });

  it('Update Pet 2 status to available', async () => {
    await spec()
      .put('https://petstore.swagger.io/v2/pet')
      .withJson({ id: petId2, name: "Miazinha", status: "available" })
      .expectStatus(200)
      .expectJsonLike({ status: "available" });
  });

  it('Get all pets to verify updates', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
      .expectStatus(200);
  });

  it('Get all orders to verify', async () => {
    await spec()
      .get('https://petstore.swagger.io/v2/store/order/' + orderId1)
      .expectStatus(200);
    await spec()
      .get('https://petstore.swagger.io/v2/store/order/' + orderId2)
      .expectStatus(200);
  });

});
