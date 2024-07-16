import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSettingsService } from 'src/app/core/user-settings.service';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.css'],
})
export class SettingsUserComponent implements OnInit {
  constructor(
    private _viewportScroller: ViewportScroller,
    private _userSettingsService: UserSettingsService
  ) {}
  isLoding: boolean = false;
  account: boolean = true;
  addresse: boolean = false;
  security: boolean = false;
  name!: FormControl;
  phone!: FormControl;
  email!: FormControl;
  defultImage: any = '';
  updateFormData!: FormGroup;
  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
    this.subscriptionUserImage();
  }

  subscriptionUserImage(): void {
    this._userSettingsService.userImagePath.subscribe({
      next: (path) => {
        this.defultImage = path;
      },
    });
    if (localStorage.getItem('imageUser') !== null) {
      this.defultImage = localStorage.getItem('imageUser');
    }
  }

  selectImage() {
    this.fileInput.nativeElement.click();
  }
  uploadImage(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.defultImage = event.target?.result;
      this._userSettingsService.userImagePath.next(this.defultImage);
      localStorage.setItem('imageUser', this.defultImage);
      this._viewportScroller.scrollToPosition([0, 0]);
    };
  }
  toggleLinks(word: string): void {
    switch (word) {
      case 'account':
        this.account = true;
        this.addresse = false;
        this.security = false;
        break;
      case 'security':
        this.account = false;
        this.addresse = false;
        this.security = true;
        break;
      case 'addresse':
        this.account = false;
        this.addresse = true;
        this.security = false;
        break;
    }
  }
}
