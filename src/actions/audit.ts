'use server'
import {revalidateTag} from 'next/cache';
import {z} from 'zod'
import { format } from 'date-fns';
import { Audit } from '@/src/common/Audit';
import {getSession} from "@/src/actions/auth";

const FormSchema = z.object({
    name: z.string(),
    assignment: z.string(),
    segment: z.string(),
    categories: z.string(),
    start_date: z.string(),
    baseFile: z.string().nullable(),
    totalBaseFile: z.string().nullable()
  })

const CreateAudit = FormSchema.omit({});

export const updateAudit = async (body: Audit, id: any, params?: {redirectLink?: string}) => {
    const session = await getSession()

    const res = await fetch(
        `${process.env.API_URL}/audits/${id}`,
        {
            method: "PATCH",
            headers: {
                "content-type": "application/merge-patch+json",
                "Authorization": `Bearer ${session.token}`
            },
            body: JSON.stringify(body)
        })

    const r = await res.json()

    if(params && params.redirectLink) {
        revalidateTag('audits')
        return r
    } else {
        return r;
    }
}

export default async function createAudit(formData: FormData,) {
    const {name, assignment, segment, categories, start_date,} = CreateAudit.parse({
        name: formData.get('name'),
        assignment: formData.get('assignment'),
        segment: formData.get('segment'),
        categories: formData.get('categories'),
        start_date: formData.get('start_date'),
    })

    const rawData = {
        name: name,
        assignment: assignment,
        segment: segment,
        categories: categories,
        start_date: format(start_date, "yyyy-MM-dd"),
    }

    const session = await getSession()

    const res = await fetch(`${process.env.API_URL}/audits`, {
        method: "POST",
        headers: {
            "content-type": "application/ld+json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(rawData)
    })

    const r = await res.json()

    if(r.status && r.status !== 201) {
        console.log(r.status, r.detail)
    } else {
        revalidateTag("audits")
    }

    return r
}