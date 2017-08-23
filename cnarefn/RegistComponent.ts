import BaseRegister from './component/BaseRegister'

export default class RegistComponent {

    private register: Map<string, any> = new Map<string, any>();

    public regist(register,krpano) {
        // TODO:
        let type = register.type
        if (this.register.has(type)) {
            return console.log(`%c ${type} had been registed`, 'color:yellow'),
                this.register.get(type)
        }else{
           return  this.register.set(type,new register(krpano)).get(type);
        }
    }

    public get(type: string) {
        // TODO:
        return this.register.get(type);
    }

    public out(xml: Element) {
        // TODO:


    }
}