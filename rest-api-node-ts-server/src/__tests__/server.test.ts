import request from 'supertest';
import sever, { connectDB } from '../server';
import db from '../config/db';

describe('GET /api', () =>{
    it('should return welcome message', async () =>{
        const res = await request(sever).get('/api');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('Welcome to the API');


    })
})

jest.mock ('../config/db')

describe('connectDB',( ) =>{
    it('should connect to the DB', async () =>{
        jest.spyOn(db, 'authenticate').
            mockRejectedValueOnce(new Error('Error connecting to DB'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB()
    })
})