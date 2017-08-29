export default class ForLoop {
    /**
     * 枚举对象属性列表进行处理
     * 
     * @param obj 循环对象
     * @param callbackfn 回调函数 key object[key]  object
     */
    static each(obj: Object, callbackfn: (key: string, value: any, obj) => void) {
        if (obj) {
            for (let k in obj) {
                callbackfn(k, obj[k], obj);
            }
        }
    }
    /**
     * 循环nodelist列表内容
     * @param nodes NodeList 
     * @param callbackfn 回调函数
     */
    static eloop(nodes: NodeListOf<Element>, callbackfn: (el: Element, index: number, nodes) => void) {
        if (nodes) {
            for (let k = 0, len = nodes.length; k < len; k++) {
                callbackfn(nodes.item(k), k, nodes);
            }
        }
    }
    /**
     * 将属性值列表变成key-value内容，只读取其中的name和value值。
     * this指向当前的属性
     * 
     * @param nodes NamedNodeMap
     * @param callbackfn 回调函数
     */
    static attrsLoop(nodes: NamedNodeMap, callbackfn: (name: string, value: any, nodes) => void) {
        if (nodes) {
            for (let k = 0, len = nodes.length; k < len; k++) {
                let node = nodes.item(k);
                callbackfn.call(node, node.name, node.value, nodes);
            }
        }
    }
}