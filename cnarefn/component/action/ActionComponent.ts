import BaseComponent from '../BaseComponent'
import ActionRegister from './ActionRegister'
import BaseElementComponent from '../BaseElementComponent'
import ComponentContainer from '../ComponentContainer'
import Elcomplex from '../../extra/object/Elcomplex'

export default class ActionComponent extends BaseComponent {

    properties = {
        name: "",
        autorun: undefined
    }
    // 如果needed =false ，则不会添加到xml中，只会直接添加到action中。
    private needed = false;

    type = "action";

    // 绑定所有注册该action的组件内容。
    allComponents: Map<string, ComponentContainer> = new Map<string, ComponentContainer>();

    // 动作脚本内容，可以从外部更新
    /**
     * "spheretoscreen(ath, atv, x, y, 'l')",
        "sub(dragx, mouse.stagex, x)",
        "sub(dragy, mouse.stagey, y)",
        "asyncloop(pressed,sub(dx, mouse.stagex, dragx);sub(dy, mouse.stagey, dragy);screentosphere(dx, dy, ath, atv);)"
     */

    actions: Array<string> = [];

    //字符化内容
    actionStrs: string = "";

    constructor(type: string, name: string, register: ActionRegister, el?: HTMLElement) {
        super(type);
        this.register = register;

        if (el) {
            this.dom = el;
            this.setActions(el.innerHTML.split(';'))
            this.setproperties(Elcomplex.nodenamemap2Object(el.attributes))
        } else {
            this.setproperty('name', name);
        }
    }
    /**
     * 更新所有该元素的内容
     */
    private updateAll() {

        this.allComponents.forEach((comp, name) => {
            let component = comp.value;
            comp.name.forEach(val => {
                this.updateOne(val, component, this.needed);
            })

        })
    }
    /**
     *  更细单个元素内容
     * @param name 更新的属性名称
     * @param ele 组件元素
     * @param bool 是否需要更新到dom元素中
     */
    private updateOne(name: string, ele: BaseElementComponent, bool = this.needed) {
        if (bool) {
            ele.setproperty(name, this.getproperty('name'));
        } else {

            ele.setproperty(name, null);
        }
        ele.setpropertyForPano(name, this.actionStrs);
    }
    /**
     * 如果needed = true ，将把该元素填充到页面中去，作为一个action标签存在
     * 如果needed = false，则该action不需要保存到页面中去。
     * @param bool 是否需要填充到页面中去
     */
    setNeeded(bool: boolean) {
        let isupdate = this.needed != bool
        if (bool && !this.dom) {
            this.createDom(this.register.parent).innerText = this.actionStrs;
            this.domInit();
        } else {
            if (this.dom) {
                this.dom.remove()
            }
        }
        this.needed = bool;
        if (isupdate) {
            this.updateAll();
        }

    }

    /**
     * 为BaseElementComponent对象添加本脚本内容
     * @param actionName 该动作被添加到哪个命令下面 onclick ondown
     * @param el 需要添加该脚本的元素
     */
    addElComponent(actionName: string, ele: BaseElementComponent) {
        let name = ele.getproperty('name');
        if (!name) { // 对象必需存在name属性
            return console.log("if use action ,component must set a name properties")
        }
        let compContainer = this.allComponents.get(name) || (new ComponentContainer(actionName, ele));

        if (!compContainer.contains(actionName)) {
            compContainer.addMore(actionName);
        }
        
        this.allComponents.set(name, compContainer);
        this.updateOne(actionName, ele);
    }

    /**
     * 设置action内容，同时将会更新绑定元素的action动作，建议内容最好为数组
     * @param strs actions
     */
    setActions(strs: Array<string>) {
        this.actions = strs;
        this.actionStrs = this.actions.join(';');
        return this;
    }
    /**
     * 用来给actions添加语句内容
     * @param str action语句内容，
     */
    append(str: string) {
        this.actions.push(str);
        this.actionStrs += ';'
        this.actionStrs += str;
        return this;
    }
}