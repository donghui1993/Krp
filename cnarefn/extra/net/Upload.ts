import Http from './HTTP';
export default class Upload {
    /**
     * 使用post进行上传文件操作，返回promise
     */
    public static send(url: string, param: any) {
        return Http.post(url, param)
    }
}