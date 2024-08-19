// Define os nomes das chaves no localStorage
const TOKEN_KEY = 'authToken';
const ACCESS_PAGES_KEY = 'accessPages';


export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};


export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};


export const saveAccessPages = (pages: string[]) => {
  localStorage.setItem(ACCESS_PAGES_KEY, JSON.stringify(pages));
};


export const getAccessPages = (): string[] => {
  const pages = localStorage.getItem(ACCESS_PAGES_KEY);
  return pages ? JSON.parse(pages) : [];
};


export const removeAccessPages = () => {
  localStorage.removeItem(ACCESS_PAGES_KEY);
};

export const updateToken = (token: string) => {
  removeToken()
  saveToken(token)
}


export const serialize = (key: string, value: any): void => {
  try {
    if (typeof value === 'object' && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else if (typeof value === 'number') {
      localStorage.setItem(key, stringifyNumber(value));
    } else {
      localStorage.setItem(key, String(value));
    }
  } catch (error) {
    console.error('Error serializing data:', error);
  }
};


export const deserialize = (key: string): any => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        const numberValue = parseNumber(item);
        if (numberValue !== null) {
          return numberValue;
        }
        return item;
      }
    }
    return null;
  } catch (error) {
    console.error('Error deserializing data:', error);
    return null;
  }
}


export const parseNumber = (value: string): number | null => {
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
};


export const stringifyNumber = (value: number): string => {
  return value.toString();
};
