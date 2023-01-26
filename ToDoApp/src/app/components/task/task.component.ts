import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Task } from 'src/app/models/task'
import { TaskService } from 'src/app/services/task.service'
import { UserService } from 'src/app/services/user.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { FormControl, Validators } from '@angular/forms'
import { List } from 'src/app/models/list'
import { ListService } from 'src/app/services/list.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  FormControl = new FormControl('', [Validators.required])

  connectedTo : any[] = [];
  lists : Array<List> = [];
  tasks : Array<Task> = [];

  newTask : Task = {
    title: '',
    status: false,
    list_id: '',
    owner: ''
  };
  
  owner_id : any = '';

  drop (event : CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.modify(event.container.data[event.currentIndex], event.container.id);
    }
  }

  constructor (private taskService : TaskService, private listService : ListService, private userService : UserService, private router : Router, private _snackBar : MatSnackBar){ }

  ngOnInit() : void {
    this.taskService.get().subscribe({
      next : (data : Array<Task>) => {
        this.tasks = data;
      }
    });
    this.listService.get().subscribe({
      next : (data: Array<List>) => {
        this.lists = data;
        for (let list of this.lists) {
          this.connectedTo.push(list._id);
        };
      }
    });
    this.userService.getinfo().subscribe({
      next : res => {
        this.owner_id = res;
      }
    });
  }

  add() {
    this.newTask.owner = this.owner_id._id;
    this.taskService.post(this.newTask).subscribe({
      next : () => {
        this.ngOnInit();
        this._snackBar.open('Task added successfully | ' + this.newTask.title + ' to ' + this.newTask.list_id, 'Clear', { duration: 5000 });
      },
      error : err => {
          this._snackBar.open(err.error.message, 'Clear', { duration: 5000 })
      }
    })
  }

  delete(task : Task) : void {
    this.taskService.delete(task).subscribe({
      next : () => {
        this.ngOnInit();
        this.tasks = this.tasks.filter(t => task._id != t._id);
        this._snackBar.open('Task deleted successfully | ' + task.title + ' with id ' + task._id, 'Clear', { duration: 5000 });
      }
    })
  }

  modify(task : Task, list_id : string) {
    task.list_id = list_id;
    this.taskService.put(task).subscribe({
      next : () => {
        this._snackBar.open('Task changed successfully | ' + task.title + ' to list ' + task.list_id, 'Clear', { duration: 5000 });
      }
    })
  }

  checked(task : Task,) {
    task.status = !task.status;
    this.taskService.put(task).subscribe({
      next : () => {
        this._snackBar.open('Task changed successfully | ' + task.title + ' to list ' + task.list_id, 'Clear', { duration: 5000 });
      }
    })
  }


  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['login']);
        this._snackBar.open('You are logged out', 'Clear', { duration: 5000 });
    })
  }

  filterList(list_id : string | undefined) {
    let source : any[] = [];
    for (let task of this.tasks.filter(t => t.list_id == list_id)) {
      source.push(task);
    };
    return source;
  }
}
