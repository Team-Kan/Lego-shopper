const { client } = require("../../server/db");
const { createCollection } = require("../../server/db/collection");

client.connect()

describe('Testing createCollection({name})', () => {
    it('creates a collection {name, id}', async () => {
       
        const [first, second] = [
          {name: 'Sample®'},
          {name: 'Ninjago®'},
        ] 

        const firstCollection = await createCollection(first)
        const secondCollection = await createCollection(second)
        expect(firstCollection.name).toBe('Sample®');
        expect(secondCollection.name).toBe('Ninjago®');

      });
  })
