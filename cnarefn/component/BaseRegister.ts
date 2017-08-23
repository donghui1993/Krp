import Uuid from '../extra/string/Uuid'
import BaseComponent from './BaseComponent'

export default abstract class BaseRegister {

    krpano: any;

    abstract type: string;

    protected constructor(krpano: any) {
        this.krpano = krpano;
    }

    abstract update(key: string, value: any,component:BaseComponent)

    protected set(key: string, value: any) {
        this.krpano.set(key, value);
    }

    protected get(key: string) {
        return this.krpano.get(key);
    }

    protected call(action: string) {
        this.krpano.call(action)
    }

    public create(fullType:string){
        this.call(fullType)
    }
    
    protected spheretoscreen(horizontal: number | string, vertical: number | string) {
        return this.krpano.spheretoscreen(horizontal, vertical)
    }

    protected screentosphere(x: number | string, y: number | string) {
        return this.krpano.screentosphere(x, y);
    }

    public getLookat(v:string="vlookat",h:string="hlookat") {
        return {
            [v]: this.get('view.vlookat'),
            [h]: this.get('view.hlookat')
        };
    }
    getName(){
        return Uuid.generate(8);
    }
}