import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GroceryList } from '../models/grocery-list';
import { GroceryListItem } from '../models/grocery-list-item';

@Injectable({
    providedIn: 'root',
  })
export class GroceryListService {
    private groceryList: GroceryList = new GroceryList();

    private groceryListApiUrl: string = "https://localhost:5001/groceryList/"
    constructor(private http: HttpClient) { }

    handleError(error: HttpErrorResponse) {
        let errorMessage;

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(errorMessage);
      }

    getGroceryList(): Observable<GroceryList> {
        return this.http.get<GroceryList>(this.groceryListApiUrl + "2");
    }

    updateGroceryList(groceryList: GroceryList): Observable<GroceryList> {
        return this.http.patch<GroceryList>(this.groceryListApiUrl, groceryList).pipe(
            catchError(this.handleError)
        );
    }
}
