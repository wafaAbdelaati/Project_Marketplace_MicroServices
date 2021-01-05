import { SubCategory } from './subCategory';
import { Product, ProductPage } from './product';

export class Category {
    id: string;
    name: string;
    inHome:Boolean;
    subCategories:SubCategory[];
    products:Product[];
    productsPage:ProductPage;
  }