import { GroceryListItem } from './grocery-list-item';

export class GroceryList {
    id: number;
    created: Date;
    modified: Date;
    userId: number;
    groceryListItems: GroceryListItem[]
}
