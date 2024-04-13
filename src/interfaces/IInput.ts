// import { IProduct } from "./IProduct";
import { TProductName } from "../Types";

export interface IFormInput {
    id: string;
    // name: keyof IProduct;
    name: TProductName;
    type: string;
    label: string;

}