/// <reference path="./types.d.ts" />
class Item {
  author: string;
  createdAt: string;

  constructor(data = "{}") {
    const {author, createdAt} = JSON.parse(data);
    this.author = author;
    this.createdAt = createdAt || Date.now().toString()
  }

  toString() {
    return JSON.stringify(this)
  }
}

class NebulasGistContract {

  constructor() {
    LocalContractStorage.defineMapProperty(this, "repo", {
      parse(text) {
        return new Item(text);
      },
      stringify(o) {
        return o.toString();
      }
    });
  }

  init() {

    // nothing
  }

  create(hash: string) {

    hash = hash.trim();
    if (hash === "") {
      throw new Error("empty hash");
    }

    const item = this.repo.get(hash);
    if (item) {
      throw new Error("hash has been occupied");
    }

    const from = Blockchain.transaction.from;
    let hashItem = new Item();
    hashItem.author = from;
    this.repo.put(hash, hashItem);
  }


  get(hash: string) {
    hash = hash.trim();
    if (hash === "") {
      throw new Error("empty hash")
    }
    return this.repo.get(hash);
  }

}

module.exports = NebulasGistContract;
