import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { List } from 'src/app/models/list'
import { ListService } from 'src/app/services/list.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  FormControl = new FormControl('', [Validators.required]);

  lists: Array<List> = [];
  newlist: List = { title: '', owner: '' };
  owner_id: any;

  constructor (private listService: ListService, private userService: UserService, private _snackBar: MatSnackBar) {}

  submit () {
    this.listService.post(this.newlist).subscribe({
      next: () => {
        this.lists.push(this.newlist),
        this.ngOnInit()
        this._snackBar.open('List added succesfuly | ' + this.newlist._id + '', 'Close', { duration: 5000 })
      },
      error: err => {
        this._snackBar.open(err.error.message, 'Close', { duration: 5000 })
      }
    })
  }

  delete (list: List): void {
    this.listService.delete(list).subscribe({
      next: data => {
        ;(this.lists = this.lists.filter(t => list._id != t._id)),
          this._snackBar.open( 'List deleted succesfuly | ' + list._id + '', 'Close', { duration: 5000 })
      }
    })
  }

  ngOnInit (): void {
    this.userService.getinfo().subscribe({
      next: res => {
        this.owner_id = res
        this.newlist.owner = this.owner_id._id

        this.listService.get(this.owner_id._id).subscribe({
          next: (data: Array<List>) => {
            this.lists = data
          }
        })
      }
    })
  }
}
