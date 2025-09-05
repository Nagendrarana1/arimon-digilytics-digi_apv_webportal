import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {NgxParticlesComponent} from '@omnedia/ngx-particles';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxParticlesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object,private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
    goToTable() {
    this.router.navigate(['/table']);
  }
}
