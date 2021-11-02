import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    private access_key:string = "fe0f7d1b1e08cdfb4650f3342775d679";
    private countryCode:string = '+46'; 
   
    phoneNo:string = '';
    error:boolean = false;
    warning:boolean = false;
    valid:boolean = false; 
    invalid:boolean = false;
    output:string = '';
    location:string = '';
    carrier:string = '';
    
    countryChange(c: any) {
      this.countryCode = '+' + c.dialCode;
    }

    toggleError() {
      this.error = false;
    }

    reset() {
      this.valid = false;
      this.invalid = false;
      this.error = false;
      this.warning = false;
      this.location = '';
      this.carrier = '';
      this.output = '';
    }

    checkCountryCode(no: string) {
      if (no.charAt(0) == "+") {
        this.countryCode = '';
      }
    }

    enterSubmit(e: any) {
     
      if (e.keyCode == 13) {
        this.phoneNo.replace(/\n/g, '');
        this.getInfo();
      }
    }

    parseData(data: any) {

      this.output = this.countryCode + ' ' + this.phoneNo;
      
      if (data.valid) {
        let carrier = data.carrier;
        let location = data.location;
        
        this.valid = true;
        this.output += ' is valid'
        this.location = 'Location: ' + data.country_name;

        if (location != '') {
          this.location += ', ' + location;
        }

        if (carrier != '') {
          this.carrier = 'Carrier: ' + data.carrier;
        } 
      } 
      
      if (data.valid == false) {
        this.invalid = true;
        this.output += ' is invalid'
      }

      if (data.success == false) {
        this.warning = true;
        this.output = data.error.info;
      } 
}
    
    getInfo() {

        this.reset(); 

        if (this.phoneNo != '' && (/^\d+$/.test(this.phoneNo))) {

            this.checkCountryCode(this.phoneNo)
            fetch("http://apilayer.net/api/validate?access_key=" + this.access_key + "&number=" + this.countryCode + this.phoneNo)
            .then(response => response.json())
            .then((data) => {
            
              this.parseData(data);
            
            }).catch((error) => {
              console.log(error);
            });
          
        } else {
          this.output = 'Please provide a phone number';
          this.error = true;
          this.warning = true;
        }
    } 
}
