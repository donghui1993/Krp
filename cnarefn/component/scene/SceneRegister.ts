import BaseRegister from '../BaseRegister'
import SceneComponent from './SceneComponent'

export default class SceneRegister extends BaseRegister {

    static parentActor = "krpano";

    type: string = "scene";

    component: Map<string, SceneComponent> = new Map<string, SceneComponent>();

    init(el: HTMLElement) {

    }

    update(key: string, value: any, comp: SceneComponent) {
        // TODO: update the value for this hotspot

        if (key == undefined) {
            return console.log('not any key could be update');
        }
        let _key = `${this.type}[${comp.getproperty("name")}].${key}`;
        this.set(_key, value);
    }

}