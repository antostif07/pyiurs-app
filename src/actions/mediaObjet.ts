export const saveMediaObject = async (body: FormData) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/media_objects`,
      {
        method: "POST",
        body: body
      }
    )
    
    const result = await res.json()
    
    return result
  }