import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteModule } from './site/site.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {path:'', loadChildren: () => import('./site/site.module').then(m => m.SiteModule)},
  {path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
