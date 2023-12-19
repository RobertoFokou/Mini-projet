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
  
    // Ensure that all keys from keysToMerge are present in the result
    keysToMerge.forEach((key) => {
      const existingEntry = sorted.find((entry) => entry.key === key);
  
      if (!existingEntry) {
        sorted.push({ key, values: [] });
      }
    });
  
    return sorted;
  };

  module.exports = {sortArray};