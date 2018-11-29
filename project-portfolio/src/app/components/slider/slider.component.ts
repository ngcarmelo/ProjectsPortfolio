import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

//**Para el 'output' en el import tambien añadimos 'EventEmitter' 
//Para crear nuevos eventos


//** Agregar en el import de arriba 'Input'
//recibimos desde el componente padre la variable anchura y ya podemos usarla
//simplemente con este decorador
  @Input() anchura:number;
  @Input('etiquetas') captions:boolean;

//vamos a generar un evento: conseguir autor
// y para lanzar el evento cuando nos interese, creamos la funcion lanzar()
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
