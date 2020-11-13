import { DialogComponent } from './../../plugins/dialog/dialog.component';
import { Dialog } from './../../plugins/dialog/dialog.model';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products :Product[]
  displayedColumns = ['id','name','price','action']

  constructor(private productService:ProductService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.productService.read().subscribe(products=>{
      this.products = products
    });
  }

  openDeleteDialog(id:number, name:string):void{
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'200px',
      data:{title:"Exclusão de Produto",text:"Deseja confimar exclusao do produto"+name}
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.productService.delete(id.toString()).subscribe(() => {
        this.productService.showMessage('Produto Excluido Com Sucesso')
      })
    })
  }
  
}
