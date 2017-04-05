/**
 * Created by merlin.ho on 2017. 3. 15..
 */



//욕심쟁이 ..
var BandingMachine = (function(){

    var change = function(money , option, objChange){

        if( option.length == 0 ) return;
        else{
            var result = Math.floor(money / option[0]);
            objChange[option[0].toString()] = result;

            money = money - (result*[option[0]]);
            var newOption = option.slice(1);
            //재귀....
            change(money,newOption,objChange);
        }

    };

    var printConsole = function(change){
        console.dir(change)
    };

    function BandingMachine(option){
        this.option = option || [100,10];
        this.change = {};
    }

    BandingMachine.prototype.getMoney = function(money){
        change(money,this.option,this.change,this.change);
        printConsole(this.change);

    };
    return BandingMachine;
})();




// 결과....사용자가...사용하는 법....
var bm = new BandingMachine([
    10000,1000,100,10
]);

bm.getMoney(24820);