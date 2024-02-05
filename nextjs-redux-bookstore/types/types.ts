import { ReactNode } from "react";
import { StaticImageData } from 'next/image';

export interface IdataSlider {
    id: number,
    image: StaticImageData,
}

export type TchildrenProps = {
    children: ReactNode;
}

export type TfetchTicketsError = {  // тип описывает структуру объекта ошибки запроса к серверу
    message: string;
    };


export interface IdataBooks {
    id: string,
    volumeInfo: {
        imageLinks: {
            thumbnail: string,
        },
        authors: string[],
        title: string,
        averageRating: number,
        ratingsCount: number,
        description: string,
    },
    saleInfo: {
        retailPrice: {
            amount: number,
        }
    },
};

export type TbooksInitState = { // типы для обработки запроса статусов к серверу
    sliderData: IdataSlider[],
    sliderIndex: number,
    dataBooks: {
        items: IdataBooks[],
    };
    error: string | null;
    status: "loading" | "idle";
    paramsFetch: IparamsFetch;
    listCategories: string[];
    dataCart: {
        itemsCart: IdataBooks[],
    };
    dataCartDetails: {
        itemsCartDetails: IdataBooks[],
    },
    generalArreyCart: IdataBooks[],
    login: boolean,
    email: string,
    password: string,
    emailDirty: boolean,
    passDirty: boolean,
    emailError: string,
    passError: string,
    validForm: boolean,
    mailProfile: string,
    nameProfile: string,
};

export interface IparamsFetch {
    subject: string,
    maxResults: number,
};

export type TpropsBtnBuy = {
    id: string,
}



