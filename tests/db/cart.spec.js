const { client } = require("../../server/db");
const { createCart } = require('../../server/db/cart');
const { createUser } = require('../../server/db/User');

client.connect();

describe('Testing Create Cart Function', () => {
    it('creates and returns a cart', async() => {
        const user = await createUser({ username: "Bob", password: "password123"});
        const cart = await createCart({ id: user.id });
        expect(cart).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                userId: user.id,
                isActive: true
            })
        );
    })  
});