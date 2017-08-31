
import HotSpotRegister from "./component/hotspot/HotSpotRegister"
import ActionRegister from "./component/action/ActionRegister"
import SceneRegister from './component/scene/SceneRegister'
import ViewRegister from './component/view/ViewRegister'

export default class RegisterEnum {
    registers = {
        hotspot: HotSpotRegister,
        action: ActionRegister,
        scene: SceneRegister,
        view: ViewRegister
    }

    get(type) {
        return this.registers[type];
    }

    getAll() {
        return this.registers;
    }

}