function HashMap(loadFactor = 0.75, capacity = 16) {
  let resultArray = new Array(capacity);
  let count = 0;

  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };

  const rehash = () => {
    capacity *= 2;
    const oldArray = resultArray;
    resultArray = new Array(capacity);
    count = 0;

    for (const bucket of oldArray) {
      if (bucket) {
        for (const [key, value] of bucket) {
          set(key, value); // Reinserts into resized array
        }
      }
    }
  };

  const set = (key, value) => {
    // Check if the number of entries has reached the capacity
    if (count >= loadFactor * capacity) {
      rehash();
    }

    const index = hash(key);

    // Check if the index is bigger than the length of the array
    if (index < 0 || index >= resultArray.length) {
      throw new Error('Trying to access index out of bounds');
    }

    resultArray[index] = resultArray[index] || [];

    // Check if the key already exists
    for (let i = 0; i < resultArray[index].length; i++) {
      const [storedKey, _] = resultArray[index][i];

      if (storedKey === key) {
        // Update existing key
        resultArray[index][i][1] = value;
        return;
      }
    }

    // If key not found, add it
    resultArray[index].push([key, value]);
    count++;
  };

  const get = (key) => {
    const index = hash(key);

    if (index < 0 || index >= resultArray.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const items = resultArray[index];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i][0] === key) {
          return items[i][1];
        }
      }
    }

    return null;
  };

  const has = (key) => {
    const index = hash(key);

    if (index < 0 || index >= resultArray.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const items = resultArray[index];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i][0] === key) {
          return true;
        }
      }
    }

    return false;
  };

  const remove = (key) => {
    const index = hash(key);

    if (index < 0 || index >= resultArray.length) {
      throw new Error('Trying to access index out of bounds');
    }

    const items = resultArray[index];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i][0] === key) {
          items.splice(i, 1);
          count--;
          return true;
        }
      }
    }

    return false;
  };

  const length = () => {
    // let size = 0;

    // for (let i = 0; i < resultArray.length; i++) {
    //   if (resultArray[i] !== undefined) {
    //     size += resultArray[i].length;
    //   }
    // }
    // return size;
    return count;
  };

  const clear = () => {
    for (let i = 0; i < resultArray.length; i++) {
      if (resultArray[i]) {
        resultArray[i] = [];
      }
    }
  };

  const keys = () => {
    const keysArray = [];

    for (const bucket of resultArray) {
      if (bucket) {
        for (const [key, _] of bucket) {
          keysArray.push(key);
        }
      }
    }

    return keysArray;
  };

  const values = () => {
    const valuesArray = [];

    for (const bucket of resultArray) {
      if (bucket) {
        for (const [_, value] of bucket) {
          valuesArray.push(value);
        }
      }
    }

    return valuesArray;
  };

  const entries = () => {
    const entriesArray = [];

    for (const bucket of resultArray) {
      if (bucket) {
        for (const [key, value] of bucket) {
          entriesArray.push([key, value]);
        }
      }
    }

    return entriesArray;
  };

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

export { HashMap };
