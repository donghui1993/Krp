
import HotSpotRegister from "./component/hotspot/HotSpotRegister"
import ActionRegister from "./component/action/ActionRegister"
import SceneRegister from './component/scene/SceneRegister'

export default class RegisterEnum {
    registers = {
        hotspot: HotSpotRegister,
        action: ActionRegister,
        scene: SceneRegister
    }

    get(type) {
        return this.registers[type];
    }

    getAll() {
        return this.registers;
    }

}