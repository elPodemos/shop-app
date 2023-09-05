import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`
})
export class AppComponent {
  title = 'shop-app';

  constructor(
    private service:ProductService,
  ){}

  listProducts?: IProduct[] = [];
  products?: IProduct;

  addProducts?: any[] = [];
  addProduct: any[] = [];

  quantiteT:number;
  prixHTTOTAL:number;
  prixTTCTOTAL:number;

  updateTotal(){
    let prix = 0
    let quantite = 0
    this.addProducts?.forEach( product => {
      prix = prix + (product[2]);
      quantite = quantite + (product[1]);
    })
    this.quantiteT = quantite;
    this.prixHTTOTAL = quantite * prix;
    this.prixTTCTOTAL = (quantite * prix) * 1.20;
  }

  deleteProduct(id:number){
    let spliced = this.addProducts?.splice(id, 1);
    this.updateTotal();
  }

  deletePanier(){
    this.addProducts = [];
    this.updateTotal();
  }

  getProducts(){
    this.listProducts = this.service.fetchAll();
    return this.listProducts;
  }

  getProductsById(id:number){
    this.products = this.service.fetchById(id);
    return this.products;
  }

  addQuantite(id:number){
    this.getProductsById(id).quantite ++;
  }

  subtractQuantite(id:number){
    if(this.getProductsById(id).quantite > 0){
      this.getProductsById(id).quantite --;
    }else{
      this.getProductsById(id).quantite = 0;
    }
  }

  addPanier(id:number){
    if(this.getProductsById(id).quantite > 0){
      this.addProduct = [
        this.getProductsById(id).nom,
        this.getProductsById(id).quantite,
        this.getProductsById(id).prixHT,
      ];
      this.addProducts?.push(this.addProduct);
      this.getProductsById(id).quantite = 0;
      this.updateTotal();
    }
  }

}
