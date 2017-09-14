import { expect } from 'chai';
import cleanString from '../helpers/cleanString';

describe('Test helpers', () => {
  it('should remove whitespaces', () => {
    expect(cleanString('ab d')).to.equal('abd');
  });
});
