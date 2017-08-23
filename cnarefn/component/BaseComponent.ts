import BaseRegister from './BaseRegister'
import Propertis from './Propertis'

export default abstract class BaseComponent {

    dom: HTMLElement

    actor: string

    type: string

    protected abstract properties: any  // 保存实际的属性内容
    recentProps = {} // 最新更新使用的属性值

    constructor(type: string, name: string) {
        this.type = type;
        this.createDom();
        this.createActor(name);
    }

    createDom() {
        this.dom = document.createElement(this.type);
    }

    createActor(name: string) {
        this.actor = `${this.type}[${name}]`
    }

    create4Pano<T extends BaseRegister>(register: T) {
        let props = this.properties;
        for (let key in props) {
            register.update(key, props[key], this)
        }
    }
    /**
     * 设置属性值，如果没有定义则不被设置
     * 
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setproperty(name, value, init: boolean = false) {
        if (this.properties[name] != undefined) {
            this.properties[name] = value
        };
        if (!init) {
            this.recentProps[name] = value;
        }
        return this;
    }

    setproperties(obj: any, init: boolean = false) {
        if (obj == null) return;
        for (let key in obj) {
            this.setproperty(key, obj[key], init);
        }
    }

    getproperty(name) {
        return this.properties[name];
    }

    getproperties(){
        return this.properties;
    }
    getDom(){
        let props = this.getproperties();
        for (var key in props) {
            this.dom.setAttribute(key,props[key]);
        }
        return this.dom;
    }
}