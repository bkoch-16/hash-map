class HashMap {
  constructor(loadFactor, capacity) {
    this.bucket = new Array(capacity);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    const mapStorage = new Map();
    if (hashCode < 0 || hashCode >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    this.bucket[hashCode] = mapStorage.set(key, value);
  }

  get(key) {
    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.bucket[hashCode] !== undefined) {
      return this.bucket[hashCode].get(key);
    } else {
      return null;
    }
  }

  has(key) {
    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.bucket[hashCode] !== undefined) {
      return this.bucket[hashCode].has(key);
    } else {
      return false;
    }
  }
}

const cat = new HashMap(0.75, 16);
cat.set("lol", "no");
