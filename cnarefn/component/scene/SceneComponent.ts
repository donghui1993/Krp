import BaseElementComponent from '../BaseElementComponent'
import SceneRegister from './SceneRegister'
import Elcomplex from '../../extra/object/Elcomplex'

export default class SceneComponent extends BaseElementComponent {

    properties = {
        name: "",
        title: "",
        onstart: undefined,
        havevrimage: "true",
        thumburl: "panos/tiles/thumb.jpg",
        lat: "",
        lng: "",
        heading: ""
    }
    constructor(type: string, name: string, register: SceneRegister, el?: HTMLElement) {
        super(type, name, register.parent, el);
        this.register = register;
        if (el) {
            this.dom = el;
            this.setproperties(Elcomplex.nodenamemap2Object(el.attributes))
        } else {
            this.setproperty('name', name);
        }
    }

}