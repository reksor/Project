import { Injectable, Provider,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


interface IStorage{
  setItem<T>(key: string, item: T):T;
  getItem<T>(key: string ): T
}

export class PerStorageService implements IStorage {
setItem<T>(key: string, item: T): T {return item;}
getItem<T>(key: string): T {return null;}
}
export function storageFactory(platformId: string): any{
if(isPlatformBrowser(platformId)){
  return new BrowserStorage();
}
if(isPlatformServer(platformId)){
  return new SereverStorage();
}
}

export const storageServiceProvider:Provider={
  provide: PerStorageService,
  useFactory: storageFactory,
  deps: [PLATFORM_ID]
}

 @Injectable()
export class BrowserStorage {
  localStorage = localStorage;

  setItem<T>(key: string, item: T):T {
    const str=typeof item=="string"? item:JSON.stringify(item)
    this.localStorage.setItem(key, str);
    return item;
  }
  getItem<T>(key: string ): T {
    let item;
    const tmp = this.localStorage.getItem(key) as any;
    if (!tmp) { return tmp; }
    try{
      item = JSON.parse(tmp);
    }catch {
      item=tmp;
    }
    return item;
  }
}

@Injectable()
export class SereverStorage{

 localStorage = {
   data: {},
   setItem<T>(key: string, item: T): void {
     this.data[key] = item;
   },
   getItem<T>(key: string):T {
    return this.data[key];
  }
 };

 setItem<T>(key: string, item: T):T{
  this.localStorage.setItem(key, JSON.stringify(item));
  return item;
}
getItem<T>(key: string ): T {
  let item;
  const tmp=this.localStorage.getItem(key) as any;
  if(!tmp) { return tmp; }
  try{
    item = JSON.parse(tmp);
  }catch {
    item=tmp;
  }
  return item;
}
}
