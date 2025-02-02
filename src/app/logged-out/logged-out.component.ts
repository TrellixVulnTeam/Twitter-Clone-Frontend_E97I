import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-logged-out-homepage',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public authService: AuthenticationService, public modalService: ModalService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
  }

  openRegistration() {
    this.modalService.profileEditorModalOpen = true;
  }
}
