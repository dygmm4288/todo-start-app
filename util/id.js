export const makeId = (() => {
  let id = 0;
  return () => id++;
})();
