/* istanbul ignore next */
import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Recipe Schema
 */

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  // cost: {
  //   type: String
  // },
  ingredients: [
    {
      title: {
        type: String,
        required: true
      }
    }
  ],
  steps: [
    {
      title: {
        type: String
        // required: true
      }
    }
  ],
  cookingTime: {
    type: String,
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
    // required: true
  }

});


/**
 * Statics
 */
RecipeSchema.statics = {

  /**
   * Get recipe
   * @param {ObjectId} id - The objectId of recipe.
   * @returns {Promise<Recipe, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .execAsync().then((recipe) => {
        if (recipe) {
          return recipe;
        }
        const err = new APIError('This recipe does not exist.', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Get recipe
   * @param {ObjectId} id - The objectId of recipe.
   * @returns {Promise<Recipe, APIError>}
   */
  getByTitle(titles) {
    return this.find({ title: new RegExp(titles, 'i') })
      .execAsync().then((recipes) => {
        if (recipes && recipes.length) {
          return recipes;
        }
        const err = new APIError('No recipes exist.', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};

/**
 * @typedef Recipe
 */
export default mongoose.model('Recipe', RecipeSchema);
