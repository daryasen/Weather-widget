import {NextApiRequest, NextApiResponse} from "next";


const validate = (email: string, password: string) => {
    if (!email || !password) {
        const incorrectFields = [];
        if (!email) {
            incorrectFields.push('email');
        }
        if (!password) {
            incorrectFields.push('password');
        }
        return {error: true, message: 'Email or password are empty', fields: incorrectFields};
    }
    const emailIsValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    const passwordIsValid = password.length >= 8;
    if (!emailIsValid || !passwordIsValid) {
        const incorrectFields = [];
        if (!emailIsValid) {
            incorrectFields.push('email');
        }
        if (!passwordIsValid) {
            incorrectFields.push('password');
        }
        return {error: true, message: 'Email or password are incorrect', fields: incorrectFields};
    }
    return {error: false};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({error: true, message: `Method ${req.method} not allowed`});
    }

    const {email, password} = req.body;
    // Ваша функция для валидации
    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
        res.status(400).send(validatedInfo);
    } else {
        res.status(200).send({
            success: true,
            token: 'testToken',
            user: {
                email: email,
                name: 'John Smith',
                about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, \n' +
                    'ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor \n' +
                    'quis ipsum. Proin mollis pellentesque nulla ac varius.',
            }
        });
    }
}
