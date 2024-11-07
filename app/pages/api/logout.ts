import {getSession} from "@/src/actions/auth";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession()

    session.destroy();

    res.status(200).json({ message: "Session destroyed" });
}