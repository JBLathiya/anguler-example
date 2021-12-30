import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books:any  = []
  action:string = ""
  constructor(private commonService: CommonService) { }
   new_book = {
     'id':"",
    'bookName':'',
    'author':'',
    'price':''
  }
  ngOnInit(): void {
    
    this.commonService.GetAPI('https://sanket-bookstore.azurewebsites.net/book',{}).then((resdata: any) => {
       console.log(resdata);
      if(resdata.message == 'Ok'){
        this.books = resdata.books
        // console.log(this.books);
        
      }else{
        this.books = []
      }
      
    });

  }
  add_edit_books(){
    var index = this.books[this.books.length-1]
    if(this.new_book.id == ""){
      this.new_book.id = index.id + 1
      this.books.push(this.new_book)
      this.new_book = {
        'id':"",
       'bookName':'',
       'author':'',
       'price':''
     }
     $("#exampleModal").modal('hide')
    }else{
      var index2 = this.books.findIndex((x1:any)=>x1.id == this.new_book.id)
      this.books[index2] = this.new_book
      $("#exampleModal").modal('hide')
    }
    
  }
  openmodel(){
      this.action = 'Add'
      $("#exampleModal").modal('show')
      this.new_book = {
        'id':"",
       'bookName':'',
       'author':'',
       'price':''
     }
  }
  editthis(data:any){
    this.action = 'Edit'
    this.new_book = data
    $("#exampleModal").modal('show')
  }
  deletethis(x){
    var index2 = this.books.findIndex((x1:any)=>x1.id == x.id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this.books.splice(index2, 1);
        Swal.fire(
          'Removed!',
          'Books removed successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Books still in our database.)',
          'error'
        )
      }
    })
  }
}
