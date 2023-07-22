import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product';

export class ProductData implements InMemoryDbService {
  createDb(): { products: IProduct[] } {
    const products: IProduct[] = [
      {
        id: 1,
        productName: 'Colored raindrops',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Colored raindrops',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/umbrellas/umbrella-01.png',
      },
      {
        id: 2,
        productName: 'Rainbow umbrella',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: 'Rainbow umbrella',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/umbrellas/umbrella-02.png',
      },
      {
        id: 3,
        productName: 'Red umbrella',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2021',
        description: 'Red umbrella',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/umbrellas/umbrella-03.png',
      },
      {
        id: 4,
        productName: 'Blue umbrella',
        productCode: 'TBX-0022',
        releaseDate: 'May 15, 2021',
        description: 'Blue umbrella',
        price: 11.55,
        starRating: 3.7,
        imageUrl: 'assets/images/umbrellas/umbrella-04.png',
      },
      {
        id: 5,
        productName: 'Black umbrella',
        productCode: 'GMG-0042',
        releaseDate: 'October 15, 2020',
        description: 'Black umbrella',
        price: 35.95,
        starRating: 4.6,
        imageUrl: 'assets/images/umbrellas/umbrella-05.png',
      },
      {
        id: 6,
        productName: 'Pink umbrella',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Pink umbrella',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/umbrellas/umbrella-06.png',
      },
      {
        id: 7,
        productName: 'Autumn leaves umbrella',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: 'Autumn leaves umbrella',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/umbrellas/umbrella-07.png',
      },
      {
        id: 8,
        productName: 'Pink spotted umbrella',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2021',
        description: 'Pink spotted umbrella',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/umbrellas/umbrella-08.png',
      },
      {
        id: 9,
        productName: 'Dark blue umbrella',
        productCode: 'TBX-0022',
        releaseDate: 'May 15, 2021',
        description: 'Dark blue umbrella',
        price: 11.55,
        starRating: 3.7,
        imageUrl: 'assets/images/umbrellas/umbrella-09.png',
      },
      {
        id: 10,
        productName: 'Six clours umbrella',
        productCode: 'GMG-0042',
        releaseDate: 'October 15, 2020',
        description: 'Six clours umbrella',
        price: 35.95,
        starRating: 4.6,
        imageUrl: 'assets/images/umbrellas/umbrella-10.png',
      },
      {
        id: 11,
        productName: 'Deep red umbrella',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2021',
        description: 'Deep red umbrella',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/umbrellas/umbrella-11.png',
      },
      {
        id: 12,
        productName: 'Eight colours umbrella',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2021',
        description: 'Eight colours umbrella',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/umbrellas/umbrella-12.png',
      },
      {
        id: 13,
        productName: 'Blue orange red umbrella',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2021',
        description: 'Blue orange red umbrella',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/umbrellas/umbrella-13.png',
      },
      {
        id: 14,
        productName: 'Men`s umbrella',
        productCode: 'TBX-0022',
        releaseDate: 'May 15, 2021',
        description: 'Men`s umbrella',
        price: 11.55,
        starRating: 3.7,
        imageUrl: 'assets/images/umbrellas/umbrella-14.png',
      },
      {
        id: 15,
        productName: 'Big pink umberlla',
        productCode: 'GMG-0042',
        releaseDate: 'October 15, 2020',
        description: 'Big pink umberlla',
        price: 35.95,
        starRating: 4.6,
        imageUrl: 'assets/images/umbrellas/umbrella-15.png',
      },
    ];
    return { products };
  }
}
