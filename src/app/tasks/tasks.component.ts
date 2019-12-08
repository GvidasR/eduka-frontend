import {Component, OnInit} from '@angular/core';
import {Task} from '../objects/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  task: Task = {
    id: 1,
    question: 'Windstorm',
    answers: [
      {
        correct: false,
        answer: 'test'
      },
      {
        correct: true,
        answer: 'test'
      }
    ]
  };

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }


  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.taskService.addTask({question: name, answers: []} as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task).subscribe();
  }

}
