import type { NextApiRequest, NextApiResponse } from 'next';

const validForm = (email: string, password: string) => {

    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function validateEmail(email: string) {
        return reg.test(email);
    }
    if (validateEmail(email) && password.length >= 6 && password.length <= 9)
        return {
            error: false,
            message: "логин успешен",
        }
    else return {
        error: true,
        message: "логин не успешен",
    }

};

export default async function requestAllBooks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' })
    }
    const { email, password } = req.body;
    
    const validatedInfo = validForm(email, password);

    if (validatedInfo.error) {
        res.status(401).send({ error: true,email:email, password:password});
    } else {
         
        res.status(200).send({
            error: false, name: 'Batan Andrei', mail: email, pass: password,
            about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat,
    ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor
    quis ipsum. Proin mollis pellentesque nulla ac varius.` });

    }
}