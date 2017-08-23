import BaseRegister from './component/BaseRegister'

export default class RegistComponent {

    private register: Map<string, BaseRegister> = new Map<string, BaseRegister>();

    public regist(register, krpano) {
        // TODO:
        let type = register.type
        if (this.register.has(type)) {
            return console.log(`%c ${type} had been registed`, 'color:#220022'),
                this.register.get(type)
        } else {
            return this.register.set(type, new register(krpano)).get(type);
        }
    }

    public get(type: string) {
        // TODO:
        return this.register.get(type);
    }

    public out(xml: Element): string {
        // TODO:
        this.register.forEach((register, key) => {
            register.component.forEach((component, name) => {

                let dom = xml.querySelector(`[name=${name}]`)
                
                if(dom != null){
                    xml.removeChild(dom)
                }

                xml.appendChild(component.getDom());
            })
        })
        return "";
    }
}