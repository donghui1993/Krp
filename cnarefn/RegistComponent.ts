import BaseRegister from './component/BaseRegister'
import Console from './extra/system/Console'

export default class RegistComponent {

    private register: Map<string, BaseRegister> = new Map<string, BaseRegister>();

    public regist(register, type, Krp) {
        // TODO: regist a component 
        let krpano = Krp.krpano;

        let parent = Krp.xml.querySelector(register.parentActor) || Krp.xml;
        if (this.register.has(type)) {
            return Console.info(`${type} had been registed`),
                this.register.get(type)
        } else {
            return this.register.set(type, new register(krpano, parent)).get(type);
        }
    }

    public get(type: string) {
        // TODO:
        return this.register.get(type);
    }

}