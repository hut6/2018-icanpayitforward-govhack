import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  query(params?: any): Promise<any> {
    return this.api.get('get-trips.php', params).toPromise();
  }

  add(item: Item): Promise<any> {
      return this.api.post('add-trip.php', {tripData: JSON.stringify(item)} ).toPromise();
  }

  delete(item: Item) {
  }

}
