import RegistComponent from './RegistComponent'
import RegisterEnum from './RegisterEnum'
import BaseRegister from './component/BaseRegister'
import Upload from './extra/net/Upload'
import Http from './extra/net/Http'

export default class Krp {

    public static version: string = '1.0';

    private static krp: Krp;

    private xml: HTMLElement;

    private params: any;

    private krpano: any;

    private registedComponent: RegistComponent = new RegistComponent();

    private constructor(krpano: any, xmlurl: string, params: any) {
        this.krpano = krpano;
        Http.get(xmlurl).then(data => {
            this.xml = data.querySelector('krpano');
        })
        this.params = params;
        if (typeof params.init == "function") {
            params.init(this);
        }
        window['krpano'] = this;
    }

    public static init(krpano, xmlurl, params) {
        return Krp.krp === undefined ? Krp.krp = new Krp(krpano, xmlurl, params) : Krp.instance()
    }

    public static instance() {
        return Krp.krp;
    }
    public regist(type: string):BaseRegister {
        // TODO: regist the componentregister by registerName where in RetisterEnum
        let register = RegisterEnum[type];
        if (register == null)
            return console.log(`%c can not fint register with ${type} in ResigterEnum `, 'color:red'),null;
        return this.registedComponent.regist(register, this);
    }
    public get(type: string) {
        // TODO: get type from 
        this.registedComponent.get(type);
    }
    public docText() {
        // TODO: return the plant text  from register and already exist in tour.xml
        return this.xml.outerHTML;
    }
    public savePano() {
        // TODO: upload tour.xml with 
        let upload = this.params.upload;
        let params = Object.assign({
            tour: this.docText()
        }, upload.data || {});
        Upload.send(this.params.url, params);
    }
}

