import { randomizer } from '@/helpers/randomizer';

describe('check randomizer function', () => {
  it('returns a number', () => {
    expect(typeof randomizer()).toBe('number');
  });

  it('returns number between [0, 1]', () => {
    const result = randomizer(0, 1, true);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('returns number between [n, n]', () => {
    const x = Math.round(Math.random() * 1000);
    expect(randomizer(x, x, true)).toBe(x);
    expect(randomizer(x, x, false)).toBe(x);
  });
});
