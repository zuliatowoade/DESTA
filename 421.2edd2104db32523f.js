"use strict";(self.webpackChunkdesta=self.webpackChunkdesta||[]).push([[421],{7421:(v,m,e)=>{e.r(m),e.d(m,{CompanyInfoModule:()=>g});var i=e(9808),c=e(8113),o=e(5e3),r=e(9489),p=e(5948);function u(n,s){if(1&n&&(o.TgZ(0,"div",7),o._UZ(1,"img",8),o.qZA()),2&n){const t=s.$implicit;o.xp6(1),o.Q6J("src",t,o.LSH)}}function d(n,s){if(1&n&&(o.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"h3",4),o._uU(4),o.qZA()()(),o.TgZ(5,"div",5),o.YNc(6,u,2,1,"div",6),o.qZA()()),2&n){const t=o.oxw();o.xp6(4),o.Oqu(t.company.name),o.xp6(2),o.Q6J("ngForOf",t.company.images)}}const l=[{path:":id",component:(()=>{class n{constructor(t,a,y){this.readCsvService=t,this.activatedRoute=a,this.languageService=y,this.language="fr",this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.activatedRoute.paramMap.subscribe(t=>{const a=t.get("id");a&&this.loadCompanyInfo(+a)})),this.subscriptions.push(this.languageService.languageSubject.subscribe(t=>{this.language=t}))}loadCompanyInfo(t){this.company=this.readCsvService.companies[t],this.company||this.readCsvService.fetchDataFromCsv().subscribe(()=>{this.company=this.readCsvService.companies[t]})}ngOnDestroy(){this.subscriptions.forEach(t=>t.unsubscribe())}}return n.\u0275fac=function(t){return new(t||n)(o.Y36(r.G),o.Y36(c.gz),o.Y36(p.T))},n.\u0275cmp=o.Xpm({type:n,selectors:[["app-company-info"]],decls:1,vars:1,consts:[["class","container",4,"ngIf"],[1,"container"],[1,"row","my-3"],[1,"col-12"],[1,"text-secondary"],[1,"row"],["class","col-lg-4 col-md-12 mb-4 mb-lg-0",4,"ngFor","ngForOf"],[1,"col-lg-4","col-md-12","mb-4","mb-lg-0"],[1,"w-100","shadow-1-strong","rounded","mb-4",3,"src"]],template:function(t,a){1&t&&o.YNc(0,d,7,2,"div",0),2&t&&o.Q6J("ngIf",a.company)},directives:[i.O5,i.sg],styles:[""]}),n})()}];let f=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[c.Bz.forChild(l)],c.Bz]}),n})(),g=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[i.ez,f]]}),n})()}}]);