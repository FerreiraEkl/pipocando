import { User } from './../../../core/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './../../../modules/auth/auth.service';
import { UserService } from '../../../modules/user/user.service';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sidenav } from 'materialize-css';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('sidenav') sidenavElement: ElementRef;

  public user: User;

  private sidenav: Sidenav;
  private subs: Array<Subscription>;

  constructor(
    private userService: UserService,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.subs = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.subs.push(this.userService.getLoggedUser().subscribe(value => {
      this.user = value;
    }));
  }

  ngAfterViewInit(): void {
    this.sidenav = M.Sidenav.init(this.sidenavElement.nativeElement, {});
  }

  logout() {
    this.AuthService.logout().then(result => {
      if (result) {
        return this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
    if (this.sidenav)
      this.sidenav.destroy();
  }
}
