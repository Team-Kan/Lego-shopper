const { client } = require("../../server/db");
const { createCollection, getAllCollections, deleteCollection, editCollection } = require("../../server/db/collection");
const setup = require("../setup");
const tearDown = require("../tearDown");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("Testing createCollection({name})", () => {
  it("creates a collection {name, id}", async () => {
    const [first, second] = [{ name: "Sample®" }, { name: "Ninjago®" }];

    const firstCollection = await createCollection(first);
    const secondCollection = await createCollection(second);
    expect(firstCollection.name).toBe("Sample®");
    expect(secondCollection.name).toBe("Ninjago®");
  });
});

describe("Testing getAllCollections()", () => {
  it("pulls all of the collections", async () =>{
    const collections = await getAllCollections();
    expect(collections.length).toBe(2);
   });
    it("Expect name of first collection to be 'sample'", async () =>{
    const collections = await getAllCollections();
    expect(collections[0].name).toBe("Sample®");
   });
});

describe("Testing deleteCollection()", () => {
  it("removed collection from database", async () => {
    const  fakeCollection  = await createCollection({name:"ToyStory"});
    await deleteCollection(fakeCollection.id);

    const { rows: [collection]} = await client.query(`
    SELECT *
    FROM collections
    WHERE id = $1;
    `, [fakeCollection.id])
    expect(collection).toBeFalsy();
  })
});

describe("Testing editCollection({id, name})", () => {
  it("edits collection in database", async () => {
    const fakeEditCollection = await editCollection({id:1, name: "React!"});
    expect(fakeEditCollection.name).toBe("React!")
  })
})