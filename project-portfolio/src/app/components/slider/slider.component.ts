import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

//**For the 'output' in the import we also add 'EventEmitter'
//To create new events

//** Add at the top import 'Input'
//we receive from the parent component the variable width and we can use it
//simply with this decorator
  @Input() anchura:number;
  @Input('etiquetas') captions:boolean;

//let's generate an event: get author
// and to launch the event when we are interested, we create the cast () function
  @Output() conseguirAutor = new EventEmitter;

  public autor:any;

  constructor() { 

    this.autor ={
      nombre: "Carmelo Navarro",
      website: "ng.carmelo@gmail.com",
      youtube: "Carmelo Navarro Web"
    }

  }

  ngOnInit() {

  		$("#logo").click(function(e){
  		e.preventDefault();
			$("header").css("background", "green")
			.css("height", '50px')
  	});

  
  $('.galeria').bxSlider({
    mode: 'fade',
    captions: this.captions,
    slideWidth: this.anchura
  });

  //Lanzar el evento: sin funcion, al cargar el componente
 // this.conseguirAutor.emit(this.autor);

  }

  lanzar(event){
    console.log(event);
    this.conseguirAutor.emit(this.autor);
  }

}
