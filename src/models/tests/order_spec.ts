import { Order, OrderStore } from '../order';

const store = new OrderStore()

describe("Order Model", () => {
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

  it('create method should add a order', async () => {
    const result: Order = await store.create({
      user_id: '1',
      status: 'open'
    });
    expect(result).toEqual(jasmine.objectContaining({
      user_id: '1',
      status: 'open'
    }));
  });

  it('addProduct method should add products to order', async () => {
    const result: Order = await store.addProduct(1, "2", "1")
    expect(result.id).toEqual(2);
  })

  it('index method should return a list of orders', async () => {
    const result: Order[] = await store.index();
    expect(result.length).toEqual(1);
  });

  it('show method should return the correct order', async () => {
    const result: Order = await store.show("2");
    expect(result).toEqual({
      id: 2,
      user_id: '1',
      status: 'open'
    });
  });

  it('delete method should remove the order', async () => {
    const _deleted = await store.delete("2");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});