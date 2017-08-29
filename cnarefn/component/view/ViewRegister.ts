import BaseRegister from '../BaseRegister'
import ViewComponent from './ViewComponent'

export default class ViewRegister extends BaseRegister {

    static parentActor = "krpano";

    type: string = "scene";

    component: Map<string, ViewComponent> = new Map<string, ViewComponent>();

    init(el: HTMLElement) {

    }

    update(key: string, value: any, comp: ViewComponent) {
        // TODO: update the value for this hotspot

        if (key == undefined) {
            return console.log('not any key could be update');
        }
        let _key = `${this.type}[${comp.getproperty("name")}].${key}`;
        this.set(_key, value);
    }
}