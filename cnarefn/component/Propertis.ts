export default class Properties {
    private props = {}

    constructor(obj: any) {
        if (!this.typeAccept(obj)) {
            return this;
        }

        if (obj instanceof Array) {
            obj = obj.filter(ele => {
                return this.typeAccept(ele);
            });
            this.arraySet(obj);
            return this;
        }

    }

    private typeAccept(obj) {
        if (obj == null) {
            console.log('can not accept null type');
            return false;
        }
        if (typeof obj == 'string') {
            console.log('can not accept string type');
            return false;
        }
        if (typeof obj == "function") {
            console.log('can not accept function type');
            return false;
        }
        if (typeof obj == "boolean") {
            console.log('can not accept boolean type');
            return false;
        }
        return true;
    }

    private arraySet(array) {
        array.forEach((value, index) => {
            Object.keys(value).forEach(key => {
                this.set(key, value[key])
            });
        })
    }

    public set(key, value) {
        this.props[key] = value;
    }

    public get(key) {
        this.props[key];
    }
    public setAll(obj) {
        Object.assign(this.props, obj);
    }
    
    public getAll() {
        return this.props;
    }
}