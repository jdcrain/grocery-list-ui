import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroceryListItem } from 'src/app/models/grocery-list-item';

@Component({
  selector: 'app-list-item-create',
  templateUrl: './list-item-create.component.html',
  styleUrls: ['./list-item-create.component.scss']
})
export class ListItemCreateComponent {
  model = new GroceryListItem();

  constructor() { 
  }

  onAddItem(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    form.resetForm();
  }
}
