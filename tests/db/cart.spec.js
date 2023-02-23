const client = require('./client');
const { createCart } = require('../../db/cart');
const { createUser } = require('../../db/User');

client.connect();

describe('Testing Create Cart Function', () => {
    it('creates and returns a cart', async() => {
        const user = await createUser({ username: "Bob", password: "password123"});
        const cart = await createCart({ id: user.id });
        expect(cart).toEqual(
            objectContaining({
                id: expect.any(Number),
                userId: expect.toEqual(user.id),
                isActive: expect.toBe(true)
            })
        );
    })
    
});