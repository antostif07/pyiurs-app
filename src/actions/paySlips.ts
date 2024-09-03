export const getUserMonthPayments = async (searchParams?: string) => {
    const res = await fetch(`${process.env.API_URL}/user_month_payments?${searchParams}`, {
      headers: {
        "content-type": "application/ld+json"
      },
      next: {revalidate: 5, tags: ["attendances"]}
    })
  
    return res.json()
  }

  export const getUserMonthPaymentsClientC = async (searchParams?: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_month_payments?${searchParams}`, {
      headers: {
        "content-type": "application/ld+json"
      },
      next: {revalidate: 5, tags: ["attendances"]}
    })
  
    return res.json()
  }