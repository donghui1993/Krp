export default class UUID {
    private static readonly BASE = 'qwertyuioplkjhgfdsazxcvbnm'.split('');
    public static generate(size: number) {
        let uuid = [];
        for (var index = 0; index < size; index++) {
            let i = (Math.random() * (UUID.BASE.length - 1)).toFixed(0);
            let a:string = UUID.BASE[i];
            uuid.push(a);
        }
        return uuid.join('');
    }
}