import {NextApiRequest, NextApiResponse} from "next";
import {IBook, IAPIResponse} from "@/data/types";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).send({error: true, message: `Method ${req.method} not allowed`});
    }
    const {subject, pageIndex} = req.query;

    const gbooksReqParams = new URLSearchParams();
    if (!subject) {
        res.status(400).send({error: true, message: 'Subject is required'});
    } else {
        gbooksReqParams.set('q', `Subject:${subject}`);
    }
    if (!pageIndex || typeof pageIndex !== 'string') {
        res.status(400).send({error: true, message: 'Page index is required'});

    } else {
        gbooksReqParams.set('startIndex', pageIndex.toString());
    }
    gbooksReqParams.set('maxResults', '6');


    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`)

    const booksData: IAPIResponse = await response.json();
    if (!response.ok) {
        res.status(400).send({error: true, message: "Something went wrong"});
    } else {
        res.status(200).send(
            booksData.items
        )
    }

}