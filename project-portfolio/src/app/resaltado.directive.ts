import { Directive, ElementRef } from '@angular/core';
//We add elementRef to select element of the dom
@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

//we add the Element ref in the constructor:
  constructor(public el:ElementRef) {
  //	console.log(el.nativeElement);
  //	el.nativeElement.style.background ="blue";

 	  // var element = el.nativeElement;
    // element.style.background="blue";
    // element.style.padding = "20px";
    // element.style.marginTop ="15px";
    // element.style.color = "white";



   }

 ngOnInit(){

   var element = this.el.nativeElement;
    element.style.background="blue";
    element.style.padding = "20px";
    element.style.marginTop ="15px";
    element.style.color = "white";
 }


}
