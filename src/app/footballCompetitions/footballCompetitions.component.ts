import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {
  responseData:Competition[]=[];
  totalPageNumbers:number[]=[];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(`https://jsonmock.hackerrank.com/api/football_competitions?page=1`).subscribe((res:ApiResponse)=>{
    this.responseData=res.data;
      for(let i=0;i<res?.total_pages;i++){
        this.totalPageNumbers?.push(i+1);
      }
      })
  }

  onClick(buttonNumber:any){
    this.responseData=[];
    this.http.get(`https://jsonmock.hackerrank.com/api/football_competitions?page=${buttonNumber}`).subscribe((res:ApiResponse)=>{
    this.responseData=res.data;
    })
  }

}
