import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule,MatExpansionModule} from '@angular/material';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { GallryComponent } from './gallry/gallry.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component'
import { ItemsComponent } from './items/items.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { LogInComponent } from './log-in/log-in.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Interceptor } from './services/interceptors/auth_interceptors';
import { AuthGard } from './services/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'gallry', component: GallryComponent },
  { path: 'home', component: HomeComponent },
  { path: 'items/:id', component: ItemsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'edit', component: EditComponent,canActivate:[AuthGard] },
  { path: 'log-in', component: LogInComponent }
];

@NgModule({
declarations: [
  ShortenPipe,
  AppComponent,
  ItemsComponent,
  GallryComponent,
  ContactComponent,
  HomeComponent,
  EditComponent,
  LogInComponent
],
imports: [
  BrowserModule,
  FormsModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatInputModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,MatIconModule,
  MatDividerModule,
  NgxPageScrollCoreModule ,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatPaginatorModule,
  RouterModule.forRoot(routes)
],
  providers: [AuthGard,{provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
