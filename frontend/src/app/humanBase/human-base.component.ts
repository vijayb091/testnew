import { Component, OnInit } from '@angular/core';
// declare var require: NodeRequire;
// declare var module: NodeModule;
// interface NodeModule {
//   id: string;
// }
@Component({
  selector: 'app-human-base',
  templateUrl: './human-base.component.html',
  styleUrls: ['./human-base.component.css']
})
export class HumanBaseComponent implements OnInit {
  data: any[]=[{firstName: "farhan"}, {lastName: "aslam"}]
  // cipher:'camellia-128-cbc';
  // passKey: '394rwe78fudhwqpwriufdhr8ehyqr9pe8fud';
  // encoding: 'hex';
  customeri: string = 'CUSTOMERI';
  prospect: string = 'PROSPECT';
  upload: string = 'UPLOAD & DOWNLOAD';
  grouppi: string = 'PERSONALIDDA GROUPPI';
  detail: string = 'DETTAGLIO';

  constructor() { }

  ngOnInit() {
    this.setKey();
    this.testEncryption();  
  }
  	// set key if not set in local storage
	 setKey() {
    
		
	}
  testEncryption(){
    // var CryptoJS = require("crypto-js");
    
    // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.data), 'secret');
    // console.log("Encrypted Data", ciphertext);
    // let cryptoJSON = require('crypto-json');
    // var object = {
    //   first_name: 'Miles',
    //   last_name: 'Davis',
    //   instrument: 'Trumpet',
    //   birth_year: 1926,
    //   albums: [
    //     {title: 'Birth of the Cool', year: 1957},
    //     {title: 'Bitches Brew', year: 1970}
    //   ]
    // }
    // var encrypted = cryptoJSON.encrypt(object, this.passKey, {
    //   algorithm: this.cipher,
    //   encoding: this.encoding,
    //   keys: ['first_name', 'last_name','birth_year']
    // });

    // console.log("Encryped Data", encrypted);
    
}

}
