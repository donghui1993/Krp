export namespace   Uuid {
    const BASE = 'qwertyuioplkjhgfdsazxcvbnm'.split('');
    export function generate(size: number) {
        let uuid = [];
        for (var index = 0; index < size; index++) {
            let i = (Math.random() * (BASE.length - 1)).toFixed(0);
            let a:string = BASE[i];
            uuid.push(a);
        }
        return uuid.join('');
    }
}