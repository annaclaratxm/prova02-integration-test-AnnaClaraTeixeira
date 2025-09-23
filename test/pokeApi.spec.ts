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
});
