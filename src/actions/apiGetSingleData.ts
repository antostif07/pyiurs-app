import {getSession} from "@/src/actions/auth";

export interface HydraEntity<T> {
  data: T,
  code?: number,
  message?: string,
}


const apiGetSingleData = async <T>(
  endpoint: string, id: string, tag: string
): Promise<HydraEntity<T>> => {
  try {
    const session = await getSession();

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${id}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        "content-type": "application/ld+json",
        "Authorization": `Bearer ${session.token}`,
      },
      next: {tags: [tag]}
    });

    if(!response.ok) {
      return {
        message: `API request failed with status ${response.status}: ${response.statusText}`,
        code: response.status
      } as HydraEntity<T>
    }
    const result = await response.json()
    return {
      data: result
    } as HydraEntity<T>
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default apiGetSingleData;