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

  onClearList(): void {
    const groceryList: GroceryList = {
      ...this.groceryList,
      groceryListItems: []
    };
    
    this.updateGroceryList(groceryList);
  }

  onCreatedListItem(listItem: GroceryListItem) {
    listItem.groceryListId = this.groceryList.id;

    const groceryList: GroceryList = {
      ...this.groceryList,
      groceryListItems: [
        ...this.groceryList.groceryListItems,
        listItem
      ]
    };
    
    this.updateGroceryList(groceryList);
  }

  onEditedListItem(listItem: GroceryListItem) {
    const groceryList: GroceryList = {...this.groceryList}

    let matchingItemIndex = groceryList.groceryListItems
      .findIndex((item) =>
        item.id === listItem.id
      );

    groceryList.groceryListItems[matchingItemIndex] = { ...listItem }

    this.updateGroceryList(groceryList);
  }

  onDeletedListItem(listItem: GroceryListItem) {
    const groceryList: GroceryList = {...this.groceryList}

    groceryList.groceryListItems
      .splice(groceryList.groceryListItems.findIndex((item) => 
        item.id === listItem.id
      ), 1);

    this.updateGroceryList(groceryList);
  }

  updateGroceryList(groceryList: GroceryList) {
    this.groceryListService.updateGroceryList(groceryList).subscribe((response: GroceryList) => {
      this.groceryList = response;
    })
  }
}
