import BaseRegister from '../BaseRegister'
import HotSpotComponent from './HotSpotComponent'

export default class HotSpotRegister extends BaseRegister {

    static parentActor = "scene";

    type: string = "hotspot";



    component: Map<string, HotSpotComponent> = new Map<string, HotSpotComponent>();

    constructor(krpano, parent: HTMLElement) {
        super(krpano, parent);

    }

    update(key: string, value: any, hotspotComponent: HotSpotComponent) {
        // TODO: update the value for this hotspot

        if (key == undefined){
            return console.log('not any key could be update');
        }
        let _key = `hotspot[${hotspotComponent.getproperty("name")}].${key}`;
        this.set(_key, value);
    }

    addOne() {
        let name = this.getName();
        let hotspot = this.createHotspot(name);

        this.component.set(name, hotspot);
        return hotspot;
    }

    private createHotspot(name) {
        this.call(`addHotspot(${name})`);
        return new HotSpotComponent(this.type, name, this, this.parent)
    }
}