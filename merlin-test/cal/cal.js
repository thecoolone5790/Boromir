/**
 * Created by merlin.ho on 2017. 3. 7..
 */

//더하기
var Add = (function(){
    function Add(btn){
        this.btn = btn || null;
    }
    Add.prototype.cal = function(){

    };

    return Add;
})();

//빼기
var Minus = (function(){
    function Minus(btn){
        this.btn = btn || null;
    }
    Minus.prototype.cal = function(a , b){
        var arg1 = parseFloat(a),
            arg2 = parseFloat(b),
            result = 0;

        if( !isNaN(a) && !isNaN(b) ){
            result = a - b;
            return result;
        }else{
            return console.log("잘못된 수를 입력하셨습니다");
        }

    };

    return Minus;
})();

//계산기
var Cal = (function(){
    function Cal(screen , numBtns){
        this.skills = [];
        this.screen = screen;

        this.addEvent(numBtns);
    }
    Cal.prototype.addSkill = function(obj){
        this.skills.push(obj);
    };
    Cal.prototype.print = function(result){
        (this.screen.innerText === '0') ? this.screen.innerText = result : this.screen.innerText += result;
    };
    Cal.prototype.addEvent = function(numBtns){
        var that = this;
        [].forEach.call(numBtns,function(val,idx,arr){
            val.addEventListener('click',function(){
                that.print(val.innerText);
            })
        });

    };

    return Cal;
})();

var screen = document.getElementById('screen');
var numBtns = document.getElementById('btnWrap').getElementsByTagName('button');
//console.log(numBtns[0].innerText);


var add = new Add();
var minus = new Minus();

//결과...
var cal = new Cal(screen , numBtns);
cal.addSkill(add);
cal.addSkill(minus);
