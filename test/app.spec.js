'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
    //return 400 when genre does not match
    it('return 400 is genres does not match', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'Something_Invalid'})
            .expect(400);
    });
    //return 400 when sort does not match
    it('return 400 if sort does not match', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'Something_Invalid'})
            .expect(400);
    })
    //return all results when /app
    it('return all apps when go to /apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.be.an('object');
                expect(res.body[0]).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Reviews','Size', 'Installs', 'Type', 'Price','Content Rating', 'Genres', 'Last Updated','Current Ver', 'Android Ver'
                );
            });
    });
    //return filter by genres
    const genres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
    for(let i = 0; i<genres.length; i++) {
        it('return array or apps filtered by genre', () => {
            return supertest(app)
                .get('/apps')
                .query({genres: `${genres[i]}`})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body[0]).to.include.all.keys(
                        'App', 'Category', 'Rating', 'Reviews','Size', 'Installs', 'Type', 'Price','Content Rating', 'Genres', 'Last Updated','Current Ver', 'Android Ver'
                    );
                    expect(res.body[0].Genres.toLowerCase()).to.be.equal(`${genres[i]}`);
                });

        });
    }
    //return sort by "app" or "rating"
    const sorts = ['app', 'rating'];
    for(let i = 0; i<sorts.length; i++) {
        it(`return array or apps sorted by ${sorts[i]}`, () => {
            return supertest(app)
                .get('/apps')
                .query({sort: `${sorts[i]}`})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.include.all.keys(
                        'App', 'Category', 'Rating', 'Reviews','Size', 'Installs', 'Type', 'Price','Content Rating', 'Genres', 'Last Updated','Current Ver', 'Android Ver'
                    );
                    expect(res.body[0]).to.be.an('object');
                });

        });
    }

});