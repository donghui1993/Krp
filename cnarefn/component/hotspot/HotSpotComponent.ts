import BaseElementComponent from '../BaseElementComponent'
import HotSpotRegister from './HotSpotRegister'
import ActionComponent from '../action/ActionComponent'
import Elcomplex from '../../extra/object/Elcomplex'

export default class HotSpotComponent extends BaseElementComponent {

    protected properties = {
        name: "", //id
        url: "/images/vtourskin_hotspot.png", // 热点图 该内容涉及跨域问题，所以最好是图片保存同源位置
        atv: 0,//垂直视距 
        ath: 0,//水平视距  就是当前屏幕所在的位置坐标中心
        scale: 0.5,//缩放
        zoom: true,//跟随缩放
        distorted: true, // 跟随屏幕扭曲
        tooltip:undefined,// 提示文本
        linkedscene:undefined, // 链接场景
        crop: undefined, // 动画剪裁
        onloaded: undefined, // 加载完成后执行
        onclick:undefined,// 点击后执行
        ondown: undefined,// 按下后执行
        onup: undefined// 弹起后执行
    }
    // 联合组件内容
    joint: string;

    constructor(type: string, name: string, register: HotSpotRegister, el?: HTMLElement) {
        super(type, name, register.parent, el);

        if (!el) {
            this.setproperty("name", name);
            this.setproperties(register.getLookat("atv", "ath"));
            this.domInit();//函数体内有抽象元素的时候，不能直接在父元素内调用，只能通过子元素调用，否则拿不到抽象值的具体内容
        } else {
            this.setproperties(Elcomplex.nodenamemap2Object(el.attributes));
        }

        this.create4Pano(register);
    }
    /**
     * 该属性是为单独设置属性，实际上用来设置onloaded的action="do_crop_animation()"
     * 
     * @param bool 是否开启剪裁动画模式
     * @param width 每剪裁一帧的宽度
     * @param height 每剪裁一帧的高度
     * @param frame 刷新率
     */
    setCrop(bool, width, height, frame) {
        this.setproperty('onloaded', bool ? `do_crop_animation(${width},${height},${frame})` : "");
        return this;
    }
    /**
     * 为当前元素设定action内容
     * @param actionName 动作名称，必需已经定义在properties中
     * @param action 动作组件
     */
    setAction(actionName, action: ActionComponent) {
        action.addElComponent(actionName, this);
        return this;
    }
}