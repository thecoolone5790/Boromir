// /**
//  * Created by merlin.ho on 2017. 3. 7..
//  */
// 후위표기법 알고리즘!!



//더하기
var Plus = (function(){
    function Plus(option){
        this.option = option;
    }
    Plus.prototype.cal = function(a , b){
        var arg1 = parseFloat(a),
            arg2 = parseFloat(b),
            result = 0;

        if( !isNaN(arg1) && !isNaN(arg2) ){
            result = arg2 + arg1;
            return result;
        }else{
            return console.log("잘못된 수를 입력하셨습니다");
        }
    };

    Plus.prototype.name = 'Plus' || option.name;
    Plus.prototype.symbol = '+' || option.symbol;
    Plus.prototype.priority = 1 || option.priority;

    return Plus;
})();

//빼기
var Minus = (function(){
    function Minus(option){
        this.option = option;
    }
    Minus.prototype.cal = function(a , b){
        var arg1 = parseFloat(a),
            arg2 = parseFloat(b),
            result = 0;

        if( !isNaN(arg1) && !isNaN(arg2) ){
            result = arg2 - arg1;
            return result;
        }else{
            return console.log("잘못된 수를 입력하셨습니다");
        }
    };

    Minus.prototype.name = 'Minus' || option.name;
    Minus.prototype.symbol = '-' || option.symbol;
    Minus.prototype.priority = 1 || option.priority;

    return Minus;
})();



//계산기
var Cal = (function(){

    function Cal(screen , numBtns , resultBtn){
        this.skills = [];
        this.stack = [];
        this.output = [];
        this.num = '';

        this.screen = screen;
        this.isResult = false;

        this.addEvent(numBtns,resultBtn);
    }
    Cal.prototype.addSkill = function(obj){
        this.skills.push(obj);
        this.addCalEvent(obj);

    };
    Cal.prototype.print = function(result){
        if(this.isResult){
            this.screen.innerText = result;
            //this.isResult = false;

        }else{
            this.screen.innerText += result;
        }
    };

    Cal.prototype.addEvent = function(numBtns,resultBtn){
        var that = this;
        // 번호 누르면 바로 output에 쌓임..
        [].forEach.call(numBtns,function(val,idx,arr){
            val.addEventListener('click',function(){
                if(this.isResult){
                    that.print(val.innerText);
                    this.isResult = false;
                }
                else{
                    that.print(val.innerText);
                }
                that.num += val.innerText;
                //that.output.push(val.innerText);

            });
        });

        this.equal(resultBtn)
    };
    Cal.prototype.addCalEvent = function(obj){
        var that = this;
        //연산..
        document.getElementById(obj.name).addEventListener('click',function(){
            that.isResult = false;
            that.print(obj.symbol);

            if(that.num !== ''){
                that.output.push(that.num);
                that.num = '';
            }


            if( that.stack.length !== 0 && (that.stack[that.stack.length-1].priority >= obj.priority)){
                that.output.push(that.stack.pop());
                that.stack.push(obj);
            }else if(that.stack.length === 0){
                that.stack.push(obj);
            }
            else{
                that.output.push(obj);
            }

        });
    };

    Cal.prototype.equal = function(resultBtn){
        var that = this;
        resultBtn.addEventListener('click',function(){

            if(that.num !== ''){
                that.output.push(that.num);
                that.num = '';
            }


            that.output.push(that.stack.pop());

            var length = that.output.length;

            for ( var i = 0; i < length; i++){
                // 숫자면.
                if( typeof that.output[i] === 'string' ){
                    that.stack.push(that.output[i]);
                }
                else if( typeof that.output[i].cal === 'function' && typeof that.output[i] === 'object' ){
                    // cal이라는 함수를 지닌 오브젝트라면..
                   var result = that.output[i].cal(that.stack.pop(),that.stack.pop());
                   that.stack.push(result);


                }
            }
            that.isResult = true;
            that.print(result);
            that.output = [];
            that.output.push(result.toString());
            that.stack = [];
            i = 0;
            console.log('output :' + that.output.toString());
            console.log('stack :' + that.stack.toString());
        });
    };

    return Cal;
})();






// 사용자...

var screen = document.getElementById('screen');
var numBtns = document.getElementById('btnsNum').getElementsByTagName('button');
var resultBtn = document.getElementById('result');


var plus = new Plus();
var minus = new Minus();

//결과....
var cal = new Cal(screen , numBtns , resultBtn );
cal.addSkill(plus);
cal.addSkill(minus);
