import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models';
import { UserType } from '../DTOs';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findById(id: string): Promise<User | false | string> {
    try {
      const user = await this.findOne(id);

      if (!user) {
        return false;
      }

      return user;
    } catch (error) {
      return error.severity || error;
    }
  }

  public async patch(
    id: string,
    userData: any,
  ): Promise<User | string> {
    try {
      await this.update(id, userData);
      const UpdatedUser = await this.findOne(id);

      return UpdatedUser;
    } catch (error) {
      return error;
    }
  }
}
