import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
CommonService
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books:any  = []
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.GetAPI('https://sanket-bookstore.azurewebsites.net/book',{}).then((resdata: any) => {
      // console.log(resdata);
      if(resdata.message == 'Ok'){
        this.books = resdata.books
        // console.log(this.books);
        
      }else{
        this.books = []
      }
      
    });

  }

}
