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
}
