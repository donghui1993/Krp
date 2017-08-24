import BaseRegister from '../BaseRegister'
import ActionComponent from './ActionComponent'

export default class ActionRegister extends BaseRegister{
    
    static parentActor = "krpano";

    type = "action";

    component: Map<string, ActionComponent> = new Map<string, ActionComponent>();

    update(key: string, value: any, component: ActionComponent){
        // TODO: NOTHING
    }
    addOne(name:string){
        if(!this.component.has(name)){
            this.component.set(name,new ActionComponent(this.type,name));
        }
        return this.component.get(name);
    }
    actionCall(name:string){
        this.component.get(name);
    }
    
}