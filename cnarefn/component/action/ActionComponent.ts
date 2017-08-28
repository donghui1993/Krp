import BaseComponent from '../BaseComponent'
import ActionRegister from './ActionRegister'
import BaseElementComponent from '../BaseElementComponent'

export default class ActionComponent extends BaseComponent {
    properties = { name: "" }
    // 如果needed =false ，则不会添加到xml中，只会直接添加到action中。
    needed = false;

    // 绑定所有注册该action的组件内容。
    allComponents:Map<string,BaseElementComponent> =  new Map<string,BaseElementComponent>();

    // 动作脚本内容，可以从外部更新
    /**
     * "spheretoscreen(ath, atv, x, y, 'l')",
        "sub(dragx, mouse.stagex, x)",
        "sub(dragy, mouse.stagey, y)",
        "asyncloop(pressed,sub(dx, mouse.stagex, dragx);sub(dy, mouse.stagey, dragy);screentosphere(dx, dy, ath, atv);)"
     */
    actions :Array<string>;

    constructor(type: string, name: string) {
        super(type);
        this.setproperty('name', name);
    }

    /**
     * 提供指定的元素内容，为该元素添加action内容
     * 返回actions数组
     * @param ele BaseElementComponent
     */
    getAction(ele:BaseElementComponent) {
        let name  = ele.getproperty('name');
        if(!name) return console.log("if use action ,component must set a name properties");

        if(!this.allComponents.has(ele.getproperty('name'))){
            this.allComponents.set(name,ele);
        }
        return this.actions;
    }
    /**
     * 设置action内容，同时将会更新绑定元素的action动作，建议内容最好为数组
     * @param strs actions
     */
    seAction(strs:Array<string>){
        this.actions = strs;
        return this;
    }
    /**
     * 用来给actions添加语句内容
     * @param str action语句内容，
     */
    append(str:string){
        this.actions.push(str);
        return this;
    }
}