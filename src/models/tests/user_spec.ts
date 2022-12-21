import { User, UserStore } from '../user';
import client from '../../database';

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result: User = await store.create({
      email: 'michael.azer@test.com',
      first_name: 'Michael',
      last_name: 'Azer',
      password: 'P@$$w0rd'
    });
    expect(result).toEqual(jasmine.objectContaining({
      email: 'michael.azer@test.com',
      first_name: 'Michael',
      last_name: 'Azer'
    }));
  });

  it('index method should return a list of users', async () => {
    const result: User[] = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct user', async () => {
    const result: User = await store.show("2");
    expect(result).toEqual(jasmine.objectContaining({
      email: 'michael.azer@test.com',
      first_name: 'Michael',
      last_name: 'Azer'
    }));
  });

  it('delete method should remove the user', async () => {
    const _deleted = await store.delete("2");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});