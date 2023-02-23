const { client } = require("../../server/db");
const { AttachProductToCart } = require('../../server/db/cart_product');

client.connect();

describe('Testing Attach Product to Cart Function', () => {
    it('creates and returns a cart_product row', async() => {
        const cartId = 1;
        const productId = 1;
        const quantity = 5; 
        const cart_product = await AttachProductToCart({ cartId, productId, quantity });
        expect(cart_product).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                cartId: cartId,
                productId: productId, 
                quantity: quantity
            })
        );
    })  
});