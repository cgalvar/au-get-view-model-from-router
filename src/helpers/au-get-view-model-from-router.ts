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
    
                setTimeout(() => {
                    //@ts-ignore
                    if(this.router.container.viewModel[viewModelRef]){
                        //@ts-ignore
                         next(this.router.container.viewModel[viewModelRef]);
                    }
                    else
                        reject('Component not found');
                   
                }, 50);
            })
        }



    }


}