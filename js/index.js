var eleStart;
var eleEnd;
var eleGe;

var isStart = false;
var bgColor = "#3f1"; // 格子原背景颜色


window.onload = function(){
	 eleStart = document.querySelector('#start001');
	 eleEnd = document.querySelector('#end001');
	 eleGe = document.querySelectorAll('.ge');

	// 添加点击事件
	eleStart.addEventListener('click',
		function (event){
			
			// 已经开始后不能再按了，保持唯一，避免越按越快
			if(isStart){
				return;
			}
			isStart = true;
			/* while(isStart){
				getColor();
				
			} */
			
			//timer = setInterval(getRnColor,1000/30);
			getRnColors();

		}
	);
	
	// 添加点击事件
	eleEnd.addEventListener('click',
		function (event){
			
			isStart = false;
			console.log(isStart);
			
			// 为保证最后全变为背景色，先休眠 700 毫秒后再执行
			setTimeout(getBgColos,700);
			
		}
	);
};

var numList = [1,2,3];

// 将上一次的颜色变成背景色
function getBgColos(){
	for(var i=0;i<numList.length;i++){

		eleGe[numList[i]-1].style.background = bgColor;
		eleGe[numList[i]-1].style.borderColor = bgColor;
	}
}


/*
	3 个随机颜色
	bug：当随机数为相同时，只会显示排在后面的颜色
*/
function getRnColors(){
	
	getBgColos();

	numList[0] = rn(9,1);
	numList[1] = rn(9,1);
	numList[2] = rn(9,1);
	
	for(var i=0;i<numList.length;i++){

		var strColor = rnColor();
		
		// 更改 css 的 background 属性
		eleGe[numList[i]-1].style.background = strColor;
		eleGe[numList[i]-1].style.borderColor = strColor;
		
		console.log(strColor);
	}
	if(!isStart){
		return;
	}
	
	// 每次执行完后，等待 500 毫秒后再执行
	setTimeout(getRnColors,500);

}

/*
	单个颜色变化
*/
function getRnColor(){
	var num = rn(9,1);
				
	var strColor = rnColor();
	
	// 更改 css 的 background 属性
	eleGe[num-1].style.background = strColor;
	eleGe[num-1].style.borderColor = strColor;
	
	console.log(strColor);
	if(!isStart){
		return;
	}
	/**
	requestAnimationFrame H5帧动画
		
		1. 无法设置时间间隔 根据钟摆频率来 13-16 毫秒
		2. 递归使用
		3. 兼容性差
	
	**/
	// requestAnimationFrame(getRnColor);
	
	// 每次执行完后，等待 500 毫秒后再执行
	setTimeout(getRnColor,500);
}

// 产生随机颜色 ,rgb格式为：#000
function rnColor(){
	var r = rn(16,0);
	var g = rn(16,0);
	var b = rn(16,0);
	var num16 = ['0','a','b','c','d','e','f'];
	var rgb = "";
	
	if(r >= 10){
		r = num16[16%r];
	}
		
	if(g >= 10){
		g = num16[16%g];
	}	
	if(b >= 10){
		b = num16[16%b];
	}
	
	rgb = "#" + r + g + b;
	return rgb;
}

// 产生在 min<=x<=max 的随机数
function rn(max,min){
	
	c = max-min+1;
	
	//0~1的随机数 Math.random()
	return Math.floor(Math.random()*c+min);
	
}