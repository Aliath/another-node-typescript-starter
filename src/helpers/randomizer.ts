export const randomizer = (min = 0, max = 1, includeMax = true) => {
  const randomRange = max - min;

  return (
    min +
    Math.floor(Math.random() * (includeMax ? randomRange + 1 : randomRange))
  );
};
