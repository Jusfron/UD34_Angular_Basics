import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UD34_Angular_Basics';
  input = '0';
  prev = " ";
  replaceLast = false;
  replaceAll = false;


  setInput(text: any) {
    this.input = text;
  }

  setPrev(text: any) {
    this.prev = text;
  }

  retr() {
    if (this.input.length > 1 || this.input != "0") {
      if (this.input.charAt(this.input.length - 2) === ".") {
        this.setInput(this.input.slice(0, -2));
      } else {
        this.setInput(this.input.slice(0, -1));
        if (this.input === "" || this.input === "-") {
          this.setInput("0");
        }
      }
    }
  }

  ce() {
    this.setInput("0");
  }

  c() {
    this.setInput("0");
    this.setPrev(" ");
  }

  signoOperacion(signo: any) {
    if (!this.replaceAll) {
      this.operar(this.buscarSimbolo());
    }
    this.setPrev(this.input + " " + signo + " ");
    this.replaceAll = true;
    this.replaceLast = false;
  }

  raiz() {
    this.setPrev("√" + this.input);
    this.setInput(Math.sqrt( parseFloat(this.input) ));
    this.replaceAll = true;
    this.replaceLast = false;
  }

  inv() {
    this.setPrev("1/(" + this.input + ")");
    this.setInput(1 / parseFloat(this.input));
    this.replaceAll = true;
    this.replaceLast = false;
  }

  sign() {
    if (this.input != "0") {
      if (this.input.search(/-/) === -1) {
        this.setInput("-" + this.input);
      } else {
        this.setInput(this.input.replace(/-/, ""));
      }
    }

  }

  dot() {
    if (this.input.search(/\./) === -1) {
      this.setInput(this.input + ".0");
      this.replaceLast = true;
    }

  }

  eq() {
    if (this.prev.search(/\=/) != -1) {                             //Si es operacion repetida
      let num: any = this.prev.split(" ")[2];                         //guardar el input previo
      this.setPrev(this.input + " " + this.prev.split(" ")[1] + " ");    //ej. "50 + 5 =" ===> "55 +" (para que funcione bien el operar() )
      this.setInput(num);                                                  //poner el input previo en el input para operar
      this.operar(this.buscarSimbolo());
    } else {
      this.operar(this.buscarSimbolo());
    }
  }

  num(numero: any) {
    if (numero === "0" && this.input === "0") {       //si hay un 0 y clicas al 0 otra vez; para que no salga un 00
      //nada
    } else if (this.replaceLast || (numero != "0" && this.input === "0")) {    //Reemplazar el input ej. 0 ==> 4
      this.setInput(this.input.slice(0, -1));
      this.setInput(this.input + numero);
      this.replaceLast = false;
      this.replaceAll = false;
    } else if (this.replaceAll) {                                            //Reemplazar todo, operacion nueva
      if (this.prev.search("=") != -1) {
        this.setPrev(" ");                                          //poner un caracter invisible en label para mantener formato
      }
      this.setInput(numero);
      this.replaceAll = false;
    } else {
      this.setInput(this.input + numero);
    }
  }

  operar(operacio: any) {
    switch (operacio) {
      case "+":
        this.setPrev(this.prev + this.input + " =");
        this.setInput(+this.prev.split(" ")[0] + +this.input);
        this.replaceAll = true;
        break;
      case "-":
        this.setPrev(this.prev + this.input + " =");
        this.setInput(+this.prev.split(" ")[0] - +this.input);
        this.replaceAll = true;
        break;
      case "*":
        this.setPrev(this.prev + this.input + " =");
        this.setInput(+this.prev.split(" ")[0] * +this.input);
        this.replaceAll = true;
        break;
      case "/":
        this.setPrev(this.prev + this.input + " =");
        this.setInput(+this.prev.split(" ")[0] / +this.input);
        this.replaceAll = true;
        break;
      case "%":
        this.setPrev(this.prev + this.input + " =");
        this.setInput(+this.prev.split(" ")[0] % +this.input);
        this.replaceAll = true;
        break;
    }
  }

  buscarSimbolo() {
    if (this.prev.search(/\+/) != -1) {
      return "+";
    } else if (this.prev.search(/\-/) != -1) {
      return "-";
    } else if (this.prev.search(/\*/) != -1) {
      return "*";
    } else if (this.prev.search(/\//) != -1) {
      return "/";
    } else if (this.prev.search(/\%/) != -1) {
      return "%";
    } else {
      return null
    }
  }
}



