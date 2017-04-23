/*
            crit   haste   mastery   ver
chest        699    1081 
shouder  			438		896
leg		  	738				1043
hand 				925				410
head		1195 					585
back 						372		629
*/ 
//封装document.write
var docW = function(text) {return document.write(text+'<br>')};
/*var box = /8([^8]*)8/g;    //（）分组获取模式
var str =  '8google8 8google8 8google8';
box.test(str);
docW(RegExp.$1);
docW('\n');			//$1表示分组获取的字符串的第一串
docW(str.replace(box,'<strong>$1</strong>'));

*/
//构造函数
/*function Box(){};
Box.prototype.user='Lee';
Box.prototype.age=100;
Box.prototype.run =function(){
	return this.user + this.age+'Loading'
};
var box1 = new Box();
docW(box1.constructor);
docW(box1.run());*/
//将原型封装到构造函数中
/*function Box(name,age){
	this.name = name;
	this.age = age;
	this.family = ['哥哥','姐姐','妹妹']
	//原型初始化设定为1次
	if(typeof this.run != 'function'){
		Box.prototype.run = function(){
			return this.name+this.age+this.family+'运行中'
		};
	};
}*/


//6种继承模式综合代码代码
//组合继承模式 由简单原型继承和寄生继承组合而成 最为常用

/*function Super (name,age){		//在构造函数中定义私有属性
	this.name = name;
	this.age = age;
	this.arr =['mage','rogue','warrior']
};
Super.prototype.sayName = function() {						//在构造函数的原型中定义方法
	docW(this.name);
};
function Sub(name,age){					//函数寄生
	Super.call(this,name,age);
};
Sub.prototype = new Super();
//Sub.prototype.constructor = Sub;			//恢复由于重写构造函数导致的原型链断裂
Sub.prototype.sayAge = function(){
	docW(this.age)
};

var raid1 = new Sub('mage',905);
raid1.arr.pop();
docW(raid1.arr);
docW(raid1.name + raid1.age);
docW(Sub.prototype.isPrototypeOf(raid1));
*/

//匿名函数与闭包
/*function Box(){
	var age = 100;
	function run(){
		return 'running';
	}
	this.pubulicRun = function(){		//公有特权方法
		return age+run();
	};
	this.getAge = function(){
		return age;
	}
}
var box = new Box();
docW(box.getAge());
docW(box.pubulicRun());
alert(box.run());			//不能直接调用构造函数的私有方法*/
/*var conf = document.getElementById('sel');
conf.onclick = function(){
	docW(confirm('请点击')?'按了确定':'按了取消')
};
*/
/*var testdiv = document.createElement('div');
testdiv.setAttribute('id','test1');
testdiv.innerHTML = '请点击';
document.body.append(testdiv);
testdiv.onclick = function(){
	testdiv.innerHTML=confirm('请选择')?'选择确定':'选择取消'
};*/
var datediv = document.createElement('div');
datediv.setAttribute('id','date');
document.body.append(datediv);

var keyStart = document.createElement('button');
//keyStart.setAttribute('id','start');
keyStart.id = "start";
keyStart.type = "button";
keyStart.className = "button blue"
keyStart.value = "开始"
keyStart.innerHTML = '开始';
var KeyToDate = null;
var arr =[];				//储存动画队列的队列数组
keyStart.onclick = function(){
	if(arr[0]) return false;				//解决：加入动画队列检测，当动画队列中有动画时，不加入队列
	if(typeof keyToDate!= "function"){		//产生问题：由于JS单线程，当队列中有其他对象产生的动画时，不能正常加入队列
	keyToDate = setInterval(function(){		//引申：1.自动更新的页面是否使用setInterval无限加载window.onload事件
	var date = new Date();					//		2.单线程是否影响这种刷新页面，如何解决？
	datediv.innerHTML = date.toLocaleDateString()+"   "+date.toLocaleTimeString();
},100);
	};	arr.push(keyToDate);
	//query.innerHTML = arr;
};
document.body.append(keyStart);
var keyDate = document.createElement('button');
keyDate.setAttribute('id','end');
keyDate.type = "button";
keyDate.className = "button blue"
keyDate.value = "暂停";
keyDate.innerHTML = '暂停';
keyDate.onclick = function(){
	clearin();								//清除动画队列
	keyStart.value = "恢复";
	keyStart.innerHTML = "恢复";
};
var clearin = function(){
	for(var i = arr.length;i>0;i--){			//清空长度不定的队列arr
		clearInterval(arr[0]);
		arr.shift();
		keyToDate = null;
		//alert(arr+" "+i);
	};
}
document.body.append(keyDate);
docW(new Date());
var box = document.querySelector("#query");
box.style.background= "pink"; 
//键盘事件兼容
function getCharCode(evt){
	var e = evt||window.event;
	if(typeof e.charCode == 'number'){
		return e.charCode;
	}else {
		return e.keyCode;
	}
};
document.onkeypress = function(evt){
	box.innerHTML = String.fromCharCode(getCharCode(evt))+" "+getCharCode(evt);
}
/*canvas时钟*/
var clk = document.getElementById("clock");
var ctx = clk.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
function drawBackground(){
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.lineWidth = 0.1*r;
	ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);
	ctx.stroke();
	var hours = [3,4,5,6,7,8,9,10,11,12,1,2];
	hours.forEach(function(number,i){
		var rad = 2*Math.PI/12*i;
		var x = Math.cos(rad)*(r*0.7);
		var y = Math.sin(rad)*(r*0.7);
		ctx.textAlign = "center";
		ctx.font = 18*r/100+"px Arial";
		ctx.textBaseline = "middle";
		ctx.fillText(number,x,y);
	});
	for(i=0;i<60;i++){
		var rad = 2*Math.PI/60*i;
		var x = Math.cos(rad)*(r*0.82);
		var y = Math.sin(rad)*(r*0.82);
		ctx.beginPath();
		ctx.arc(x,y,2,2*Math.PI,false);
		ctx.fillStyle = (i % 5)?"#ccc":"#000";
		ctx.fill();
	};
};
function drawHour(hour,minute,second){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/12*(hour+minute/60+second/3600);
	ctx.rotate(rad);
	ctx.lineWidth = 6;
	ctx.lineCap = 'round';
	ctx.moveTo(0,r*0.1);
	ctx.lineTo(0,-r/2.5);
	ctx.stroke();	
	ctx.restore();
};
function drawMinute(minute,second){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*(minute+second/60);
	ctx.rotate(rad);
	ctx.lineWidth = 3;
	ctx.moveTo(0,r/10);
	ctx.lineTo(0,-r/1.5);
	ctx.stroke();	
	ctx.restore();
};
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle= "#f00"
	var rad = 2*Math.PI/60*second;
	ctx.rotate(rad);
	ctx.moveTo(-2*r/100,20*r/100);
	ctx.lineTo(2*r/100,20*r/100);
	ctx.lineTo(1,-r/1.3);
	ctx.lineTo(-1,-r/1.3);
	ctx.fill();
	ctx.restore();
};
function drawDot(){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#FFF";
	ctx.arc(0,0,3*r/100,2*Math.PI,false);
	ctx.fill();
	ctx.restore();
};
var draw = function(){
	ctx.clearRect(0,0,width,height);
	var dateTimer = new Date();
	var hour = dateTimer.getHours();
	var minute = dateTimer.getMinutes();
	var second = dateTimer.getSeconds();
	drawBackground();
	drawHour(hour,minute,second);
	drawMinute(minute,second);
	drawSecond(second);
	drawDot();
	ctx.restore();
};
draw();
var clock = setInterval(draw,100);
docW(navigator.userAgent);