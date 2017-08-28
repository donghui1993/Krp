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
        //不明白创建的内容会携带xmlns，人工剔除,但是不起作用
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
        this.register = register;
    }
    /**
     * 设置属性值，如果没有定义则不被设置
     * 返回值状态 -1 表示该值不存在 0 表示成功 -1 表示移出值
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setproperty(name, value): number {
        if (this.properties.hasOwnProperty(name)) {
            if (this.dom != undefined) {
                this.properties[name] = value;
                if (value != undefined) {
                    this.dom.setAttribute(name, value);
                    return 0;
                }
                else {
                    this.dom.removeAttribute(name);
                    return 1;
                }
            }
        }
        return -1;
    }

    /**
     * 设置属性值并且更新pano中该元素内容
     * 
     * @param name 已经定义的属性名
     * @param value 属性值
     */
    setpropertyForUpdate(name, value) {
        if (this.setproperty(name, value) == 0) {
            this.register.update(name, value, this);
        }
    }

    setpropertiesForUpdate(obj: any) {
        if (obj == null) {
            return;
        }
        for (let key in obj) {
            this.setpropertyForUpdate(key, obj[key]);
        }
    }
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