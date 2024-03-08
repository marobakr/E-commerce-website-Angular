import { Component, Input } from '@angular/core';

export interface AllUsers {
  createdAt: string;
  email: string;
  name: string;
  _id: string;
}

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent {
  @Input() allUsers: [] = [];
  @Input() inputSearch: string = '';
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() idPagination: string = '';
}
