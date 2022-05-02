import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { GroceryListItem } from 'src/app/models/grocery-list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: GroceryListItem = new GroceryListItem();

  @Output() deleteListItem = new EventEmitter<GroceryListItem>();
  @Output() editListItem = new EventEmitter<GroceryListItem>();

  isEditing: boolean = false;
  model: GroceryListItem = new GroceryListItem();

  constructor() { }

  ngOnInit() {
    this.model = {...this.listItem}
  }

  enableEdit() {
    this.isEditing = true;
  }

  deleteItem(listItem: GroceryListItem) {
    this.deleteListItem.emit(listItem);
  }

  updateItem(listItem: GroceryListItem) {
    // if no name was provided, treat it as a delete
    if (!!listItem.name || !!listItem.name.trim()) {
      this.editListItem.emit(listItem);
    } else {
      this.deleteListItem.emit(listItem);
    }

    this.isEditing = false;
  }

}
