import { Router } from "aurelia-router";
import { autoinject } from "aurelia-framework";

@autoinject()
export class GetViewModelFromRouter{

    constructor(private router:Router){}

    async exec(viewModelRef:string){
        //@ts-ignore
        if(this.router.container.viewModel[viewModelRef]){
            //@ts-ignore
            return this.router.container.viewModel[viewModelRef];
        }

        else{
            console.log('component not found, maybe it has not been attached yet');
            return new Promise((next, reject)=>{
                
                let times = 0;

                let intervalId = setInterval(() => {
                    //@ts-ignore
                    if(this.router.container.viewModel[viewModelRef]){
                        clearInterval(intervalId);
                        //@ts-ignore
                        next(this.router.container.viewModel[viewModelRef]);
                    }
                    else{
                        times++;
                        if (times == 3) {
                            clearInterval(intervalId);
                            reject('Component not found');
                        }
                    }
                   
                }, 50);

                
            })
        }



    }


}