import {getSession} from "@/src/actions/auth";

export interface HydraCollection<T> {
  '@id'?: string,
  '@context'?: string,
  '@type'?: string,
  'hydra:totalItems'?: number,
  'hydra:member'?: Array<T>,
  message?: string,
  code?: number,
}


const apiGetData = async <T>(
  endpoint: string, tag: string
): Promise<HydraCollection<T>> => {
  try {
    const session = await getSession();

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

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
      } as HydraCollection<T>
    }

    return await response.json() as HydraCollection<T>
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default apiGetData;