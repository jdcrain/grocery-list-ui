import { Component, OnInit } from '@angular/core';
import { GroceryList } from 'src/app/models/grocery-list';
import { GroceryListService } from 'src/app/services/grocery-list.service';
import { GroceryListItem } from 'src/app/models/grocery-list-item';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  groceryList: GroceryList = new GroceryList();

  constructor(private groceryListService: GroceryListService) { }

  ngOnInit() {
    this.groceryListService.getGroceryList().subscribe((response: GroceryList) => {
      this.groceryList = response;
    })
  }

  onCreatedListItem(listItem: GroceryListItem) {
      this.groceryList.groceryListItems = [...this.groceryList.groceryListItems, listItem];
      
      this.groceryListService.updateGroceryList(this.groceryList).subscribe((response: GroceryList) => {
        this.groceryList = response;
      })
  }

}
