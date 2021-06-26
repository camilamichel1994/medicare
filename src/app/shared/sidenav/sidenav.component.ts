import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  get username(): string {
    return localStorage.getItem('fullName')!;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    public navigation: NavigationService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    const logoutConfirmation = window.confirm('Deseja mesmo sair?');
    if (logoutConfirmation) {
      this.authService.clearStorage();
      this.router.navigate(['login']);
    }
  }
}
