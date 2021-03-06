import BaseRegister from '../BaseRegister'
import SceneComponent from './SceneComponent'
import Console from '../../extra/system/Console'
import Elcomplex from '../../extra/object/Elcomplex'
export default class SceneRegister extends BaseRegister {

    static parentActor = "krpano";

    type: string = "scene";

    component: Map<string, SceneComponent> = new Map<string, SceneComponent>();

    init(el: HTMLElement) {
        let name = el.getAttribute('name');
        this.component.set(name, new SceneComponent(this.type, name, this, el));
    }

    update(key: string, value: any, comp: SceneComponent) {
        // TODO: update the value for this hotspot

        if (key == undefined) {
            return Console.error('not any key could be update');
        }
        let _key = `${this.type}[${comp.getproperty("name")}].${key}`;
        this.set(_key, value);
    }

}