import Recipe from '../models/recipe';
import Recipes from './../dummyData/recipes';
const DummyData = Recipes;

/**
 * getAll recipes
 * @returns {Recipes}
 */
function getAll(req, res) {
  return res.json(DummyData);
}

/**
 * load recipe and append to req.
 */
function loadSingle(req, res, next, id) {
  Recipe.getSingle(id).then((recipe) => {
    req.recipe = recipe;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * getSingle recipe
 * @returns {Recipe}
 */
function getSingle(req, res) {
  return res.json(req.recipe);
}


/**
 * load recipes and append to req.
 */
function loadMultiple(req, res, next, titles) {
  Recipe.getByTitle(titles).then((recipes) => {
    req.recipes = recipes;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * getMultiple recipes
 * @returns [{Recipes}]
 */
function getMultiple(req, res) {
  return res.json(req.recipes);
}

/**
 * create recipe
 */
 /* istanbul ignore next */
function create(req, res, next) {
  const recipe = new Recipe({
    title: req.body.title,
    author: req.body.author,
    timestamp: req.body.timestamp,
    description: req.body.description,
    difficulty: req.body.difficulty,
    cost: req.body.cost,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    cookingTime: req.body.cookingTime,
    prepTime: req.body.prepTime,
    imageUrl: req.body.imageUrl
  });

  recipe.timestamp = new Date();

  recipe.saveAsync()
    .then((savedRecipe) => res.json(savedRecipe))
    .error((e) => next(e));
}

export default { loadSingle, getSingle, getAll, loadMultiple, getMultiple, create };
