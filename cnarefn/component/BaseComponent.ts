import BaseRegister from './BaseRegister'
import Propertis from './Propertis'

export default abstract class BaseComponent {

    //parentElement from this at the firstappend

    dom: HTMLElement

    actor: string

    type: string

    register: BaseRegister;

    protected abstract properties: any  // 保存实际的属性内容

    recentProps = {} // 最新更新使用的属性值

    constructor(type: string) {
        this.type = type;
    }

    createDom(parent: HTMLElement) {
        this.dom = document.createElement(this.type);
        parent.appendChild(this.dom);
        return this.dom;
    }

    createActor(name: string) {
        this.actor = `${this.type}[${name}]`
    }
    /**
     * 在pano中创建一个对象，并且填充属性值
     * 
     * @param register 注册器
     */
    create4Pano<T extends BaseRegister>(register: T) {
        let props = this.properties;
        for (let key in props) {
            register.update(key, props[key], this)
        }
        this.register = register;
    }

    /**
     * 设置属性值，如果没有定义则不被设置,同时更新dom
     * 返回值状态 -1 表示该值不存在 0 表示成功 -1 表示移出值
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setproperty(name, value): number {
        if (this.properties.hasOwnProperty(name)) {
            this.properties[name] = value;
            return this.setpropertyForDom(name, value)
        }
        return -1;
    }
    /**
     * 只更新dom
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setpropertyForDom(name, value) {
        if (this.dom != undefined) {
            return value != undefined ?
                (this.dom.setAttribute(name, value), 0) :
                (this.dom.removeAttribute(name), 1);
        }
    }
    /**
     * 只更新pano
     * @param name 属性名
     * @param value 属性值
     */
    setpropertyForPano(name, value) {
        this.register.update(name, value, this);
    }
    /**
     * 设置属性值并且更新pano中该元素内容
     * 
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setpropertyForUpdate(name, value) {
        if (this.setproperty(name, value) == 0) {
            this.setpropertyForPano(name, value);
        }
    }
    /**
     * 更新所有属性值并且更新pano中该元素内容
     * @param obj 属性列表
     */
    setpropertiesForUpdate(obj: any) {
        if (obj == null) {
            return;
        }
        for (let key in obj) {
            this.setpropertyForUpdate(key, obj[key]);
        }
    }
    /**
     * 更新所有值，不更新pano中该元素
     * @param obj 属性值列表
     */
    setproperties(obj: any) {
        if (obj == null) {
            return;
        }
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