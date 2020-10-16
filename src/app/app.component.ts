import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient){}
  currentCourse:string
  indexUrl:number = 0
  private url = ['https://www.cbr-xml-daily.ru/daily_utf8.xml','https://www.cbr-xml-daily.ru/daily_json.js']

  ngOnInit(){
    this.startInterval()
  }
  startInterval(){
    this.getCourses()
    setInterval(this.getCourses,10000)
  }
  getCourses = ()=>{
      this.http.get(this.url[this.indexUrl]).subscribe(response =>{
        this.currentCourse = response.Valute.EUR.Value
      },error =>{
          if(this.indexUrl < this.url.length +1){
            ++this.indexUrl
          }else{
            this.indexUrl = 0
          }
          this.getCourses();
      })
    }
}
