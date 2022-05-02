import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GroceryList } from '../models/grocery-list';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GroceryListService {
    private groceryListApiUrl: string = `${environment.apiUrl}/groceryList/`
    
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
        return this.http.get<GroceryList>(this.groceryListApiUrl);
    }

    updateGroceryList(groceryList: GroceryList): Observable<GroceryList> {
        return this.http.patch<GroceryList>(this.groceryListApiUrl, groceryList).pipe(
            catchError(this.handleError)
        );
    }
}
