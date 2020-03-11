import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
const a =0;
if(a!=0){
  localStorage.removeItem('userInfo');
  this.a=a+1;
}

if (environment.production) {
  console.log('prod');
  enableProdMode();
}else{
  console.log('desarrollo');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
