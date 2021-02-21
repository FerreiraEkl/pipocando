import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tabs } from 'materialize-css';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('tabs') tabsElement: ElementRef;
  private tabs: Tabs;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tabs = M.Tabs.init(this.tabsElement.nativeElement, {});
  }
  
  ngOnDestroy(): void {
    if (this.tabs)
      this.tabs.destroy();
  }

}
