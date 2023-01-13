import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  FormControl = new FormControl('', [Validators.required])
  error : string = ''
  user : User = { username: '', password: '' }

  constructor (private userService : UserService, private router : Router, private _snackBar : MatSnackBar) {}

  submit () : void {
    this.userService.login(this.user).subscribe({
      next : () => {
        this.router.navigate(['task']),
        this._snackBar.open('Connection success, hello ' + this.user.username + '', 'Clear', { duration: 5000 })
      },
      error : err => {
          this._snackBar.open(err.error.message, 'Clear', { duration: 5000 })
      }
    })
  }
}
