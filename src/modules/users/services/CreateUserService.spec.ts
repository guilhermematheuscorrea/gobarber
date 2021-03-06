import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'guilherme@gmail.com',
      password: '123456',
      name: 'Guilherme',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user if email already exists', async () => {
    await createUserService.execute({
      email: 'guilherme@gmail.com',
      password: '123456',
      name: 'Guilherme',
    });

    await expect(
      createUserService.execute({
        email: 'guilherme@gmail.com',
        password: '123456',
        name: 'Guilherme',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
