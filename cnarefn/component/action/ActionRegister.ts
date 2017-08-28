import BaseRegister from '../BaseRegister'
import ActionComponent from './ActionComponent'

export default class ActionRegister extends BaseRegister{
    
    static parentActor = "krpano";

    type = "action";

    component: Map<string, ActionComponent> = new Map<string, ActionComponent>();

    init(el:HTMLElement){

    }

    update(key: string, value: any, component: ActionComponent){
        // TODO: NOTHING
    }
    /**
     * 绑定action内容
     * @param name action 的名称
     */
    addOne(name:string){
        if(!this.component.has(name)){
            this.component.set(name,new ActionComponent(this.type,name));
        }
        return this.component.get(name);
    }
    // 得到绑定的action内容
    getActionComponent(name:string){
        this.component.get(name);
    }
    
}