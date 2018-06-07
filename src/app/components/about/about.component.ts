import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { animation } from '@angular/animations/src/animation_metadata';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class AboutComponent implements OnInit {

  posts = []

  constructor( private route: ActivatedRoute, private dataSrvc:DataServiceService, private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe(
      res=>{
        console.log(res.id)
      },
      error=>{
        console.log(error)
      }
    )
   }

  ngOnInit() {
  }

  getPosts(){
    this.spinnerService.show();
    this.dataSrvc.getDataFromService()
    .then(data=>{
      this.setView(data)
      this.spinnerService.hide()
    })
    .catch(error=>{
      alert('Hubo un problema, intenta de nuevo mas tarde')
    })
  }

  deletePost(pos:number){
    this.posts.splice(pos,1)
  }

  setView(data){
    this.posts = data.items
  }



}
