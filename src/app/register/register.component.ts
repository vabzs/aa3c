import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor() {}

  ngOnInit(): void {
    // Retrieve and parse the user data from localStorage on component initialization
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        this.user_records = JSON.parse(storedUsers);
      } catch (e) {
        console.error('Error parsing user records from localStorage:', e);
        this.user_records = [];
      }
    }
  }

  user_records: any[] = [];

  data = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
  };

  doRegistrationaction(values: any) {
    // Check if the email is already registered
    if (
      this.user_records.some((v) => {
        return v.email === this.data.email;
      })
    ) {
      alert('Duplicate Data');
    } else {
      // Push new user data into the array
      this.user_records.push(this.data);

      // Store updated user records back to localStorage
      localStorage.setItem('users', JSON.stringify(this.user_records));

      // Notify user of successful registration
      alert('Hi ' + this.data.name + ', you are successfully registered');
      
      // Clear form data after successful registration
      this.data = {
        name: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
      };
    }
  }
}
