import BaseRegister from './BaseRegister'
import Propertis from './Propertis'

export default abstract class BaseComponent {

    //parentElement from this at the firstappend

    dom: HTMLElement

    actor: string

    type: string

    protected abstract properties: any  // 保存实际的属性内容

    recentProps = {} // 最新更新使用的属性值

    constructor(type: string, name: string, parent: HTMLElement) {

        this.type = type;
        this.createDom(parent);
        this.createActor(name);
        
    }

    createDom(parent: HTMLElement) {
        this.dom = document.createElement(this.type);
        parent.appendChild(this.dom);
        //不明白创建的内容会携带xmlns，这里人工剔除,但是不起作用
        this.dom.removeAttribute('xmlns');
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
    setproperty(name, value) {
        if (this.properties.hasOwnProperty(name)) {
            this.properties[name] = value;
            if(value != undefined)
                this.dom.setAttribute(name, value);
            else 
                this.dom.removeAttribute(name);
        };
        return this;
    }

    setproperties(obj: any) {
        if (obj == null) return;
        for (let key in obj) {
            this.setproperty(key, obj[key]);
        }
    }

    getproperty(name) {
        return this.properties[name];
    }

    getproperties() {
        return this.properties;
    }
    domInit() {
        this.setproperties(this.properties)
    }
}