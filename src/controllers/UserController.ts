import {
  Request, Response, NextFunction,
} from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories';
import { UserType } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        birth_date,
      } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const userData = {
        name,
        birth_date,
      };

      const { error } = UserType.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const user = await userRepository.save(userData);

      res.locals = {
        status: 201,
        message: 'User created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findById(userId);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      if (user === 'ERROR') {
        return next({
          status: 400,
          message: 'Incorrect parameters',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = req.body;

      const { error } = UserType.validate(userData);

      if (error) {
        return next({
          status: 400,
          message: error.details,
        });
      }

      const userRepository = getCustomRepository(UserRepository);
      const updatedUser = await userRepository.patch(userId, userData);

      res.locals = {
        status: 200,
        message: 'User updated',
        data: updatedUser,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const userRepository = getCustomRepository(UserRepository);
      await userRepository.delete(userId);

      const user = userRepository.findById(userId);

      res.locals = {
        status: 200,
        message: 'User deleted',
        data: user,
      };

      return next();
    } catch (error) {
      return next({
        status: 400,
        message: error.details,
      });
    }
  }
}

export default new UserController();
