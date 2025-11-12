import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ParticipantService } from '../../../providers/services/catalog/participant-service';
import { Participant } from '../../../models/participant.model';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-tables',
  imports: [
    MatTableModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {

  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1: Participant[] = [];

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants(): void {
    this.participantService.getAll$().subscribe((data: Participant[]) => {
      // Agregamos campos ficticios para budget y priority
      this.dataSource1 = data.map(p => ({
        ...p,
        budget: Math.floor(Math.random() * 200) + 50, // 50-249
        priority: ['confirmed', 'rejected', 'cancelled'][Math.floor(Math.random() * 3)] as 'confirmed' | 'rejected' | 'cancelled'
      }));
      console.log(this.dataSource1);
    });
  }

  getFullName(participant: Participant): string {
    return `${participant.firstName} ${participant.lastName}`;
  }
}


// import { CommonModule } from '@angular/common';
// import {Component, OnInit} from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MaterialModule } from 'src/app/material.module';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatButtonModule } from '@angular/material/button';
// import {ParticipantService} from "../../../providers/services/catalog/participant-service";
//
// // table 1
// export interface productsData {
//   id: number;
//   imagePath: string;
//   uname: string;
//   budget: number;
//   priority: string;
// }
//
// const PRODUCT_DATA: productsData[] = [
//   {
//     id: 1,
//     imagePath: 'assets/images/products/product-1.png',
//     uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
//     budget: 180,
//     priority: 'confirmed',
//   },
//   {
//     id: 2,
//     imagePath: 'assets/images/products/product-2.png',
//     uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
//     budget: 90,
//     priority: 'cancelled',
//   },
//   {
//     id: 3,
//     imagePath: 'assets/images/products/product-3.png',
//     uname: 'PlayStation 5 DualSense Wireless Controller',
//     budget: 120,
//     priority: 'rejected',
//   },
//   {
//     id: 4,
//     imagePath: 'assets/images/products/product-4.png',
//     uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
//     budget: 160,
//     priority: 'confirmed',
//   },
// ];
//
// @Component({
//   selector: 'app-tables',
//   imports: [
//     MatTableModule,
//     CommonModule,
//     MatCardModule,
//     MaterialModule,
//     MatIconModule,
//     MatMenuModule,
//     MatButtonModule,
//   ],
//   templateUrl: './tables.component.html',
// })
// export class AppTablesComponent implements OnInit {
//   // table 1
//   displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
//   dataSource1 = PRODUCT_DATA;
//   constructor(private participantService:ParticipantService) {
//   }
//
//   ngOnInit(): void {
//         this.getParticipants();
//     }
//
//   public getParticipants():void {
//     this.participantService.getAll$().subscribe(data=>{
//       console.log(data);
//     })
//   }
// }
