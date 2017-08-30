export default class Console {
    static log(strs,color:string='#090',type:string="LOG"){
        console.log(`%c${type}: ${strs}` ,`color:${color}`);
    }
    static info(strs){
        Console.log(strs,'color:#fff;background-color:#090',"INFO")
    }
    static error(strs){
        Console.log(strs,'color:#fff;background-color:#a00',"ERROR");
    }
}