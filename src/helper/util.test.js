import { formatCurrency, formatUrlParams, unformatCurrency } from './util';

describe('util', () => {
  it('should format currency', () => {
    expect(formatCurrency(1234567890)).toStrictEqual('₹1,23,45,67,890.00');
  });

  it('should unformat currency', () => {
    expect(unformatCurrency('₹1,23,45,67,890.00')).toStrictEqual(1234567890);
  });

  it('should format url params', () => {
    expect(formatUrlParams({ hello: 'hello', world: 'world' })).toStrictEqual('hello=hello&world=world');
  });
});
