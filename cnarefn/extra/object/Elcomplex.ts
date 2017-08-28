import ForLoop from './ForLoop'
export default class Elcomplex{

    public static nodenamemap2Object(nodename:NamedNodeMap){
        let obj = {};
        ForLoop.attrsLoop(nodename,(name,value)=>{
            obj[name] = value;
        });
        return obj;
    }

}