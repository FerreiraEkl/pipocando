(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"8ifR":function(n,e,i){"use strict";i.d(e,"a",function(){return K});var t=i("fXoL"),r=i("d6tv"),b=i("tyNb"),o=i("j/vS"),s=i("ofXK");const a=["sidenav"],c=function(){return["/movie/edit"]};function u(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",13),t.hc(2,"Adicionar filme"),t.Kb(),t.Kb()),2&n&&(t.wb(1),t.Vb("routerLink",t.Yb(1,c)))}function l(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",14),t.hc(2,"Administra\xe7\xe3o"),t.Kb(),t.Kb())}function f(n,e){if(1&n){const n=t.Mb();t.Jb(0),t.Lb(1,"li"),t.Lb(2,"a"),t.hc(3),t.Kb(),t.Kb(),t.fc(4,u,3,2,"li",11),t.fc(5,l,3,0,"li",11),t.Lb(6,"li",12),t.Sb("click",function(){return t.bc(n),t.Ub().logout()}),t.Lb(7,"a"),t.hc(8,"Sair"),t.Kb(),t.Kb(),t.Ib()}if(2&n){const n=t.Ub();t.wb(3),t.kc("",n.user.userFirstName," ",n.user.userLastName,""),t.wb(1),t.Vb("ngIf",0===n.user.userProfile),t.wb(1),t.Vb("ngIf",0===n.user.userProfile)}}function d(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",15),t.hc(2,"Entrar"),t.Kb(),t.Kb(),t.Lb(3,"li"),t.Lb(4,"a"),t.hc(5,"Contato"),t.Kb(),t.Kb())}function g(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",13),t.hc(2,"Adicionar filme"),t.Kb(),t.Kb()),2&n&&(t.wb(1),t.Vb("routerLink",t.Yb(1,c)))}function L(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",16),t.hc(2,"Administra\xe7\xe3o"),t.Kb(),t.Kb())}function h(n,e){if(1&n){const n=t.Mb();t.Jb(0),t.Lb(1,"li"),t.Lb(2,"a"),t.hc(3),t.Kb(),t.Kb(),t.fc(4,g,3,2,"li",11),t.fc(5,L,3,0,"li",11),t.Lb(6,"li",12),t.Sb("click",function(){return t.bc(n),t.Ub().logout()}),t.Lb(7,"a"),t.hc(8,"Sair"),t.Kb(),t.Kb(),t.Ib()}if(2&n){const n=t.Ub();t.wb(3),t.kc("",n.user.userFirstName," ",n.user.userLastName,""),t.wb(1),t.Vb("ngIf",0===n.user.userProfile),t.wb(1),t.Vb("ngIf",0===n.user.userProfile)}}function v(n,e){1&n&&(t.Lb(0,"li"),t.Lb(1,"a",15),t.hc(2,"Entrar"),t.Kb(),t.Kb(),t.Lb(3,"li"),t.Lb(4,"a"),t.hc(5,"Contato"),t.Kb(),t.Kb())}let K=(()=>{class n{constructor(n,e,i){this.userService=n,this.router=e,this.AuthService=i,this.subs=new Array}ngOnInit(){this.subs.push(this.userService.getLoggedUser().subscribe(n=>{this.user=n}))}ngAfterViewInit(){this.sidenav=M.Sidenav.init(this.sidenavElement.nativeElement,{})}logout(){this.AuthService.logout().then(n=>{if(n)return this.router.navigate(["login"])})}ngOnDestroy(){this.subs.forEach(n=>{n.unsubscribe()}),this.sidenav&&this.sidenav.destroy()}}return n.\u0275fac=function(e){return new(e||n)(t.Gb(r.a),t.Gb(b.b),t.Gb(o.a))},n.\u0275cmp=t.Ab({type:n,selectors:[["app-navbar"]],viewQuery:function(n,e){if(1&n&&t.lc(a,!0),2&n){let n;t.Zb(n=t.Tb())&&(e.sidenavElement=n.first)}},decls:17,vars:4,consts:[[1,"container"],[1,"nav-wrapper"],["routerLink","",1,"brand-logo"],["src","/assets/images/logo.png","alt","",1,"header-logo"],["href","#","data-target","navbar",1,"sidenav-trigger"],[1,"material-icons"],[1,"right","hide-on-med-and-down"],[4,"ngIf","ngIfElse"],["elseTemplate",""],["id","navbar",1,"sidenav","hide-on-large-only"],["sidenav",""],[4,"ngIf"],[3,"click"],["routerLinkActive","active",3,"routerLink"],["routerLink","/admin"],["routerLink","login"],["routerLink","/movie/edit"]],template:function(n,e){if(1&n&&(t.Lb(0,"nav"),t.Lb(1,"div",0),t.Lb(2,"div",1),t.Lb(3,"a",2),t.Hb(4,"img",3),t.Kb(),t.Lb(5,"a",4),t.Lb(6,"i",5),t.hc(7,"menu"),t.Kb(),t.Kb(),t.Lb(8,"ul",6),t.fc(9,f,9,4,"ng-container",7),t.fc(10,d,6,0,"ng-template",null,8,t.gc),t.Kb(),t.Kb(),t.Kb(),t.Kb(),t.Lb(12,"ul",9,10),t.fc(14,h,9,4,"ng-container",7),t.fc(15,v,6,0,"ng-template",null,8,t.gc),t.Kb()),2&n){const n=t.ac(11);t.wb(9),t.Vb("ngIf",e.user)("ngIfElse",n),t.wb(5),t.Vb("ngIf",e.user)("ngIfElse",n)}},directives:[b.d,s.i,b.c],styles:["nav[_ngcontent-%COMP%]{border:0 solid;box-shadow:0 1px 1px rgba(0,0,0,.15);background-color:rgba(0,0,0,.42);position:sticky;top:0;z-index:998}.header-logo[_ngcontent-%COMP%]{max-height:60px}@media only screen and (min-width:993px){.sidenav-overlay[_ngcontent-%COMP%]{display:none!important;opacity:0!important}}"]}),n})()},PCNd:function(n,e,i){"use strict";i.d(e,"a",function(){return o});var t=i("ofXK"),r=i("tyNb"),b=i("fXoL");let o=(()=>{class n{}return n.\u0275mod=b.Eb({type:n}),n.\u0275inj=b.Db({factory:function(e){return new(e||n)},imports:[[t.b,r.e]]}),n})()}}]);