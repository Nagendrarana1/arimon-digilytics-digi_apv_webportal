import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

interface Shareholder {
  id: number;
  name: string;
  address?: string;
  extractedFrom?: string;
}

@Component({
  selector: 'app-shareholder-document-validation',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,HeaderComponent],
  templateUrl: './shareholder-document-validation.component.html',
  styleUrls: ['./shareholder-document-validation.component.scss'],
   animations: [
    // Animate list of shareholders
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(100, [animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))])
          ],
          { optional: true }
        )
      ])
    ]),

    // Animate PDF viewer / right column
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ShareholderDocumentValidationComponent implements OnInit {
  companyName = 'Advanced Corp 3 Ltd';
  documentType = 'confirmation statement';
  lastUpdated = '15/1/2024';

  shareholders: Shareholder[] = [
    { id: 1, name: 'John Smith', address: '123 High Street, London', extractedFrom: 'Page 3, Section D' },
    { id: 2, name: 'Michael Brown', address: '78 Oak Avenue, Birmingham Flat 2', extractedFrom: 'Page 3, Section C' },
    { id: 3, name: 'Peter Williams', address: 'Manage cookies or opt out' }
  ];

  filteredShareholders: Shareholder[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.filteredShareholders = [...this.shareholders];
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredShareholders = [...this.shareholders];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredShareholders = this.shareholders.filter(s =>
      s.name.toLowerCase().includes(term) ||
      (s.address && s.address.toLowerCase().includes(term)) ||
      (s.extractedFrom && s.extractedFrom.toLowerCase().includes(term))
    );
  }
  onHeaderButtonClick(action: string) {
  if (action === 'back') {
    // navigate to officer-linked-companies
    this.router.navigate(['/office-linked-companies']);
  }
}
  router = inject(Router);
}
