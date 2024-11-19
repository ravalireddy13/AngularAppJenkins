import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Validation from '../util/validation';
import { AppComponentService } from './app.component.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  providers:[AppComponentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private appComponentService: AppComponentService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
        lastName: ['', Validators.required,Validators.pattern(/^[a-zA-Z]+$/)],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log(this.form.value)
    this.submitted = true;

    this.appComponentService.addUser(this.form.value).subscribe(
      res => {
        if (res) {
         console.log(res)
        }
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
