import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const saveProduct = async (product: {color: string, reference: string, taille: string, price: string|number}) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST", 
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(product)
      }
    )
  
    const result = await res.json()
  }

export const saveProductCollection = async (formData: FormData, products: any) => {
  // @ts-ignore
    const name = formData.get('name').toString()
    const rawData = {
    name: formData.get('name'),
    slug: `${name.replace(/\s/g, '-')}-${formData.get('segment')}`.toLowerCase(),
    segment: formData.get('segment')
    }

    console.log(rawData);
      
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product_collections`,
      {
        method: "POST", 
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(rawData)
      }
    )
  
    const result = await res.json()
    // @ts-ignore
    const p = products.map(product => ({...product, reference: product.reference.toString(), productCollection: result["@id"]}))

    const setProducts = async () => {
        const promises = p.map(saveProduct)
        const result = await Promise.all(promises)
    
        return result
      }
    
    const ress = await setProducts()

    revalidatePath(`/${result["slug"]}`)
    redirect(`/${result["slug"]}`)
  }