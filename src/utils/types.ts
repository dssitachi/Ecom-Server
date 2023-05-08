export interface Product {
    id: string;
    name: string;
    img: string;
    description: string;
    price: number;
    category: string;
}

export interface ApiResponse {
    response: Array<any> | Object;
    message: string;
}

export interface User {
    email: string;
    password: string;
}
