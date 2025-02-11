import {getSession} from "@/src/actions/auth";

export const saveMediaObject = async (body: FormData) => {
    const session = await getSession()
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/media_objects`,
        {
            method: "POST",
            body: body,
            headers: {
                // "content-type": "application/json",
                "Authorization": `Bearer ${session.token}`
            },
        })

    return await res.json()
  }