import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { UpcomingRacesComponent } from './standings/upcoming-races/upcoming-races.component';
import { GeneralClassificationComponent } from './standings/general-classification/general-classification.component';
import { ConstructorsClassificationComponent } from './standings/constructors-classification/constructors-classification.component';
import { LastRacesComponent } from './standings/last-races/last-races.component';

const routes: Routes = [{
    path: 'generator',
    component: GeneratorComponent
}, {
    path: '',
    component: HomeComponent
}, {
    path: 'standings',
    component: StandingsComponent
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
        LastRacesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        FontAwesomeModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
