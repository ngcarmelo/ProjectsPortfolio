import { Component, OnInit, ViewChild } from '@angular/core';

 //declare var jQuery:any;
 declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	public widthSlider: number;
	public anchuraToSlider: any;
	public captions:boolean;
	public autor: any;

   //para acceder a los elementos que llevan delante #, ejemplo: #textos
	@ViewChild('textos') textos

  constructor() {

  	this.captions = false;
   }

  ngOnInit() {
  	var opcion_clasica = document.querySelector('#texto').innerHTML;
  	//console.log(this.textos.nativeElement.textContent);

    }

  cargarSlider(){
  	this.anchuraToSlider = this.widthSlider;

  }
 resetearSlider(){
  	this.anchuraToSlider = false;

  }

  getAutor(event){
  	console.log('metodo get Autor');
  	console.log(event);
  	this.autor = event;

  }
}
