import { formatCurrency } from './util';

describe('util', () => {
  it('should format currency', () => {
    expect(formatCurrency(1234567890)).toStrictEqual('₹1,23,45,67,890.00');
  });
});
