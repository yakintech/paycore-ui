import SecureLS from "secure-ls";

export const storageHelper = {
  setStoreWithEncryption: (key: string, value: string) => {
    try {
      var ls = new SecureLS({ encodingType: "aes" });
      ls.set(key, value);
    } catch (e) {
      localStorage.clear();
    }
  },
  getStoreWithDecryption: (key: string) => {
    try {
      var ls = new SecureLS({ encodingType: "aes" });
      return ls.get(key);
    } catch (e) {
      localStorage.clear();
    }
  },
  removeStore: (key: string) => {
    var ls = new SecureLS({ encodingType: "aes" });
    ls.remove(key);
  },
};