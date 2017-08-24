import BaseComponent from '../BaseComponent'
import ActionRegister from './ActionRegister'

export default class ActionComponent extends BaseComponent {
    properties = {  name:""  }
    
    actions = [
        "spheretoscreen(ath, atv, x, y, 'l')",
        "sub(dragx, mouse.stagex, x)",
        "sub(dragy, mouse.stagey, y)",
        "asyncloop(pressed,sub(dx, mouse.stagex, dragx);sub(dy, mouse.stagey, dragy);screentosphere(dx, dy, ath, atv);)"
    ];

    constructor(type: string, name: string) {
        super(type);
        this.setproperty('name',name);
    }

    getAction() {
        return this.actions.join(";");
    }
}