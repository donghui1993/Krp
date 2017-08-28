export default class ForLoop {

    static each(obj: Object, callbackfn: (key: string, value: any, obj) => void) {
        if (obj) {
            for (let k in obj) {
                callbackfn(k, obj[k], obj);
            }
        }
    }
    static eloop(nodes: NodeListOf<Element>, callbackfn: (el: Element, index: number, nodes) => void) {
        if (nodes) {
            for (let k = 0, len = nodes.length; k < len; k++) {
                callbackfn(nodes.item(k), k, nodes);
            }
        }
    }
    static attrsLoop(nodes:NamedNodeMap,callbackfn: (name: string, value: any, nodes) => void){
        if(nodes){
            for(let k = 0,len = nodes.length;k<len;k++){
                let node = nodes.item(k);
                callbackfn(node.name,node.value,nodes);
            }
        }
    }
}