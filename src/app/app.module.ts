import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { counterReducer } from './counter.reducer';
import { loginReducer } from './login.reducer';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ count: counterReducer }),
    // StoreModule.forRoot({ cunt: counterReducer }),
    // StoreModule.forRoot({log: loginReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
