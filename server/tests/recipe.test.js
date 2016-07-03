import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
// import mongoose from 'mongoose';
import app from '../../index';

chai.config.includeStack = true;

describe('Recipes APIs', () => {
  const mockRecipeId = {
    success: '575da6b8dcba0f71fd401992',
    failure: '575c2346960f5894c50cxyz1'
  };
  const mockRecipeTitle = {
    success: 'blue',
    failure: 'xoxkxoklxckoxckxlckokodc'
  };
  const recipe = {
    title: 'baked beans on toast',
    author: 'Mr. Test',
    description: 'modern twist on a classic',
    difficulty: 2,
    ingredients: [
      { title: 'beans' },
      { title: 'toast' }
    ],
    steps: [
      { title: 'put beans in a pan' },
      { title: 'toast the bread' },
      { title: 'serve on a plate' }
    ],
    cookingTime: '5 mins',
    prepTime: '1 min',
    imageUrl: 'http://images.com/random.png'
  };
  describe('GET /api/recipes/all/', () => {
    it('should get all recipes', (done) => {
      request(app)
        .get('/api/recipes/all')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  describe('GET /api/recipes/:recipeId', () => {
    it('should get a single recipe', (done) => {
      request(app)
        .get(`/api/recipes/${mockRecipeId.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should get single recipe with necessary properties (1)', (done) => {
      request(app)
        .get(`/api/recipes/${mockRecipeId.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('title');
          expect(res.body.title).to.be.a('string');
          expect(res.body).to.have.property('author');
          expect(res.body.author).to.be.a('string');
          expect(res.body).to.have.property('timestamp');
          expect(res.body.timestamp).to.be.a('string');
          expect(res.body).to.have.property('description');
          expect(res.body.description).to.be.a('string');
          expect(res.body).to.have.property('difficulty');
          expect(res.body.difficulty).to.be.an('number');
          done();
        });
    });
    it('should get single recipe with necessary properties (2)', (done) => {
      request(app)
        .get(`/api/recipes/${mockRecipeId.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('ingredients');
          expect(res.body.ingredients).to.be.an('array');
          expect(res.body).to.have.property('steps');
          expect(res.body.steps).to.be.an('array');
          expect(res.body).to.have.property('cookingTime');
          expect(res.body.cookingTime).to.be.a('string');
          expect(res.body).to.have.property('prepTime');
          expect(res.body.prepTime).to.be.a('string');
          // todo: ADD THIS BACK IN when we have GET data with imageUrl
          // expect(res.body).to.have.property('imageUrl');
          done();
        });
    });
    it('should report error with message - Not found, if recipe does not exist', (done) => {
      request(app)
        .get(`/api/recipes/${mockRecipeId.failure}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });
  describe('GET /api/recipes/all/filter/title/:titles', () => {
    it('should get array of recipes', (done) => {
      request(app)
        .get(`/api/recipes/all/filter/title/${mockRecipeTitle.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it('should get recipes with necessary properties (1)', (done) => {
      request(app)
        .get(`/api/recipes/all/filter/title/${mockRecipeTitle.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body[0]).to.have.property('title');
          expect(res.body[0].title).to.be.a('string');
          expect(res.body[0]).to.have.property('author');
          expect(res.body[0].author).to.be.a('string');
          expect(res.body[0]).to.have.property('timestamp');
          expect(res.body[0].timestamp).to.be.a('string');
          expect(res.body[0]).to.have.property('description');
          expect(res.body[0].description).to.be.a('string');
          expect(res.body[0]).to.have.property('difficulty');
          expect(res.body[0].difficulty).to.be.an('number');
          done();
        });
    });
    it('should get recipes with necessary properties (2)', (done) => {
      request(app)
        .get(`/api/recipes/all/filter/title/${mockRecipeTitle.success}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body[0]).to.have.property('ingredients');
          expect(res.body[0].ingredients).to.be.an('array');
          expect(res.body[0]).to.have.property('steps');
          expect(res.body[0].steps).to.be.an('array');
          expect(res.body[0]).to.have.property('cookingTime');
          expect(res.body[0].cookingTime).to.be.a('string');
          expect(res.body[0]).to.have.property('prepTime');
          expect(res.body[0].prepTime).to.be.a('string');
          // todo: ADD THIS BACK IN when we have GET data with imageUrl
          // expect(res.body).to.have.property('imageUrl');
          done();
        });
    });
    it('should report error with message - Not found, if recipe does not exist', (done) => {
      request(app)
        .get(`/api/recipes/all/filter/title/${mockRecipeTitle.failure}`)
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });
  describe('POST /api/recipes/create/', () => {
    it('should create a new recipe', (done) => {
      request(app)
        .post('/api/recipes/create/')
        .send(recipe)
        .expect(httpStatus.OK)
        .then(res => {
          // expect(res.body).to.have.property('title');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should create a new recipe with necessary properties', (done) => {
      request(app)
        .post('/api/recipes/create/')
        .send(recipe)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.have.property('title');
          expect(res.body.title).to.be.a('string');
          expect(res.body).to.have.property('author');
          expect(res.body.author).to.be.a('string');
          expect(res.body).to.have.property('timestamp');
          expect(res.body.timestamp).to.be.a('string');
          expect(res.body).to.have.property('description');
          expect(res.body.description).to.be.a('string');
          expect(res.body).to.have.property('difficulty');
          expect(res.body.difficulty).to.be.an('number');
          expect(res.body).to.have.property('ingredients');
          expect(res.body.ingredients).to.be.an('array');
          expect(res.body).to.have.property('steps');
          expect(res.body.steps).to.be.an('array');
          expect(res.body).to.have.property('cookingTime');
          expect(res.body.cookingTime).to.be.a('string');
          expect(res.body).to.have.property('prepTime');
          expect(res.body.prepTime).to.be.a('string');
          expect(res.body).to.have.property('imageUrl');
          expect(res.body.imageUrl).to.be.a('string');
          done();
        });
    });
    it('should create a new recipe with ingredients array objects', (done) => {
      request(app)
        .post('/api/recipes/create/')
        .send(recipe)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.ingredients[0]).to.be.an('object');
          expect(res.body.ingredients[0].title).to.be.a('string');
          expect(res.body.ingredients[0].title).to.equal('beans');
          expect(res.body.ingredients[1]).to.be.an('object');
          expect(res.body.ingredients[1].title).to.be.a('string');
          expect(res.body.ingredients[1].title).to.equal('toast');
          done();
        });
    });
    it('should create a new recipe with steps array objects', (done) => {
      request(app)
        .post('/api/recipes/create/')
        .send(recipe)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.steps[0]).to.be.an('object');
          expect(res.body.steps[0].title).to.be.a('string');
          expect(res.body.steps[0].title).to.equal('put beans in a pan');
          expect(res.body.steps[1]).to.be.an('object');
          expect(res.body.steps[1].title).to.be.a('string');
          expect(res.body.steps[1].title).to.equal('toast the bread');
          expect(res.body.steps[2]).to.be.an('object');
          expect(res.body.steps[2].title).to.be.a('string');
          expect(res.body.steps[2].title).to.equal('serve on a plate');
          done();
        });
    });
  });
});
