const sortArray = (key, array, keysToMerge) => {
  const sorted = array.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key];
    const el = rv.find((r) => r && r.key === v);

    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }

    return rv;
  }, []);

  // Créer un objet avec les clés demandées
  const result = keysToMerge.reduce((obj, key) => {
    const entry = sorted.find((entry) => entry.key === key);
    obj[key] = entry ? entry.values : [];
    return obj;
  }, {});

  return result;
};

module.exports = { sortArray };
