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
      id: 1,
      user_id: '1',
      status: 'open'
    });
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'open'
    });
  });

  it('create method should add products to order', async () => {
    const result: Order = await store.addProduct(1, "1", "1")
    expect(result.id).toEqual(1);
  })

  it('index method should return a list of orders', async () => {
    const result: Order[] = await store.index();
    expect(result.length).toEqual(1);
  });

  it('show method should return the correct order', async () => {
    const result: Order = await store.show("1");
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'open'
    });
  });

  it('delete method should remove the order', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});