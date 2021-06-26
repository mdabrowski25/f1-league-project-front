import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StandingsComponent } from './standings/standings.component';
import { HttpClientModule } from '@angular/common/http';

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
        StandingsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
