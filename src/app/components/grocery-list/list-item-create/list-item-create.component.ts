import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroceryListItem } from 'src/app/models/grocery-list-item';

@Component({
  selector: 'app-list-item-create',
  templateUrl: './list-item-create.component.html',
  styleUrls: ['./list-item-create.component.scss']
})
export class ListItemCreateComponent {
  @Output() createdListItem = new EventEmitter<GroceryListItem>();

  model = new GroceryListItem();

  constructor() { 
  }

  onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.createdListItem.emit(this.model);

    form.resetForm();
  }
}
