import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './components/data-area/add-data/add-data.component';
import { ListDataComponent } from './components/data-area/list-data/list-data.component';
import { HomeComponent } from './components/home-area/home/home.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: ListDataComponent },
    { path: "add", component: AddDataComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    // { path: "**", component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
