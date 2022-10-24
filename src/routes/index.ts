import { Router } from 'express';

import UserRouter from './UserRoutes';
import MetricRouter from './MetricRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/metric', MetricRouter);
router.route('/').get((req, res) => {
  res.send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;
