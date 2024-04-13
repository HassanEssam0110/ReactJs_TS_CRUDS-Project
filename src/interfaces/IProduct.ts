export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
    category: {
        id?: string | undefined;
        name: string;
        imageURL: string;
    }
}