import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage',
})
export class UserImagePipe implements PipeTransform {
  transform(userImage: string, avatar: string): string {
    return userImage ? userImage : avatar;
  }
}
