import RegistComponent from './RegistComponent'
import RegisterEnum from './RegisterEnum'
import BaseRegister from './component/BaseRegister'
import Upload from './extra/net/Upload'
import Http from './extra/net/Http'
import ForLoop from './extra/object/ForLoop'


export default class Krp {
    // this is the version of the Krp
    public static version: string = '1.0';
    // this is for singleton Krp 
    private static krp: Krp;
    // this is the tour.xml the top of  element <krpano> 
    private xml: HTMLElement;
    // this is the init params include upload params
    private params: any;
    // this is the krpano from embedpano({ ... , onready:function( krpano ) {    } })
    private krpano: any;
    // any of regist by this
    private registedComponent: RegistComponent = new RegistComponent();

    private registerEnum:RegisterEnum  = new RegisterEnum();

    private constructor(krpano: any, xmlurl: string, params: any) {
        this.krpano = krpano;
        Http.get(xmlurl).then(data => {
            this.xml = data.querySelector('krpano');
            if (typeof params.init == "function") {
                params.init(this);
            }
            this.params = params;
            window['krpano'] = this;
        })

    }

    public static init(krpano, xmlurl, params) {
        return Krp.krp === undefined ? Krp.krp = new Krp(krpano, xmlurl, params) : Krp.instance()
    }

    public static instance() {
        return Krp.krp;
    }
    /**
     * 初始化后扫描标签内容，并且注册起来
     */
    public scanner(){

        let all = this.registerEnum.getAll();
        let topElement = this.xml;
        ForLoop.each(all,(key,value)=>{
            let nodeList = topElement.querySelectorAll(key);
            let register =this.regist(key);
            
            ForLoop.eloop(nodeList,(el)=>{
                register.init(el);
            });
        })
    }
    /**
     * 注册一个标签的注册器，如果已经存在就直接返回结果
     * @param type 标签类型
     */
    public regist(type: string):BaseRegister {
        // TODO: regist the componentregister by registerName where in RetisterEnum
        let register = this.registerEnum.get(type);
        if (register == null)
            return console.log(`%c can not fint register with ${type} in ResigterEnum `, 'color:red'),null;
        return this.registedComponent.regist(register,type, this);
    }
    /**
     * 获取一个类型的注册器
     * @param type 标签类型
     */
    public getRegister(type: string) {
        // TODO: get type from registed component
        return this.registedComponent.get(type);
    }
    /**
     * 获取文档文本
     */
    public docText() {
        // TODO: return the plant text  from register and already exist in tour.xml
        return this.xml.outerHTML;
    }
    /**
     * 上传保存文档文本内容
     */
    public savePano() {
        // TODO: upload tour.xml with docText
        let upload = this.params.upload;
        let params = Object.assign({
            tour: this.docText()
        }, upload.data || {});
        Upload.send(upload.url, params).then((data)=>{
            if(typeof upload.success == "function"){
                upload.success(data);
            }
        }).catch((error)=>{
            if(typeof upload.error == "function"){
                upload.error(error);
            }
        });
    }
}

