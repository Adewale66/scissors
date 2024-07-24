import { faker } from '@faker-js/faker';
import { User } from '../../src/users/entities/user.entity';

export function generateUser() {
  const fakeUser = new User();
  fakeUser.id = faker.string.uuid();
  fakeUser.username = faker.internet.email();
  fakeUser.hashedPassword = faker.string.alphanumeric();
  fakeUser.createdDate = faker.date.anytime();

  return fakeUser;
}
