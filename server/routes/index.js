import express from 'express';
import recipesRoutes from './recipes';

const router = express.Router();  // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('Planting all the things at planticious.')
);

// mount recipes routes at /recipes
router.use('/recipes', recipesRoutes);

export default router;
