import { expect } from 'chai';
import cleanString from '../../shared/cleanString';
import isEmail from '../../shared/isEmail';
import isEmpty from '../helpers/isEmpty';
import isNumber from '../helpers/isNumber';
import isAlphaNum from '../../shared/isAlphaNum';

describe('Test helpers', () => {
  it('cleanString(ab d) should equal abd', () => {
    expect(cleanString('ab d')).to.equal('abd');
  });
  it('isEmail(jay@.com) should be false', () => {
    expect(isEmail('jay@.com')).to.be.equal(false);
  });
  it('isEmail(jay@gmail.com) should be true', () => {
    expect(isEmail('jay@gmail.com')).to.be.equal(true);
  });
  it('isEmpty( ) should be true', () => {
    expect(isEmpty(' ')).to.be.equal(true);
  });
  it('isEmpty(not) should be false', () => {
    expect(isEmpty('not')).to.be.equal(false);
  });
  it('isNumber(2) should be true', () => {
    expect(isNumber('2')).to.be.equal(true);
  });
  it('isNumber(alpha) should be false', () => {
    expect(isNumber('alpha')).to.be.equal(false);
  });
  it('isAlphaNum(%^) should be false', () => {
    expect(isAlphaNum('%^')).to.be.equal(false);
  });
  it('isAlphaNum(bond007) should be true', () => {
    expect(isAlphaNum('bond007')).to.be.equal(true);
  });
});
