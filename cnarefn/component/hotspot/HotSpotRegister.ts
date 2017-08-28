import BaseRegister from '../BaseRegister'
import HotSpotComponent from './HotSpotComponent'

export default class HotSpotRegister extends BaseRegister {

    static parentActor = "scene";

    type: string = "hotspot";

    component: Map<string, HotSpotComponent> = new Map<string, HotSpotComponent>();

    init(el:HTMLElement){
        let name = el.getAttribute('name');
        this.component.set(name,  new HotSpotComponent(this.type, name, this,el));
    }

    /**
     * 更新pano中该元素的属性值
     * 
     * @param key 属性key
     * @param value 属性value
     * @param comp 当前更新的组件内容
     */
    update(key: string, value: any, comp: HotSpotComponent) {
        // TODO: update the value for this hotspot

        let _key = `${this.type}[${comp.getproperty("name")}].${key}`;
        this.set(_key, value);
    }

    /**
     * 删除一个热点元素
     * @param name 热点名称
     */
    delete(name:string) {
        this.component.get(name).dom.remove();
        this.component.delete(name);
        this.call(`removehotspot(${name})`);
    }
    get(name:string){
        return this.component.get(name);
    }
    /**
     * 添加一个普通的hotspot热点内容
     */
    addOne() {
        let name = this.getName();
        let hotspot = this.createHotspot(name);

        this.component.set(name, hotspot);
        return hotspot;
    }

    private createHotspot(name) {
        this.call(`addHotspot(${name})`);
        return new HotSpotComponent(this.type, name, this)
    }
}