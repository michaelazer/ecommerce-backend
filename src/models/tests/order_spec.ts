import { Order, OrderStore, Order_Products } from '../order';

const store = new OrderStore()

let created_order: number = 0

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
    created_order = result.id as number
  });

  it('addProduct method should add products to order', async () => {
    const result: Order_Products = await store.addProduct(1, created_order.toString(), "1")
    expect(result.order_id).toEqual(created_order.toString());
  })

  it('index method should return a list of orders', async () => {
    const result: Order[] = await store.index();
    expect(result.length).toEqual(1);
  });

  it('show method should return the correct order', async () => {
    const result: Order = await store.show(created_order.toString());
    expect(result).toEqual(jasmine.objectContaining({
      user_id: '1',
      status: 'open'
    }));
  });

  it('delete method should remove the order', async () => {
    const _deleted = await store.delete(created_order.toString());
    const result = await store.index()

    expect(result).toEqual([]);
  });
});