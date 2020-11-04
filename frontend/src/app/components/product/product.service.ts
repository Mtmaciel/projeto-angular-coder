import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";
  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showOnConsole(msg: string): void {
    console.log(msg);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e:any,optioanaltext:string = 'Erro encontrado'):Observable<any>{
    this.showMessage(optioanaltext,true)
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e,'Erro ao ler os produtos'))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj=>obj),
      catchError(e=>this.errorHandler(e,'Erro ao selecionar o produto'))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj=>obj),
      catchError(e=>this.errorHandler(e,'Erro ao atualizar o Produto'))
    );
  }

  delete(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj=>obj),
      catchError(e=>this.errorHandler(e,'Erro ao Excluir o Produto'))
    );
  }

}
