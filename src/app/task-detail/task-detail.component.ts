import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Task} from '../objects/task';
import {TaskService} from '../services/task.service';
import {Answer} from '../objects/answer';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.taskService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  delete(answer: Answer): void {
    this.task.answers = this.task.answers.filter(h => h !== answer);
  }

  add(): void {
    this.task.answers.push({correct: false, answer: ''});
  }

  fixSingleCorrect(correctAnswer): void {
    this.task.answers.forEach((item) => {
      if (item.answer !== correctAnswer) {
        item.correct = false;
      }
    });
  }
}
