import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AnswerApi, Answer } from '../../../sdk';

@Injectable()
export class IpsService {
  constructor(
    // private answerApi: AnswerApi
    private http: HttpClient
  ){}

//   getAnswers(questionId){
//     let query = {
//      questionId: questionId
//     }
//    return this.answerApi.find<Answer>({where: query})
//    .toPromise()
//   }


  // getIp(ip){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       "Access-Control-Allow-Credentials": "true"
  //     })
  //   };
  //   return this.http.get("https://api.musubu.io/MusubuAPI/Musubu?IP=173.67.27.78&key=b9c4896dd776e2e61a937a01aa3d1ac8&format=JSON&level=verbose");
  // }


  getIp(ip){
    return {
        "ipaddress":"204.16.0.243",
        "ipint":3423600883,
        "threat_potential_score_pct":82,
        "threat_classification":"High",
        "blacklist_class":"bruteforce",
        "blacklist_class_cnt":0,
        "blacklist_network_neighbors":1,
        "blacklist_observations":0,
        "country":"US",
        "stateprov":"Florida",
        "district":"Miami-Dade",
        "city":"Miami",
        "zipcode":"33132",
        "latitude":25.77,
        "longitude":-80.168,
        "timezone_offset":-4.0,
        "timezone_name":"America/New_York",
        "ispname":"Braslink Network Inc",
        "network_type":"INTERNETAUTHORITIES",
        "network_group":"ALL",
        "network_name":"Internet Assigned Numbers Authority"
    };
  }
}