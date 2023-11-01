export interface IBook {
    id: string;
    volumeInfo: {
        title: string;
        authors?: Array<string>;
        description?: string;
        imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
        };
        averageRating?: number;
        ratingsCount?: number;
    };
    saleInfo: {
        saleability: string;
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
    };
}

export interface IAPIResponse {
    items: IBook[];
}