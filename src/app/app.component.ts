import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
declare var swal: any;

// services
import { ZipcodeService } from './services/zipcode.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  data: any;

  constructor(private formBuilder: FormBuilder, private zipcodeService: ZipcodeService) {
    this.form = this.formBuilder
      .group({
        zipcode: [null, Validators.required]
      });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  closeWindow() {
    this.data = null;
  }

  msgErro() {
    swal({
      text: `Cep inválido!`,
      type: 'error'
    });
  }

  searchZipcode() {    
    if (!this.form.valid) {
      return;
    }

    if (this.form.value.zipcode < 8) {
      this.msgErro();
      return;
    }

    this.data = null;
    const request: any = this.form.value;

    this.zipcodeService.getZipcode(request.zipcode)
      .subscribe((response: any) => {        
        if(response.erro) {
          this.msgErro();
          return;
        }
        this.data = response;
        this.zipcodeService.getLocation(this.data.cep)
          .subscribe((dataLocation: any) => {
            if (dataLocation && dataLocation.results && _.isArray(dataLocation.results)) {
              const result: any = _.first(dataLocation.results);
              if (result.geometry && result.geometry.location) {
                this.data.location = result.geometry.location;
              }
            }
          });
      }, (error) => {
        this.msgErro();
      });
  }
}
