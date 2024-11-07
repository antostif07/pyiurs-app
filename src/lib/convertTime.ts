export function convertirEnHeureMinute(decimal: string|number) {
    if(!decimal) {
        return null
    }
    if(typeof decimal === "string") {
        return decimal?.split('\n')[0]
    }
    // Multiplier par 24 pour obtenir le nombre total d'heures
    let totalHeures = decimal * 24;

    // Extraire les heures entières
    let heures = Math.floor(totalHeures);

    // Calculer les minutes restantes
    let minutes = Math.round((totalHeures - heures) * 60);

    // Retourner le résultat formaté
    return `${heures}:${minutes}`;
}