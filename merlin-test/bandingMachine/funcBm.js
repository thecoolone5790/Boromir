/**
 * Created by merlin.ho on 2017. 3. 20..
 */

/*var machine = (function(){
    var password = '1234';
    var isOpen = true;
    var getPassword = '';
    var money = 0;
    var changes = 0;
    // var coke = ['콜라',1500,10];
    // var sprite = ['스프라이트',1300,10];
    // var fanta = ['환타',1200,10];
    // var hot6 = ['핫식스',1400,10];
    // var delmonte = ['델몬트',1800,10];
    // var milk = ['우유',1400,10];
    var goodsList = [];

    var machine = function(){

        // 자판기 열기
        function adminEvent(){
            document.getElementById('adminBtn').addEventListener('click',function(){
            });
            document.getElementById('openMachine').addEventListener('click',function(){
                getPassword = prompt('비밀번호를 입력해주세요');
                confirmPass(getPassword);

            });
            document.getElementById('closeMachine').addEventListener('click',function(){
                closeMachine();
            });

        }
        adminEvent();
        // 관리자가 비밀번호 넣는다.
        function confirmPass(pass){

            if( password === pass.toString() ) {
                isOpen = true;
                return console.log('자판기 오픈에 성공하였습니다.');
            }
            return console.log('자판기 오픈에 실패하였습니다.');
        }

        // 자판기가 열린다.
        //confirmPass(1234);

        //음료가 자판기에 원래 있는가 에 대한 return boolean
        function checkPop(popList,name){
            var index = 0;
            if(popList.constructor === Array){
                popList.forEach(function(pop,idx){
                    pop[0] === name ? index = idx : index = 0;
                });
            }
            return index;
        }

        //관리자가 음료를 넣는다.
        function insertGoods(name,price,count) {
            var length = goodsList.length,
                good = [],
                idx = 0;

            if( !isOpen ) return -1;

            if( length != 0 ){
                idx = checkPop(goodsList,name);
                if(!!idx){ // 음료가 존재하면 수량만 늘려준다.

                    goodsList[idx][2] += count;
                    console.log(name+" 가 "+ count +"개 추가 되었습니다.");
                    console.log(name+" 의 총 갯수는 "+ goodsList[idx][2] +"개 입니다.");


                }else{ // 존재하지 않는 음료는 새로 등록한다.
                    good = [name,price,count];
                    goodsList.push(good);
                    console.log(name + " 음료가 " + count + " 개 들어갔습니다.")
                }

            }else if(length == 0){
                good = [name,price,count];
                goodsList.push(good);
                console.log('첫 음료 입니다.' + goodsList[0][0] + "가 "+ goodsList[0][2] +"개 들어갔습니다.")
            }



        }

        insertGoods('콜라',1000,10);
        insertGoods('사이다',1500,6);
        insertGoods('콜라',1000,5);
        insertGoods('콜라',1000,5);
        insertGoods('사이다',1000,5);
        insertGoods('환타',1000,5);
        insertGoods('커피',1000,5);
        insertGoods('탄산수',1000,5);
        insertGoods('보리차',1000,5);

        // 자판기를 닫는 함수.
        function closeMachine(){
            isOpen = false;
            console.log('자판기를 닫았습니다..');
        }
        // 자판기를 닫는다.
        //closeMachine();

        // 재고표시

    };

    return machine;
})();

machine();*/

/*
 * < 순서 >
 *     * 돈을 넣는다.
 *     * 투입 버튼을 누르면 구매 할 수 있는 음료에 불이 들어온다.
 *     * 음료를 누르면...음..
 *     * 반환레버를 누르면 잔돈과 영수증이 로그에 찍혀서 나온다...
 */




(function () {
    "use strict";
    //------------ declare ------------
    var insertMoney = document.getElementById('insert_money');
    var insertBtn = document.getElementById('insert_btn');
    var returnLever = document.getElementById('return_lever');
    var admin = document.getElementById('admin');
    var openBtn = document.getElementById('open_btn');
    var closeBtn = document.getElementById('close_btn');
    var insertGood = document.getElementById('insert_good');
    var goods = document.querySelectorAll('#goods li button');

    var goodsList = [];
    var password = '1234';
    var isOpen = false;

    var money = 0;
    var totalPrice = 0;
    var changes = 0;

    //------------ functions ------------

    function init(){
        openBtn.style.display = 'none';
        closeBtn.style.display = 'none';
        insertGood.style.display = 'none';
    }

    /*
     * 함수명 : getMoney
     * 매개변수 : null
     * 반환값 : void
     * 설명 : 투입 버튼 이벤트 핸들러
     *       돈을 받아 콘솔에 찍어줌..
    */
    function getMoney() {
        money = insertMoney.value;
       // insertMoney.value = money;
        console.log('투입금액 : ', money);
    }
    /*
     * 함수명 : getChanges
     * 매개변수 : null
     * 반환값 : changes 잔돈
     * 설명 : 반환레버 눌렀을때 이벤트 헨들러...
     *       totalPrice ( 총 계산된 값 )
     */
    function getChanges() {
        var changes = money;
        if (money >= totalPrice) {
            changes = money - totalPrice;
            console.log('잔돈은 : ', changes);
        } else {
            //money = changes;
            console.log('금액이 부족합니다.');
        }
        return changes;
    }

    /*
     * 함수명 : displayGoods
     * 매개변수 : [option]idx (보여줄 상품..option)
     * 반환값 : void
     * 설명 : 상품보여주는.. 상품을 입고 시킨뒤에 호출..
     */
    function displayGoods(idx) {

        var printGoods = function(i){
            goods[i].innerText = goodsList[i][0] + '\n' + goodsList[i][1] + '\n' + goodsList[i][2] + '개';
        };
        if(idx){
            printGoods(idx);
        } else{
            for (var i = 0; i < goodsList.length; i++) {
                printGoods(i);
            }
        }
    }

    /*
     * 함수명 : classifyCash
     * 매개변수 : changes(잔돈)
     * 반환값 : void
     * 설명 : 영수증 호출.
     */

    function classifyCash(changes) {
        var cashTypeList = [50000, 10000, 5000, 1000, 500, 100, 50, 10];

        var result = changes;
        console.log('------------영수증------------');
        console.log('총 잔돈 : ' + result);
        for (var i = 0; i < cashTypeList.length; i++) {
            var cashType = cashTypeList[i];
            if (result >= cashType) {
                var firstCashNumber = parseInt(String(cashType)[0]);
                var howMany = Math.floor(parseInt(String(result)[0]) / firstCashNumber);
                result = result - (cashType * howMany);
                console.log('잔돈 , ' + cashType + '원 : ' + howMany + '장');
            }
        }
        console.log('------------영수증------------');
    }


    /*
     * 함수명 : openMachine
     * 매개변수 : pass(비밀번호)
     * 반환값 : void
     * 설명 : password를 받아서 자판기 오픈여부 파악
     */
    function openMachine(pass) {
        if (password === pass.toString()) {
            isOpen = true;
            return console.log('자판기 오픈에 성공하였습니다.');
        }
        return console.log('자판기 오픈에 실패하였습니다.');
    }

    /*
     * 함수명 : closeMachine
     * 매개변수 : null
     * 반환값 : void
     * 설명 : password를 받아서 자판기 오픈여부 파악
     */
    function closeMachine() {
        isOpen = false;
        console.log('자판기를 닫았습니다..');
    }

    /*
     * 함수명 : getPrice
     * 매개변수 : idx(내가 고른 상품의 인덱스)
     * 반환값 : void
     * 설명 : 해당 상품의 가격을 가져옴...
     */
    function getPrice(idx) {
        var prdPrice = goodsList[idx][1];
        if(prdPrice>money){
            console.log('금액이 부족합니다.')
        } else{
            totalPrice = totalPrice + prdPrice;
        }
    }

    /*
     * 함수명 : possiblePrd
     * 매개변수 : [option]idx (상품의 인덱스)
     * 반환값 : void
     * 설명 : 상품을 고를수 있는지 여부.
     */
    function possiblePrd(idx){
        var prdPrice = 0;
        var uiBtn = function(i){
            prdPrice = goodsList[i][1];
            ((money >= prdPrice)&& (goodsList[i][2] > 0))? goods[i].classList.add('on') : goods[i].classList.remove('on');
        };

        if(idx){
            uiBtn(idx);
        } else{
            for (var i = 0; i <goodsList.length; i++){
                uiBtn(i);
            }
        }

    }



    /*
     * 함수명 : checkPop
     * 매개변수 : popList(내가 고른 상품의 인덱스) ,name()
     * 반환값 : index ( 원래 있었던 음료의 인덱스 없다면 0 )
     * 설명 : 음료가 있었는지 파악 . 있었다면 해당 인덱스 반환. 없다면 '0' 반환..
     */
    //
    function checkPop(popList,name){
        var index = 0;
        if(popList.constructor === Array){
            popList.forEach(function(pop,idx){
                pop[0] === name ? index = idx : index = null;
            });
        }

        return index;
    }

    /*
     * 함수명 : insertGoods
     * 매개변수 : name(상품이름) ,price(가격) , count(갯수)
     * 반환값 : index ( 원래 있었던 음료의 인덱스 없다면 0 )
     * 설명 : 관리자가 음료수를 넣는다.
     */
    //
    function insertGoods(name,price,count) {
        var length = goodsList.length,
            good = [],
            idx = 0;

        if( !isOpen ) return -1;

        if( length != 0 ){

            idx = checkPop(goodsList,name);

            if( idx !== null){ // 음료가 존재하면 수량만 늘려준다.
                goodsList[idx][2] += count;
                console.log(name+" 가 "+ count +"개 추가 되었습니다.");
                console.log(name+" 의 총 갯수는 "+ goodsList[idx][2] +"개 입니다.");


            }else{ // 존재하지 않는 음료는 새로 등록한다.
                good = [name,price,count];
                goodsList.push(good);
                console.log(name + " 음료가 " + count + " 개 들어갔습니다.")
            }

        }else if(length == 0){
            good = [name,price,count];
            goodsList.push(good);
            console.log('첫 음료 입니다.' + goodsList[0][0] + "가 "+ goodsList[0][2] +"개 들어갔습니다.")
        }

        console.log(goodsList);

    }
    /*
     * 함수명 : outputGood
     * 매개변수 : idx(내가 고른 상품의 인덱스) , cb( 콜백 )
     * 반환값 : void
     * 설명 : 실제로 음료 수량을 줄이는 부분
     */
    function outputGood(idx,cb){
        goodsList[idx][2] -= 1;
        cb(idx);
    }
    /*
     * 함수명 : getAway
     * 매개변수 : idx(내가 고른 상품의 인덱스)
     * 반환값 : void
     * 설명 : 돈이 충족이 되면 잔돈계산 및 음료 꺼낸다.
     */
    function getAway(idx){
        var prdPrice = goodsList[idx][1];
        if( prdPrice > money){
            console.log('돈 더넣어');
        } else{
            getPrice(idx);
            outputGood(idx,displayGoods);
        }

        possiblePrd(idx);
    }
    /*
     * 함수명 : regiPop
     * 매개변수 : null
     * 반환값 : void
     * 설명 : 음료 버튼 이벤트 및 이벤트 핸들러 등록.
     */
    function regiPop(){
        for (var i = 0; i < goodsList.length; i++) {
            (function (idx) {
                goods[idx].addEventListener('click', function (){

                    if( goodsList[idx][2] > 0 ){
                       getAway(idx);
                       changes = getChanges(money, totalPrice);
                    } else {
                        console.log('수량이 없습니다.');
                    }
                });
            })(i);
        }
    }
    /*
     * 함수명 : reInit
     * 매개변수 : null
     * 반환값 : void
     * 설명 : 반환레버 눌렀을 경우 초기화. ( 음료에 관한건 건들지 않는다. )
     */
    function reInit(){
        //goods[i]
        for (var i = 0; i <goodsList.length; i++){
            goods[i].classList.remove('on');
        }
        insertMoney.value = 0;
        money = 0;
        totalPrice = 0;
        changes = 0;

    }


    //------------ event handler ------------
    insertBtn.addEventListener('click', function () {
        getMoney();
        possiblePrd();
    });

    returnLever.addEventListener('click', function () {
        changes = getChanges(money, totalPrice);
        classifyCash(changes);

        reInit();
    });

    admin.addEventListener('click', function () {
        openBtn.style.display = 'block';
        closeBtn.style.display = 'block';
        insertGood.style.display = 'block';
        admin.style.display = 'none';
    });

    openBtn.addEventListener('click', function () {
        var insertedPassword = prompt('비밀번호를 입력하세요');
        openMachine(insertedPassword);
    });

    closeBtn.addEventListener('click', function () {
        closeMachine();
        openBtn.style.display = 'none';
        closeBtn.style.display = 'none';
        insertGood.style.display = 'none';
        admin.style.display = 'block';
    });

    insertGood.addEventListener('click', function () {
        if (isOpen == true) {
            var insertValue = prompt('상품을 넣어주세요 ex) 상품명,가격,수량');
            var valueList = insertValue.split(',');
            var name = String(valueList[0]);
            var price = parseInt(valueList[1]);
            var count = parseInt(valueList[2]);
            insertGoods(name, price, count);
            displayGoods();
            regiPop();
        }
    });



    //—————— execute ——————
    init();

})();

















