import BaseComponent from './BaseComponent'

export default abstract class  BaseElementComponent extends BaseComponent {
    constructor(type: string,name: string, parent: HTMLElement) {
        super(type);
        this.createDom(parent);
        this.createActor(name);
    }
}