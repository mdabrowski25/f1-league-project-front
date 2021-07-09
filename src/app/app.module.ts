import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { UpcomingRacesComponent } from './standings/upcoming-races/upcoming-races.component';
import { GeneralClassificationComponent } from './standings/general-classification/general-classification.component';
import { ConstructorsClassificationComponent } from './standings/constructors-classification/constructors-classification.component';
import { LastRacesComponent } from './standings/last-races/last-races.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [{
    path: 'generator',
    component: GeneratorComponent
}, {
    path: '',
    component: HomeComponent
}, {
    path: 'standings',
    component: StandingsComponent
}, {
    path: 'login',
    component: LoginComponent
}];

@NgModule({
    declarations: [
        AppComponent,
        GeneratorComponent,
        HeaderComponent,
        HomeComponent,
        StandingsComponent,
        UpcomingRacesComponent,
        GeneralClassificationComponent,
        ConstructorsClassificationComponent,
        LastRacesComponent,
        LoginComponent,
        AdminPanelComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule
    ],
    providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
