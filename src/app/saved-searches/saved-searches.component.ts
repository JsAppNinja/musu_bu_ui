import { Component, OnInit } from '@angular/core';
import { SavedSearchesService } from '../services/savedSearches.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent implements OnInit {
  user;
  queryName;
  savedSearches=[];
  savedSearchesGridColumns: string[] = ['queryName', 'description', 'createdOn', 'deleteButton']

  constructor(
    private savedSearchesService: SavedSearchesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("profile"));
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.savedSearches = data;
      }
    })
  }

  humanizeDate(date){
    return moment(date).format("LLL");
  }

  getUserSearches(){
    this.savedSearchesService.getUserSearches(this.user.email).then(
      (result) => {
        this.savedSearches = result;
      },
      (err) =>{

      }
    )
  }

  delete(id){
    this.savedSearchesService.deleteSearch(id).then(
      result =>{
        this.getUserSearches();
      },
      err =>{

      }
    )
  }

}
