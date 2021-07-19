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
import { AddRaceHighlightsComponent } from './admin-panel/add/add-race-highlights/add-race-highlights.component';
import { AddDriverComponent } from './admin-panel/add/add-driver/add-driver.component';
import { AddRaceComponent } from './admin-panel/add/add-race/add-race.component';
import { AddTeamComponent } from './admin-panel/add/add-team/add-team.component';
import { AuthGuard } from './services/guards/auth.guard';
import { EditRaceComponent } from './admin-panel/edit/edit-race/edit-race.component';

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
}, {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'add/race-highlights',
            component: AddRaceHighlightsComponent
        },
        {
            path: 'add/race',
            component: AddRaceComponent
        },
        {
            path: 'add/driver',
            component: AddDriverComponent
        },
        {
            path: 'add/team',
            component: AddTeamComponent
        },
        {
            path: 'edit/race',
            component: EditRaceComponent
        }
    ]
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
        AdminPanelComponent,
        AddRaceHighlightsComponent,
        AddDriverComponent,
        AddRaceComponent,
        AddTeamComponent,
        EditRaceComponent
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
        },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
