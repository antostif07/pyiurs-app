export function isNumber(text: string) {
  const number = parseFloat(text);
  return !isNaN(number) && Number.isFinite(number);
}

export const parseFormData = async (formData: FormData) => {
    const data = {};
  
    // Boucle sur chaque entrée du FormData
    // @ts-ignore
    for (const [key, value] of formData.entries()) {
      // Convertir les valeurs en chaînes de caractères
      
      const stringValue = key === "month" ? String(value) : isNumber(value) ? Number(value) : String(value);
      
      // Assigner la valeur à l'objet de données
      // @ts-ignore
      data[key] = stringValue;
    }
    
    return data;
  };