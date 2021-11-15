type CounterKey = string | boolean | number;

interface CounterKeyFunc<T> {
    (item: T): CounterKey;
}

export class Counter<T> extends Map<CounterKey, number> {
  key: CounterKeyFunc<T>;
  constructor(items: Iterable<T>, key: CounterKeyFunc<T>) {
      super();
      this.key = key;
      for (let x of items) {
          this.add(x);
      }
  }
  add(x: any) {
    x = this.key(x);
    this.set(x, (this.get(x) || 0) + 1);
  }
}
