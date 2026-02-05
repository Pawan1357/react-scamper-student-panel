import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'antd/es/form/interface';

import { VALIDATION_MESSAGES } from './constants';

type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => void;

export const validators = {
  validateNewPasswordIsDifferent: (
    getFieldValue: (field: string) => StoreValue,
    fieldName: string
  ): Validator => {
    return (_: RuleObject, value: StoreValue, callback: (error?: string) => void): void => {
      if (value && value === getFieldValue(fieldName)) {
        callback(VALIDATION_MESSAGES.NEW_PASSWORD.DIFFERENT_FROM_CURRENT);
      } else {
        callback();
      }
    };
  },

  validateNewPassword: (
    getFieldValue: (field: string) => StoreValue,
    fieldName: string
  ): Validator => {
    return (_: RuleObject, value: StoreValue, callback: (error?: string) => void): void => {
      if (!value || getFieldValue(fieldName) === value) {
        callback(); // valid
      } else {
        callback(VALIDATION_MESSAGES.NEW_PASSWORD.MISMATCH);
      }
    };
  },

  validatePhoneNumber: async (_: RuleObject, value: string) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error(VALIDATION_MESSAGES.PHONE_NUMBER.REQUIRED));
    }

    // Value is already numeric due to getValueFromEvent
    if (!VALIDATION_MESSAGES.PHONE_NUMBER.INVALID.REGEX.test(value)) {
      return Promise.reject(new Error(VALIDATION_MESSAGES.PHONE_NUMBER.INVALID.MESSAGE));
    }

    return Promise.resolve();
  },

  validatePositiveNumber: async (_: RuleObject, value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return Promise.resolve(); // Let required rule handle this
    }

    if (typeof value !== 'number' || value <= 0) {
      return Promise.reject(new Error('Value must be greater than 0'));
    }

    return Promise.resolve();
  },

  validatePositiveInteger: async (_: RuleObject, value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return Promise.resolve(); // Let required rule handle this
    }

    if (typeof value !== 'number') {
      return Promise.reject(new Error('Please enter a valid number'));
    }

    if (value <= 0) {
      return Promise.reject(new Error('Value must be greater than 0'));
    }

    if (!Number.isInteger(value)) {
      return Promise.reject(new Error('Please enter a whole number only'));
    }

    return Promise.resolve();
  }
};
