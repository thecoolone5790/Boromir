/**
 * Created by merlin.ho on 2017. 3. 20..
 */

// 1. 손님 ( customer )
//
var Customer = (function(){
    //private


    function Customer(){

    }

    return Customer;
})();
// 2. 자판기 ( machine )
//
var Machine = (function(){
    //private
    var password = "1234";
    var advisor = [];

    function Machine(name,pass){
        password = pass;
        this.name = name;
    }


    return Machine;
})();
// 3. 관리자 ( admin )
var Admin = (function(){
    //private
    function AllowAdmin(machine){
        this.machine = machine;
    }
    AllowAdmin.prototype.addDrink = function(){
        console.log( "드링크를 채워넣어요 ~");
    };

    function Admin(){
        this.machineList = [];
        this.machine = null;


    }
    Admin.prototype.regiMachine = function(machine){
        this.machineList.push(machine);


    };
    Admin.prototype.adminMachine = function(obj){
        var that = this;
        this.machineList.forEach(function(item){
            if( that.machine === null){
                if(item.name === obj.name ){
                    return that.machine = obj;
                }
            }
        });

        if( this.machine !== null){
            return new AllowAdmin(that.machine);
        }
        return -1;
    };






    return Admin;
})();











//////////////// 이렇게 움직였음 좋겟다!!!

// 손님을 만든다.
var customer = new Customer();
// 관리자를 만든다. 관리자가 로그인하면 ..관리자가 생성되고...해당 관리자가 관리하는 머신들이..
var admin = new Admin();
// 자판기를 만든다.
var machine1 = new Machine("machine1",1234);

/////////////////////////


// 관리자의 움직임.
admin.regiMachine(machine1);  // 어떤 자판기 관리할지 등록하는 메서드...
var helloAdmin = admin.adminMachine({
    name : "machine1",
    password : "1234"
}); // 자판기 관리자 open... 자판기를 열었다.

helloAdmin.addDrink();

// helloAdmin.regitCost();
// helloAdmin.closeMachine();
// machine1.addDrink({
//     name = "coca",
//     count = 10
// });
// machine1.regitCost({
//     name = "coca",
//     cost = "1000"
// });
// machine1.closeMachine();


// // 손님의 움직임
// var  = customer.approach(machine1);



// scope & function & closer....//
// 자판기를 만들자...
//
//

//public

//    private;


// 고객
// 관리자








