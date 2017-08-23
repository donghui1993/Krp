import BaseComponent from '../BaseComponent'
import HotSpotRegister from './HotSpotRegister'


export default class HotSpotComponent extends BaseComponent {

    protected properties = {
        name: "", //id
        url: "/images/vtourskin_hotspot.png", // 热点图 该内容涉及跨域问题，所以最好是图片保存同源位置
        atv: 0,//垂直视距 
        ath: 0,//水平视距  就是当前屏幕所在的位置坐标中心
        scale: 0.5,//缩放
        zoom: true,//跟随缩放
        distorted: true, // 跟随屏幕扭曲
        onloaded: ""
    }

    joint: string;

    constructor  (type: string, name: string, register: HotSpotRegister) {
        super(type, name);

        this.setproperty("name", name, true);
        this.setproperties(register.getLookat("atv","ath"),true);
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
    }
}