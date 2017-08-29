import BaseElementComponent from './BaseElementComponent'

export default class ComponentContainer {
    name: Set<string> = new Set();

    value: BaseElementComponent
    constructor(name: string, value: BaseElementComponent) {
        this.name.add(name);
        this.value = value;
    }

    contains(name: string) {
        return this.name.has(name);
    }

    addMore(name: string) {
        this.name.add(name);
    }

    get(val: string) {
        let obj = {}
        this.name.forEach(prop => {
            obj[prop] = val;
        })
    }
}