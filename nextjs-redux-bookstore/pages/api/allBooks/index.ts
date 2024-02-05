import type { NextApiRequest, NextApiResponse } from 'next'


export default async function requestAllBooks(req: NextApiRequest, res: NextApiResponse) {

    const { subject, page } = req.query;

    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', `Subject:${subject}`);
    gbooksReqParams.set('key', `AIzaSyBcCLzRToIHmdzCQcf7uNtoVDpGU-sVf24`);
    gbooksReqParams.set('printType', `books`);
    gbooksReqParams.set('startIndex', `${page}`);
    gbooksReqParams.set('maxResults', `6`);
    gbooksReqParams.set('langRestrict', `en`);
    
    const result = await fetch(``)
    
    const booksData = await result.json();


    res.status(200).send({ data: booksData, })
    
if (!req.query.subject || !req.query.page) {
    res.status(400).send({
        error: true,
        message: 'No subject or page in query params'
    })
} 
}   
