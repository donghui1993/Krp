export default class Http {
    public static get(url: string, params: any = {}):Promise<any> {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest;
            http.responseType = params.dataType || 'document';
            http.addEventListener('loadend', event => {
                resolve(http.responseXML);
            });
            http.addEventListener('error',error=>{
                reject(error);
            })
            http.open("get", url, true);
            http.send(params.data);
        })
    }
    public static post(url: string, params: any = {}):Promise<any> {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest;
            
            http.responseType = params.dataType || 'json';
            http.addEventListener('loadend', event => {
                resolve(http.response);
            })
            http.addEventListener('error',error=>{
                reject(error);
            })
            http.open("post", url, true);
            http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            let data = Http.Serialization(params);
            http.send(data);
        })
    }
    /**
     * 用来序列化请求参数，post请求发送object时候需要转为
     * @param params 参数列表
     */
    private static Serialization(params:any = {}){
        let arr = [];
        for(let k in params){
            arr.push(  [k,params[k]].join("=")   )
        }
        return arr.join('&')
    }
}