
var str="";
var olx=0;
var oly=0;
function drawavg(){
for(var i=0;i<document.all.htav.length;i++){
	str+=drawgo(document.all.htav[i]);
}
idiv.innerHTML=str;
}

function drawgo(tt) //主调函数
{
 	var ttop  = tt.offsetTop;     //TT控件的定位点高
 	var thei  = tt.clientHeight;  //TT控件本身的高
 	var tleft = tt.offsetLeft;    //TT控件的定位点宽
	var ah=tt.avgheight;
	var twid=tt.clientWidth;
 	var ttyp  = tt.type;          //TT控件的类型
	while (tt = tt.offsetParent){ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
	var t  = ttop+(thei-ah)-1;
 	var l = tleft+twid/2;
	if(olx==0&&oly==0){
		olx =l;
		oly =t;	
	}
	var s = drawLine(olx,oly,l,t,"darkred");
	olx =l;
	oly =t;
	return s;

}



function drawLine(x0,y0,x1,y1,color){
	x0 = Math.round(x0);
	x1 = Math.round(x1);
	y0 = Math.round(y0);
	y1 = Math.round(y1);
	var rs = "";
	var iHeight=3;
	var iWidth=3;
	if (y0 == y1){  //&raquo;&shy;&ordm;á&Iuml;&szlig;
		if (x0>x1){var t=x0;x0=x1;x1=t}  
		rs = "<img border=0 class=emuH style='top:"+y0+";left:"+x0+";background-color:"+color+"; height:"+iHeight+";width:"+Math.abs(x1-x0)+"'/>";
	}
	else if (x0 == x1){  //&raquo;&shy;&Ecirc;ú&Iuml;&szlig;
		if (y0>y1){var t=y0;y0=y1;y1=t} 
		rs = "<img border=0 class=emuW style='top:"+y0+";left:"+x0+";background-color:"+color+";widht:"+iWidth+";height:"+Math.abs(y1-y0)+"'/>";
	}
	else{
		var lx = x1-x0;
		var ly = y1-y0;
		if (Math.abs(lx)>Math.abs(ly)){
			if (ly<0){
				var t=x0;x0=x1;x1=t;
				t=y0;y0=y1;y1=t;
				lx = -lx;
				ly = -ly;
			}
			var dx = lx/ly;
			rs = new Array(ly);
			for (var i=0;i<ly;i++){
				var left,width;
				if (dx>0){
					left = Math.round(i*dx);
					width = Math.round((i+1)*dx)-left;
					left += x0;
					if (width+left>x1) width = x1-left;
				}else{
					left = Math.round((i+1)*dx);
					width = Math.round((i)*dx)-left;
					left += x0;
					if (left<x1) {
						width = width+left-x1;
						left=x1;
					}
				}
				rs[i] = "<img border=0 class=emuH style='top:"+(y0+i)+";left:"+left+";width:"+width+";height:"+iHeight+";background-color:"+color+"'/>";
			}
		}else{
			if (lx<0){
				var t=x0;x0=x1;x1=t;
				t=y0;y0=y1;y1=t;
				lx = -lx;
				ly = -ly;
			}
			var dy = ly/lx;
			rs = new Array(lx);
			for (var i=0;i<lx;i++){
				var top,height;
				if (dy>0){
					top = Math.round(i*dy);
					height = Math.round((i+1)*dy)-top;
					top += y0;
					if (height+top>y1) height = y1-top;
				}else{
					top = Math.round((i+1)*dy);
					height = Math.round((i)*dy)-top;
					top += y0;
					if (top<y1) {
						height = height+top-y1;
						top=y1;
					}
				}
				rs[i] = "<img border=0 class=emuW style='top:"+top+";left:"+(x0+i)+";height:"+height+";width:"+iWidth+";background-color:"+color+"'/>";
			}
		}
		rs = rs.join("");
	}
	return rs
}

