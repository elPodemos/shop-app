import { Injectable } from '@angular/core';

import { Products } from './mock-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  fetchAll(){
    return Products;
  }

  fetchById(id: number){
    return Products[id-1];
  }
}
