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

  todo : Array<Task> = [];
  done : Array<Task> = [];
  list_todo : Array<Task> = [];

  tasks : Array<Task> = [];
  newTask : Task = {
    title: '',
    status: false,
    list_id: '',
    owner: ''
  };

  lists : Array<List> = [];
  owner_id : any;

  drop (event : CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.modify(event.container.data[event.currentIndex]);
    }
  }

  constructor (private taskService : TaskService, private listService : ListService, private userService : UserService, private router : Router, private _snackBar : MatSnackBar) {}

  ngOnInit() : void {
    this.taskService.getTaches().subscribe({
      next : (data : Array<Task>) => {
        this.tasks = data;
        this.todo = this.tasks.filter(t => t.status == false);
        this.done = this.tasks.filter(t => t.status == true);
      }
    })

    this.userService.getinfo().subscribe({
      next : res => {
        this.owner_id = res;

        this.listService.get(this.owner_id._id).subscribe({
          next : (data: Array<List>) => {
            this.lists = data;
          }
        })
      }
    })
  }

  add() {
    this.newTask.owner = this.owner_id._id;
    this.taskService.ajoutTaches(this.newTask).subscribe({
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
    this.taskService.removeTaches(task).subscribe({
      next : () => {
        this.ngOnInit();
        this.tasks = this.tasks.filter(t => task._id != t._id);
        this._snackBar.open('Task deleted successfully | ' + task.title + ' with id ' + task._id, 'Clear', { duration: 5000 });
      }
    })
  }

  modify(task : Task) {
    task.status = !task.status;
    this.taskService.updateTaches(task).subscribe({
      next : () => {
        this._snackBar.open('Task changed successfully | ' + task.title + ' with id ' + task._id, 'Clear', { duration: 5000 });
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
    this.list_todo = this.tasks;
    this.list_todo = this.tasks.filter(t => t.list_id == list_id);

    this.todo = this.list_todo.filter(t => t.status == false);
    this.done = this.list_todo.filter(t => t.status == true);

    this._snackBar.open('Filtering by list | ' + list_id, 'Clear', { duration: 5000 });
  }
}
