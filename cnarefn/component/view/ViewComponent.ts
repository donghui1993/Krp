import BaseElementComponent from '../BaseElementComponent'
import ViewRegister from './ViewRegister'
import Elcomplex from '../../extra/object/Elcomplex'

export default class ViewComponent extends BaseElementComponent {

    properties = {
        hlookat: "0",//中心视角经度
        vlookat: "0",//中心视角纬度
        fovtype: "MFOV",
        fov: "90",
        maxpixelzoom: "1.0",
        fovmin: "100",
        fovmax: "100",
        limitview: "lookat"
    }
    constructor(type: string, name: string, register: ViewRegister, el?: HTMLElement) {
        super(type, name, register.parent, el);
        this.register = register;
        if (el) {
            this.dom = el;
            this.setproperties(Elcomplex.nodenamemap2Object(el.attributes))
        } else {
            this.setproperty('name', name);
        }
    }
    // VFOV 垂直视野 - 基于屏幕高度
    // HFOV 水平视野 - 基于屏幕宽度
    // DFOV 对角线视野 - 基于屏幕对角线
    // MFOV 最大视野 - 基于“最大”屏幕尺寸 : 最大屏幕尺寸=最大（屏幕宽度，屏幕高度* mfovratio）
    // 在移动设备和平板电脑上，默认值为MFOV

    setFovType(type) {
        if (/^(VFOV|HFOV|DFOV|MFOV)$/g.test(type && type.toUpperCase())) {
            this.setpropertyForUpdate("fovtype", type);
        }
    }
}