import { Component, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { ConstantPool, Target } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    access_key:string = "d8c448f5602070b64312e75c1dddcff9"
    Http = new XMLHttpRequest;
    phoneNumber:string = '';
    countryCode:string = '46'; 
    formatError:boolean = true;
    output:string = '';
    location:string = '';
    carrier:string = '';
    error:boolean = false;
    success:boolean = false;
    invalid:boolean = false;
  title: any;

    parseData(data: any) {

      this.output = '+' + this.countryCode + ' ' + this.phoneNumber
      
      if (data.valid) {
  
        let carrier = data.carrier;
        let country = data.country_name;
        let location = data.location;
        
        this.success = true;
        this.output += ' is valid'
        this.location = 'Location: ' + country;

        if (location != '') {
          this.location += ', ' + location;
        }

        if (carrier != '') {
          this.carrier = 'Carrier: ' + data.carrier;
        } 

      } else {
        this.invalid = true;
        this.output += ' is invalid'
      }
    }

    reset() {
      this.success = false;
      this.invalid = false;
      this.error = false;
      this.location = '';
      this.carrier = '';
      this.output = '';

    }

    countryChange(c: any) {
      this.countryCode = c.dialCode;
    }

    hasError(e: boolean) {
      console.log(e)
      this.formatError = e;
    }

    checkCountryCode(no: string) {
      // checks if user provided country prefix
      if (no.charAt(0) == "+") {
        this.countryCode = '';
      }
    }

    toggleError() {
      this.error = false;
    }
    
    getInfo(phoneNo: string) {
      
      this.reset(); 
      if (phoneNo != '') {
        if (this.formatError) {
          this.checkCountryCode(phoneNo)
          let url="http://apilayer.net/api/validate?access_key=" + this.access_key + "&number=" + this.countryCode + phoneNo;

          fetch(url)
          .then(response => response.json())
          .then((data) => {

            this.phoneNumber = phoneNo;
            this.parseData(data);
          
          }).catch((error) => {
            console.log(error);
          });
        } else {
          this.output = 'Phone number has the wrong format!';
          this.invalid = true;
          this.error = true;
          
        }
      
      } else {
        this.output = 'Please provide a phone number';
        this.invalid = true;
        this.error = true;
      }

    } 
     
}
