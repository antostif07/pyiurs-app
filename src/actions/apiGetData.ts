import { NextApiRequest, NextApiResponse } from "next";

// Définition du type pour les données de l'API
type ApiData<T> = {
  data: T;
};

// Fonction générique pour les appels API
const apiGetData = async <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  endpoint: string
): Promise<ApiData<T> | void> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const response = await fetch(apiUrl, {
      headers: {
        "content-type": "application/ld+json",
        // "Authorization": `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json() as ApiData<T>;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default apiGetData;