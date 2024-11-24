class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
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
    if (this.length() + 1 > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      let newHashMap = new HashMap(0.75, 32);
      this.bucket.forEach((node) => {
        const nodeKey = Array.from(node.keys())[0];
        let hashCode = newHashMap.hash(nodeKey);
        if (hashCode < 0 || hashCode >= newHashMap.length) {
          throw new Error("Trying to access index out of bounds");
        }
        newHashMap.bucket[hashCode] = new Map(node);
      });
      this.bucket = newHashMap.bucket;
      console.log(newHashMap);
    }
    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.bucket[hashCode] === undefined) {
      const mapStorage = new Map();
      this.bucket[hashCode] = mapStorage.set(key, value);
    } else {
      this.bucket[hashCode].set(key, value);
    }
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

  remove(key) {
    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.bucket[hashCode] !== undefined) {
      this.bucket[hashCode].delete(key);
      return true;
    } else {
      return false;
    }
  }

  length() {
    let count = 0;
    for (let map of this.bucket) {
      if (map !== undefined) {
        count += map.size;
      }
    }
    return count;
  }

  clear() {
    this.bucket = new Array(this.capacity);
  }

  keys() {
    let list = [];
    for (let map of this.bucket) {
      if (map !== undefined) {
        for (let entry of map.keys()) {
          list.push(entry);
        }
      }
    }
    return list;
  }

  values() {
    let list = [];
    for (let map of this.bucket) {
      if (map !== undefined) {
        for (let entry of map.values()) {
          list.push(entry);
        }
      }
    }
    return list;
  }

  entries() {
    let output = [];
    for (let map of this.bucket) {
      if (map !== undefined) {
        for (let [key, value] of map) {
          output.push([key, value]);
        }
      }
    }
    return output;
  }
}

const cat = new HashMap(0.75, 16);
cat.set("lol", "no");
