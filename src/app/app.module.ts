import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AngularMaterialModule } from "./angular-material.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorComponent } from "./error/error.component";
import { ErrorInterceptor } from "./error-interceptor";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./auth/login/login.component";
import { NgModule } from "@angular/core";
import { PostsModule } from "./posts/posts.module";
import { SignupComponent } from "./auth/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
