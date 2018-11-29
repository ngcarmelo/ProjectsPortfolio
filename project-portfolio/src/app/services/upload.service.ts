import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService {
	public url: string;

	constructor(){
		this.url = Global.url;
	}
	//peticion ajax clasica, adjuntando un archivo a subir
	
	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest(); //peticion ajax en js clasico

			for(var i = 0; i < files.length; i++) {
				formData.append(name, files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 ){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response)); //ejecutamos el resolve
					}else {
						reject(xhr.response);

					}
				}
			}
			//peticion ajax:
			xhr.open('POST', url, true);
			xhr.send(formData);
		});

	}

}