import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public login: boolean = false;
  public register: boolean = true;
  public lostPasswd: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params =>{
      if(!params['register']){
        this.login = false;
        this.register = true;
        this.lostPasswd = true;
      }else{
        if(params['register'][0] === '1'){
          this.login = true;
          this.register = false;
          this.lostPasswd = true;
        }else{
          this.login = true;
          this.register = true;
          this.lostPasswd = false;
        }
      }
    });
  }





}
