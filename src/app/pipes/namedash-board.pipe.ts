import { Pipe, PipeTransform } from '@angular/core';
import { Allorders } from '../interfaces/allorders';

@Pipe({
  name: 'namedashBoard',
})
export class NamedashBoardPipe implements PipeTransform {
  transform(allOrders: Allorders[], word: string): Allorders[] {
    return allOrders.filter((user) => {
      return (
        user.user.name.toLowerCase().includes(word.toLowerCase()) ||
        user.user.email.toLowerCase().includes(word.toLowerCase())
      );
    });
  }
}
