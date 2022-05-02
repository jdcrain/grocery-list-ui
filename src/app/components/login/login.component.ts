import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      if (this.authenticationService.userValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
        return;
      }

      this.loading = true;
      this.authenticationService.login(this.formControls.username.value, this.formControls.password.value)
        .pipe(first())
        .subscribe(() => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
  }
}
