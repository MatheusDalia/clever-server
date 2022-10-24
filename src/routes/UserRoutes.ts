import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/')
  .post(
    UserController.create,
  );

userRouter.route('/:userId')
  .get(
    UserController.read,
  );

userRouter.route('/:userId')
  .delete(
    UserController.read,
    UserController.delete,
  );
userRouter.route('/:userId')
  .patch(
    UserController.read,
    UserController.update,
  );

export default userRouter;
