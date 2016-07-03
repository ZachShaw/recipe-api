import express from 'express';
import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import recipesCtrl from '../controllers/recipes';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/all')
  /** GET /api/recipes/all - Get all recipes */
  .get(recipesCtrl.getAll);

router.route('/:recipeId')
  /** GET /api/recipes/:recipeId - get a single recipe */
  .get(recipesCtrl.getSingle);

router.route('/all/filter/title/:titles')
  /** GET /api/recipes/all/filter/title - Get all recipes by title*/
  .get(recipesCtrl.getMultiple);

router.route('/create')
  /** POST /api/recipes/create - Post a new recipe */
  .post(validate(recipesCtrl.create), recipesCtrl.create);

/** Load recipe when API with recipeId route parameter is hit */
router.param('recipeId', recipesCtrl.loadSingle);

/** Load recipe when API with titles route parameter is hit */
router.param('titles', recipesCtrl.loadMultiple);

export default router;
