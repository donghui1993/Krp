import BaseElementComponent from '../BaseElementComponent'
import ViewRegister from './ViewRegister'

export default class ViewComponent extends BaseElementComponent {

    properties = {}
    constructor(type: string, name: string, register: ViewRegister) {
        super(type, name, register.parent);

        this.create4Pano(register);
        this.setproperty("name", name);
        this.setproperties(register.getLookat("atv", "ath"));

        this.domInit();//函数体内有抽象元素的时候，不能直接在父元素内调用，只能通过子元素调用，否则拿不到抽象值的具体内容
    }

}