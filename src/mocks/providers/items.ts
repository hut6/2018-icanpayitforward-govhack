import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
      "name": "Some Guy",
      "profilePic": "assets/img/speakers/bear.jpg",
      "distance": "10km",
      "litter": "12",
      "Note": "10m"
  };


  constructor() {
    let items = [
      {
        "name": "Some Guy",
        "profilePic": "assets/img/speakers/bear.jpg",
        "distance": "10km",
        "litter": "12",
        "note": "10m"
      },
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
