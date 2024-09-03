// @ts-ignore
export function transformData(data): Array {
    const headers = data[0];
    const rows = data.slice(1);
    //@ts-ignore
    const transformedData = rows.map(row => {
      const object = {};
      for (let i = 0; i < headers.length; i++) {
        // @ts-ignore
        object[headers[i]] = row[i];
      }
      return object;
    });
  
    return transformedData;
  }