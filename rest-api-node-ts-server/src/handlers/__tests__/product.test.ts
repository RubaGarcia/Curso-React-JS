import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () =>{

    it('should display validation errors', async () =>{
        const res = await request(server).post('/api/products').send({});
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(4);
    })


    it('should return a list of products', async () =>{
        const res = await request(server).post('/api/products').send({
            name: 'Producto-test',
            price: 100
        });
        expect(res.status).toEqual(201);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');

        // expect(res.body.data).toBeInstanceOf(Array);
    })

    it('price should be >0', async () =>{
        const res = await request(server).post('/api/products').send({
            name: 'Producto-test',
            price: -100
        });
        
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toBe('Price must be greater than 0');
        
    })

    it('price should be 0?', async () =>{
        const res = await request(server).post('/api/products').send({
            name: 'Producto-test',
            price: 0
        });
        
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toBe('Price must be greater than 0');
        
    })

    it('price should be a number', async () =>{
        const res = await request(server).post('/api/products').send({
            name: 'Producto-test',
            price: 'juan'
        });
        
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(2);
        expect(res.body.errors[0].msg).toBe('Price must be a number');
        expect(res.body.errors[1].msg).toBe('Price must be greater than 0');
        
        
    })
})


describe('GET /api/products', () =>{
    it('should return a list of products', async () =>{
        const res = await request(server).get('/api/products');
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toHaveLength(1);
    })

    


})


describe('GET /api/products/:id', () =>{
    it('should return 404', async () =>{
        const prod = 10000
        const res = await request(server).get(`/api/products/${prod}`);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('msg');
        expect(res.body.msg).toBe('Product not found');
    })

    it('should not accept anything but numbers', async () =>{
        const res = await request(server).get(`/api/products/salchichas`);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].msg).toBe('Id must be an integer');
    })


    it('should return a product in particular', async () =>{
        const res = await request(server).get('/api/products/1');
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');
        
    })


})

describe('PUT /api/products/:id', () =>{
    it('name is required', async () =>{
        const res = await request(server).put('/api/products/1').send({
            price: 100
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(2);
        expect(res.body.errors[0].msg).toBe('Name is required');
        expect(res.body.errors[1].msg).toBe("Availability must be a boolean")
    })
    it('price is required', async () =>{
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            availability:true
        });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(3);
        expect(res.body.errors[0].msg).toBe('Price must be a number');
        expect(res.body.errors[1].msg).toBe('Price is required');
        expect(res.body.errors[2].msg).toBe('Price must be greater than 0');
    })

    it('price should not be less than 0', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            price: -200,
            availability:true
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toBe("Price must be greater than 0");
    });

    it('price should be a number', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            price: 'not a number',
            availability:true
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(2);
        expect(res.body.errors[0].msg).toBe('Price must be a number');
        expect(res.body.errors[1].msg).toBe('Price must be greater than 0');
    });

    it('price shouldnt be 0', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            price: 0,
            availability:true
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);
        expect(res.body.errors[0].msg).toBe('Price must be greater than 0');
        // expect(res.body.errors[1].msg).toBe("Availability must be a boolean");
    });

    it('availability should not be a boolean', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            price: 100,
            availability: 'not a boolean'
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toHaveLength(1);
    });

    it('everyting is ok', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: 'Producto-test',
            price: 100,
            availability:true
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data).toHaveProperty('price');
        expect(res.body.data).toHaveProperty('availability');
    })
})
describe('PATCH /api/products/:id', () =>{
    it('should return 404', async () =>{
        const prod = 10000
        const res = await request(server).patch(`/api/products/${prod}`);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe("Producto No Encontrado");
    })

    it('should not accept anything but numbers', async () =>{
        const res = await request(server).patch(`/api/products/salchichas`);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].msg).toBe('ID no válido');
    })

    it('should delete a product in particular', async () =>{
        const res = await request(server).patch('/api/products/1');
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data).toHaveProperty('price');
        expect(res.body.data).toHaveProperty('availability');
        
    })
})

describe('DELETE /api/products/:id', () =>{
    it('should return 404', async () =>{
        const prod = 10000
        const res = await request(server).delete(`/api/products/${prod}`);
        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe("Producto No Encontrado");
    })

    it('should not accept anything but numbers', async () =>{
        const res = await request(server).delete(`/api/products/salchichas`);
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].msg).toBe('ID no válido');
    })

    it('should delete a product in particular', async () =>{
        const res = await request(server).delete('/api/products/1');
        expect(res.status).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data).toHaveProperty('price');
        expect(res.body.data).toHaveProperty('availability');
        
    })
})
