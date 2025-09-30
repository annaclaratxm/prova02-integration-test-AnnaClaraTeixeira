import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('PokeAPI - Pokémon', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://pokeapi.co/api/v2';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('Get Pikachu data', async () => {
    await p
      .spec()
      .get(`${baseUrl}/pokemon/pikachu`)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ name: 'pikachu' })
      .expectBodyContains('abilities');
  });

  it('Get Pokémon data by ID', async () => {
    await p
      .spec()
      .get(`${baseUrl}/pokemon/25`)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ id: 25, name: 'pikachu' });
  });

  it('Get list of all Pokémon', async () => {
    await p
      .spec()
      .get(`${baseUrl}/pokemon`)
      .expectStatus(StatusCodes.OK)
      .expectBodyContains('results')
      .expectJsonLength('results', 20); 
  });

  it('Get ability data', async () => {
    await p
      .spec()
      .get(`${baseUrl}/ability/65`) 
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ id: 65, name: 'overgrow' });
  });

  it('Get Pokémon by type', async () => {
    await p
      .spec()
      .get(`${baseUrl}/type/fire`)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ name: 'fire' })
      .expectBodyContains('pokemon');
  });

  it('Attempt to create Pokémon (should fail)', async () => {
    const newPokemon = {
      name: 'charizard',
      type: 'fire',
      abilities: ['blaze', 'solar-power']
    };

    await p
      .spec()
      .post(`${baseUrl}/pokemon`)
      .withJson(newPokemon)
      .expectStatus(StatusCodes.NOT_FOUND);
  });

  it('Get move data', async () => {
    await p
      .spec()
      .get(`${baseUrl}/move/1`) 
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ name: 'pound' })
      .expectBodyContains('type');
  });

  it('Get Pokémon evolution chain', async () => {
    await p
      .spec()
      .get(`${baseUrl}/evolution-chain/1`) 
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ id: 1 })
      .expectBodyContains('chain');
  });

  it('Get list of all Pokémon types', async () => {
    await p
      .spec()
      .get(`${baseUrl}/type`)
      .expectStatus(StatusCodes.OK)
      .expectBodyContains('results');
  });

  it('Check if Pokémon exists', async () => {
    const pokemonName = 'pikachu';
    const response = await p
      .spec()
      .get(`${baseUrl}/pokemon/${pokemonName}`)
      .expectStatus(StatusCodes.OK);

    expect(response.body.name).toBe(pokemonName);
  });

  it('Get detailed Pokémon data with moves', async () => {
    await p
      .spec()
      .get(`${baseUrl}/pokemon/pikachu`)
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ name: 'pikachu' })
      .expectBodyContains('moves');
  });

  it('Create Pokémon with invalid data (should fail)', async () => {
    const invalidPokemon = {
      name: '',
      type: '',
    };

    await p
      .spec()
      .post(`${baseUrl}/pokemon`)
      .withJson(invalidPokemon)
      .expectStatus(StatusCodes.NOT_FOUND);
  });


  it('Get non-existing Pokémon', async () => {
    await p
      .spec()
      .get(`${baseUrl}/pokemon/nonexistentpokemon`)
      .expectStatus(StatusCodes.NOT_FOUND)
      .expectBodyContains('Not Found');
  });

  
  it('Get item details (Poké Ball)', async () => {
    await p
      .spec()
      .get(`${baseUrl}/item/4`) 
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({ name: 'poke-ball' });
  });
});
