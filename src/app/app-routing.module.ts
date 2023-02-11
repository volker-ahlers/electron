import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { FormularComponent } from './formular/formular.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: 'formular', component: FormularComponent},
  {path: 'files', component: FilesComponent},
  {path: '**', redirectTo: '/formular'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
