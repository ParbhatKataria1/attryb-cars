export function debounce(func:any, timer:number){
    let id:any = null;
    return (value:number):void=>{
      if(id){
        clearTimeout(id);
      }
      id = setTimeout(() => {
        func(value);
      }, timer);
    }
  }