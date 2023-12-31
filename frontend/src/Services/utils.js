export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  export const baseURL ='http://localhost:5000/api'

  export const baseRoot = 'http://localhost:5000'