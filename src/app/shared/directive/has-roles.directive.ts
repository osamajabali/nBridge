import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService : LoginService
  ) {}

  ngOnInit() {    
    this.updateView(this.loginService.getUser().roles);
  }

  private updateView(userRoles: string[]) {
    const normalizedRoles = userRoles.map(r => r.toLowerCase());
    if (normalizedRoles.includes('admin') || normalizedRoles.includes('user')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
