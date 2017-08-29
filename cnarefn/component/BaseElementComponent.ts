import BaseComponent from './BaseComponent'

export default abstract class BaseElementComponent extends BaseComponent {
    constructor(type: string, name: string, parent: HTMLElement, el?: HTMLElement) {
        super(type);
        if (!el) {
            this.createDom(parent);
        } else {
            this.dom = el;
        }
        this.createActor(name);
    }
}