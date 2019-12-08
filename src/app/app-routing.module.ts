import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {TasksComponent} from './tasks/tasks.component';


const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'detail/:id', component: TaskDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
