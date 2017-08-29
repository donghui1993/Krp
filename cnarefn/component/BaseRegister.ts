import { Uuid } from '../extra/string/Uuid'

import BaseComponent from './BaseComponent'

export default abstract class BaseRegister {

    krpano: any;

    parent: HTMLElement;

    abstract type: string;

    abstract component: Map<string, BaseComponent>;

    protected constructor(krpano: any, parent: HTMLElement) {
        this.krpano = krpano;
        this.parent = parent;
    }

    abstract update(key: string, value: any, component: BaseComponent)

    abstract init(el: Element);
    /**
     * 给pano设置内容
     * @param key 设置的参数名
     * @param value 值
     */
    protected set(key: string, value: any) {
        this.krpano.set(key, value);
    }
    /**
     * 从pano中获取值内容
     * @param key 值名称
     */
    protected get(key: string) {
        return this.krpano.get(key);
    }
    /**
     * 执行action语句内容
     * @param action 动作语句
     */
    protected call(action: string) {
        this.krpano.call(action)
    }

    /**
     * 创建一个内容
     * @param fullType 
     */
    public create(fullType: string) {
        this.call(fullType)
    }
    /**
     * 全景坐标转屏幕坐标
     * @param horizontal 经度
     * @param vertical 纬度
     */
    protected spheretoscreen(horizontal: number | string, vertical: number | string) {
        return this.krpano.spheretoscreen(horizontal, vertical)
    }
    /**
     * 屏幕坐标转全景坐标
     * @param x 屏幕x坐标
     * @param y 屏幕y坐标
     */
    protected screentosphere(x: number | string, y: number | string) {
        return this.krpano.screentosphere(x, y);
    }
    /**
     * 根据指定的经纬度名称获取当前屏幕中心的球面位置
     * 
     * @param v 纬度名称
     * @param h 经度名称
     */
    public getLookat(v: string = "vlookat", h: string = "hlookat") {
        return {
            [v]: this.get('view.vlookat') || 0,
            [h]: this.get('view.hlookat') || 0
        };
    }
    /**
     * 生成一个name内容
     */
    getName() {
        return Uuid.generate(8);
    }
}