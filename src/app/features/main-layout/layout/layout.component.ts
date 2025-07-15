import { Component, inject } from '@angular/core';;
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';  // Import the MatListModule
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { HasRolesDirective } from '../../../shared/directive/has-roles.directive';

@Component({
  imports: [
    MatSidenavModule,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    HasRolesDirective
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showFiller = false;

  private _formBuilder = inject(FormBuilder);
  private router: Router = new Router;

  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
