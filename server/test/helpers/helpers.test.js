import { expect } from 'chai';
import cleanString from '../../../shared/cleanString';
import isEmail from '../../../shared/isEmail';
import isEmpty from '../../helpers/isEmpty';
import isNumber from '../../helpers/isNumber';
import isAlphaNum from '../../../shared/isAlphaNum';

describe('Test helpers functions', () => {
  describe('cleanString', () => {
    it('should remove white spaces from a passed string argument', () => {
      expect(cleanString('ab d')).to.equal('abd');
    });
  });

  describe('isEmail', () => {
    it('should return true if passed argument is a valid email address', () => {
      expect(isEmail('jay@gmail.com')).to.be.equal(true);
    });

    it('should return false if passed argument is an invalid email address',
      () => {
        expect(isEmail('jay@.com')).to.be.equal(false);
      });
  });

  describe('isEmpty', () => {
    it('should return false if passed argument is an empty string', () => {
      expect(isEmpty(' ')).to.be.equal(true);
    });

    it('should return false if passed argument is not an empty string', () => {
      expect(isEmpty('char')).to.be.equal(false);
    });
  });

  describe('isNumber', () => {
    it('should return true if passed argument contains numeric values only',
      () => {
        expect(isNumber('2')).to.be.equal(true);
      });

    it('should return false if passed argument does not contain numeric ' +
    'values only',
    () => {
      expect(isNumber('alpha')).to.be.equal(false);
    });
  });

  describe('isAlphaNum', () => {
    it('should return true if passed argument contains alphabets and ' +
    'numbers only', () => {
      expect(isAlphaNum('bond007')).to.be.equal(true);
    });

    it('should return false if passed argument does not have alphabets and ' +
    'numbers only', () => {
      expect(isAlphaNum('%^')).to.be.equal(false);
    });
  });
});
