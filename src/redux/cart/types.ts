export type CartItem = {
    id: number;
    title: string;
    imageUrl: string;
    size: number;
    type: number;
    count: number;
    price: number;
}

export interface ICartSlice {
    totalPrice: number;
    items: CartItem[]
}