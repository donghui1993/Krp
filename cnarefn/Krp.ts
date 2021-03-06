import RegistComponent from './RegistComponent'
import RegisterEnum from './RegisterEnum'
import BaseRegister from './component/BaseRegister'
import Upload from './extra/net/Upload'
import Http from './extra/net/Http'
import ForLoop from './extra/object/ForLoop'
import Console from './extra/system/Console'

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
    // all register must be mapping in this
    private registerEnum: RegisterEnum = new RegisterEnum();

    private scan = false;

    private constructor(krpano: any, xmlurl: string, params: any) {
        this.krpano = krpano;
        Http.get(xmlurl).then(data => {
            this.xml = data.querySelector('krpano');
            setTimeout(() => {
                this.scanner();
                if (typeof params.init == "function") {
                    params.init(this);
                }
            }, 1000 * 1)
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
    public scanner(): boolean {
        if (this.scan) return true;
        let all = this.registerEnum.getAll();
        let topElement = this.xml;
        ForLoop.each(all, (key, value) => {
            let nodeList = topElement.querySelectorAll(key);
            let register = this.regist(key);

            ForLoop.eloop(nodeList, (el) => {
                register.init(el);
            });
        });
        Console.log('scanner end...')
        return this.scan = true;
    }
    /**
     * 注册一个标签的注册器，如果已经存在就直接返回结果
     * @param type 标签类型
     */
    public regist(type: string): BaseRegister {
        let register = this.registerEnum.get(type);
        if (register == null)
            return Console.error(`can not fint register with ${type} in ResigterEnum `), null;
        return this.registedComponent.regist(register, type, this);
    }
    /**
     * 回调解析js内容
     * @param jsCall 回调js内容 使用 $index 匹配参数列表内容，index从0开始
     * @param others 参数列表
     */
    public callParse(jsCall,...others){
        if(others){
            others.forEach((str ,index)=> {
                jsCall  = jsCall.replace('$'+index,`"${str}"`);
            });
        }
        eval(`${jsCall}`);
    }
    /**
     * 回调解析krpano中的内容
     * @param jsCall 回调krpano的内容，使用 $index 匹配参数列表内容，index从0开始
     * @param others 参数列表
     */
    public krpParse(jsCall,...others){
        if(others){
            others.forEach((str ,index)=> {
                jsCall  = jsCall.replace('$'+index,`"${str}"`);
            });
        }
        eval(`window.krpano.${jsCall}`);
    }
    /**
     * 获取一个类型的注册器
     * @param type 标签类型
     */
    public getRegister(type: string) {
        return this.registedComponent.get(type);
    }
    /**
     * 获取文档文本
     */
    public docText() {

        // 由于所属成员是XMLDocument对象，所以清除outerHTML中的xmlns内容
        return this.xml.outerHTML.replace(new RegExp('xmlns="http://www.w3.org/1999/xhtml" ', 'g'), '');
    }
    /**
     * 上传保存文档文本内容
     */
    public savePano() {
        let upload = this.params.upload;
        let params = Object.assign({
            tour: this.docText()
        }, upload.data || {});
        Upload.send(upload.url, params).then((data) => {
            if (typeof upload.success == "function") {
                upload.success(data);
            }
        }).catch((error) => {
            if (typeof upload.error == "function") {
                upload.error(error);
            }
        });
    }
}

