import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router){

  }
  user_records:any[]=[];
  data={
    email:"",
    password:""
  }
  doLogin(values: any) {
    
    const usersFromStorage = localStorage.getItem('users_records');
    
   
    if (usersFromStorage) {
      try {
        this.user_records = JSON.parse(usersFromStorage);
        
        // Ensure user_records is an array
        if (!Array.isArray(this.user_records)) {
          throw new Error('Parsed data is not an array');
        }
      } catch (error) {
        console.error('Error parsing user records:', error);
        alert('Login failed due to a data error');
        return;
      }
    } else {
      this.user_records = [];
    }
    
    if (this.user_records.some((v) => {
      return v.email === this.data.email && v.password === this.data.password;
    })) {
      alert('Login successful');
      this.router.navigate(['/showuser']);
    } else {
      alert('Login failed');
    }
  }
  
}
