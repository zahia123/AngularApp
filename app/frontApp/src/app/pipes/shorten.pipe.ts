import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name:'shorten'
})
 /**
	 * shortning the length of data we getting from the server
	 */
  export class ShortenPipe implements PipeTransform{
  transform(value:any){
  return value.substr(0,10)+' ...';
  }
}