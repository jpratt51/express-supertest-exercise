process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('./app');
let cats = require('./fakeDb');

let item = { name: 'spinach', price: '3.00' };

beforeEach(function () {
    items.push(item);
});

afterEach(function () {
    items.length = 0;
});

describe('GET /shopping', function () {
    test('Gets a list of shopping items', async function () {
        const resp = await request(app).get(`/shopping`);
        expect(resp.statusCode).toBe(200);
        console.log({ items: item });
        expect(resp.body).toEqual({ items: [item] });
    });
});

describe('GET /shopping/:name', function () {
    test('Gets a single item', async function () {
        const resp = await request(app).get(`/shopping/${item.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({ foundItem: item });
    });

    test("Responds with 404 if can't find cat", async function () {
        const resp = await request(app).get(`/shopping/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe('POST /shopping', function () {
    test('Creates a new item', async function () {
        const resp = await request(app).post(`/shopping`).send({
            name: 'Cheerios',
            price: '4.00',
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            added: { name: 'Cheerios', price: '4.00' },
        });
    });
});

describe('PATCH /shopping/:name', function () {
    test('Updates a single item', async function () {
        const resp = await request(app).patch(`/shopping/${item.name}`).send({
            name: 'broccoli',
            price: '5.00',
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            updated: { name: 'broccoli', price: '5.00' },
        });
    });

    test('Responds with 404 if id invalid', async function () {
        const resp = await request(app).patch(`/shopping/0`);
        expect(resp.statusCode).toBe(404);
    });
});

describe('DELETE /shopping/:name', function () {
    test('Deletes a single item', async function () {
        const resp = await request(app).delete(`/shopping/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: 'Deleted' });
    });
});
