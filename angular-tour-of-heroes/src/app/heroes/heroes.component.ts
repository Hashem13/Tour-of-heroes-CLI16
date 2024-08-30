import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import {
  /* . . . */
  NgFor,
  NgIf,
  UpperCasePipe,
  /* . . . */
} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone:true,
  imports: [
    NgFor,NgIf,FormsModule,UpperCasePipe,RouterModule
  ],
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {

  constructor(private heroService: HeroService ,private messageService: MessageService) {}

  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
