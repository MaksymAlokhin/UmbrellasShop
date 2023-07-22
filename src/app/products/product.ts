export interface IProduct {
    id: number | null;
    productName: string | null;
    productCode: string | null;
    tags?: string[];
    releaseDate: string | null;
    price: number | null;
    description: string | null;
    starRating: number | null;
    imageUrl: string | null;
}