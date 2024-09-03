//@ts-ignore
export const fetcher = async (url: string, token: string|null) => {
    const res = await fetch(url, {
        headers: {
            "content-type": "application/ld+json",
            "Authorization": `Bearer ${token}`
          },
    })

    return res.json()
}