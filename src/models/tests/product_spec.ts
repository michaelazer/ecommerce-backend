import { Product, ProductStore } from '../product';

const store = new ProductStore()

let created_product: number = 0

describe("Product Model", () => {
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

  it('create method should add a product', async () => {
    const result: Product = await store.create({
      name: 'test_product',
      price: '100'
    });
    expect(result).toEqual(jasmine.objectContaining({
      name: 'test_product',
      price: '100'
    }));
    created_product = result.id as number
  });

  it('index method should return a list of products', async () => {
    const result: Product[] = await store.index();
    expect(result.length).toEqual(1);
  });

  it('show method should return the correct product', async () => {
    const result: Product = await store.show(created_product.toString());
    expect(result).toEqual(jasmine.objectContaining({
      name: 'test_product',
      price: '100'
    }));
  });

  it('delete method should remove the product', async () => {
    const _deleted = await store.delete(created_product.toString());
    const result = await store.index();

    expect(result).toEqual([]);
  });
});