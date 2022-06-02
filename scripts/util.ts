export const sequentially = async <T, P>(
  elements: T[],
  toPromise: (element: T) => Promise<P>,
): Promise<P[]> => {
  const results: P[] = [];
  await elements.reduce(async (sequence, element) => {
    await sequence;
    results.push(await toPromise(element));
  }, Promise.resolve());

  return results;
};
