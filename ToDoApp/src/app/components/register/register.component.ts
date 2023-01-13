import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  FormControl = new FormControl('', [Validators.required])
  user : User = { username : '', password : '' }

  constructor (private userService : UserService, private router : Router, private _snackBar : MatSnackBar) {}

  submit () : void {
    this.userService.register(this.user).subscribe({
      next : () => {
        this.router.navigate(['login']),
        this._snackBar.open('Registration successful, please login', 'Clear', { duration: 5000 })
      },
      error : err => {
          this._snackBar.open(err.error.message, 'Clear', { duration: 5000 })
      }
    })
  }
}
