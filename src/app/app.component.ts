import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    private access_key:string = "e205f9b8e41ca8cb7093a3df342d5293";
    private countryCode:string = '+46'; 
   
    phoneNo:string = '';
    output:string = '';
    location:string = '';
    carrier:string = '';

    error:boolean = false; 
    warning:boolean = false
    valid:boolean = false; 
    invalid:boolean = false; 
    
    countryChange(e: any) {
      this.countryCode = '+' + e.dialCode;
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

    enterSubmit(e: any) {
      if (e.keyCode == 13) {
        this.getInfo();
      }
    }

    remove() {
      let temp = this.phoneNo.split(' ');
      this.phoneNo = temp.join('');
      temp = this.phoneNo.split('-');
      this.phoneNo= temp.join('');
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
        this.remove();
        console.log(this.phoneNo)
        
        if (this.checkInput()) {

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
    isNumeric(num: string) {
      if (/^\d+$/.test(num)) {
          return true
      }
  
      return false
  }
  
  checkInput() {
  
      if (this.phoneNo != "") { 
          if (this.phoneNo.charAt(0) == "+" && this.isNumeric(this.phoneNo.substr(1))) {
              this.countryCode='';
              return true
          }
          if (this.isNumeric(this.phoneNo)) {
              return true
          }
      }
      return false
  }
}
