import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor (private userService : UserService, private router : Router) {}

  loggout () {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['login'])
    })
  }
}