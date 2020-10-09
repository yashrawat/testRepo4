import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  // on signup
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(this.signupForm.get('name').value, this.signupForm.get('email').value, this.signupForm.get('password').value);
  }

  // password matcher
  passwordMatcher(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true };
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatcher });

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  // unsubscribe authStatusSub
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
