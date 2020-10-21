import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  constructor(private ProductService:ProductService,private router :Router) { }

  product:Product ={
    name:'',
    price:null
  }
  
  ngOnInit(): void {
    this.ProductService.showOnConsole('teste de service');
  }

  createProduct():void{
    this.ProductService.create(this.product).subscribe(()=>{
      this.ProductService.showMessage('produto Criado!!');
      this.router.navigate(['/products']);
    });
  }

  cancelProduct():void{
    this.router.navigate(['/products']);
  }

}
