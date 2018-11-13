import { Component, OnInit } from '@angular/core';
import { SavedSearchesService } from '../services/savedSearches.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent implements OnInit {
  queryName;
  savedSearches=[];
  savedSearchesGridColumns: string[] = ['queryName', 'description', 'createdOn', 'deleteButton']

  constructor(
    private savedSearchesService: SavedSearchesService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit() {
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
    this.savedSearchesService.getUserSearches(this.userService.user.email).then(
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
