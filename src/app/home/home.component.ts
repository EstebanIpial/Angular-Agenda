import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const sidebar = document.getElementById('sidebar');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (screenWidth < 768) {
      sidebar?.classList.add('hide');
    } else {
      sidebar?.classList.remove('hide');
    }
  }

  public totalQuotes:number;
  public totalEmployees:number;
  public totalUsers:number;
  public totalClients:number;
  public totalTools:number;
  public totalSupplies:number;
  public img:any;

  constructor() {}

  ngOnInit(): void {
  }


  changeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('hide');
  }
}
