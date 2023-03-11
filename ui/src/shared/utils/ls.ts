export const ls = {
  save: async <D = unknown>(key: string, data: D) => {
    try {
      localStorage.setItem(key, typeof data === "string" ? data : JSON.stringify(data));

      return data;
    } catch (error) {
      return null;
    }
  },

  get: async <R = unknown>(key: string) => {
    try {
      return localStorage.getItem(key) as R;
    } catch (error) {
      return null;
    }
  },

  delete: async (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return null;
    }
  },
};
