import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public data: any

  constructor (private userService: UserService) {}

  ngOnInit (): void {
    this.userService.getinfo().subscribe({
      next: res => {
        this.data = res
      }
    })
  }
}
