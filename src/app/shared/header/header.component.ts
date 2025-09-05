import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

export interface HeaderButton {
  label: string;
  icon?: string;          // optional icon class
  type?: 'primary' | 'secondary' | 'danger'; // style variants
  action: string;         // identifier for click event
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   animations: [
    // Container animation - slides in from top
    trigger('headerContainer', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    
    // Breadcrumb items animation - slide in with slight bounce
    trigger('breadcrumbItem', [
      transition(':enter', [
        style({ transform: 'translateX(-10px)', opacity: 0 }),
        animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    
    // Button items animation - scale up with fade
    trigger('buttonItem', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          keyframes([
            style({ transform: 'scale(0.8)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1.05)', opacity: 0.8, offset: 0.7 }),
            style({ transform: 'scale(1)', opacity: 1, offset: 1 })
          ])
        )
      ])
    ]),
    
    // Heading animation - typewriter effect
    trigger('headingAnimation', [
      transition(':enter', [
        style({ width: '0', opacity: 0 }),
        animate('800ms ease-out', 
          style({ width: '*', opacity: 1 }))
      ])
    ]),
    
    // Alternative: Staggered fade in for buttons
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('button', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger('100ms', [
            animate('400ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    
    // Alternative: Staggered slide in for breadcrumbs
    trigger('staggerSlideIn', [
      transition(':enter', [
        query('a, span', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('80ms', [
            animate('400ms ease-out', 
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HeaderComponent {
  @Input() breadcrumbs: { label: string, url?: string }[] = [];
  @Input() heading: string = '';
  @Input() buttons: HeaderButton[] = [];

  @Output() buttonClick = new EventEmitter<string>();

  onButtonClick(action: string) {
    this.buttonClick.emit(action);
  }
}
