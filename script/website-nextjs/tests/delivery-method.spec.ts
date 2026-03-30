import { test, expect } from '@playwright/test';
import { getDeliveryMethodName } from '../src/utils/delivery-method';

test.describe('getDeliveryMethodName', () => {
  test('returns display name when key matches', () => {
    const name = getDeliveryMethodName('Home');

    expect(name).toBe('宅配到府');
  });

  test('returns fallback when key does not match', () => {
    const name = getDeliveryMethodName('Unknown');

    expect(name).toBe('未知運送方式');
  });

  test('returns fallback when key is empty or missing', () => {
    expect(getDeliveryMethodName('')).toBe('未知運送方式');
    expect(getDeliveryMethodName()).toBe('未知運送方式');
  });
});
