export class Storage {
  public static readonly APP_PREFIX = 'autotune_';

  private static key(key: string) {
    return this.APP_PREFIX + key;
  }

  public static get(key: string, json = false) {
    const value = localStorage.getItem(Storage.key(key));
    if (value && json) {
      return JSON.parse(value);
    }
    return value;
  }

  public static set(key: string, value: any) {
    if (value === null || value === undefined) {
      return localStorage.removeItem(Storage.key(key));
    }
    switch (typeof value) {
      case 'object': {
        return localStorage.setItem(Storage.key(key), JSON.stringify(value));
      }
      case 'boolean':
      case 'number': {
        return localStorage.setItem(Storage.key(key), String(value))
      }
      default: {
        return localStorage.setItem(Storage.key(key), value as string);
      }
    }
  }

  public static clean() {
    for (const key in localStorage) {
      if (key.startsWith(Storage.APP_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  }
}