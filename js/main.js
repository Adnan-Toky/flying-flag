var w=350;
var h=550;
var flagSize=23;
var flagWidth=10*flagSize;
var flagHeight=6*flagSize;
var flagLeft=(w-flagWidth)/2;
var flagTop=50;
var flagRectColor="#006b4f";
var flagCircleColor="#e12728";
var flagCircleRadius=flagWidth/5;
var flagData=[];
var flagAngle=0;
var flagSloping=20;
var windSpeed=200;
var flagStand=document.getElementById("flagStand");
var flagStandWidth=10;
var flagStandHeight=flagHeight*3.4;
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

    flagStand.style.width=flagStandWidth+"px";
    flagStand.style.height=flagStandHeight+"px";
    flagStand.style.top=(flagTop-12)+"px";
    flagStand.style.left=(flagLeft-10)+"px";

    c.height=h;
    c.width=w;

function drawFlag(){
    ctx.beginPath();
    ctx.moveTo(flagLeft,flagTop);
    ctx.lineTo(flagLeft+flagWidth-flagSloping/2,flagTop);
    ctx.lineTo(flagLeft+flagWidth+flagSloping/2,flagTop+flagHeight);
    ctx.lineTo(flagLeft,flagTop+flagHeight);
    ctx.quadraticCurveTo(flagLeft+flagWidth/10,flagTop+flagHeight/2,flagLeft,flagTop);
    ctx.fillStyle=flagRectColor;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(flagLeft+flagWidth/2,flagTop+flagHeight/2,flagCircleRadius,50,0,Math.PI*2);
    ctx.fillStyle=flagCircleColor;
    ctx.fill();
    ctx.closePath();
}

function getFlagData(){
    for(n=0;n<flagWidth+flagSloping/2;++n){
        flagData[n]=ctx.getImageData(flagLeft+n,flagTop,1,flagHeight);
    }
    ctx.clearRect(0,0,w,h);
}

function putFlagData(x){
    for(n=0;n<flagWidth+flagSloping/2;++n){
        ctx.putImageData(flagData[n],flagLeft+n,flagTop+Math.cos(x+n*Math.PI/180*2)*15*Math.sin((n/flagWidth*90)*Math.PI/180));
    }
}

drawFlag();
getFlagData();

var intv=setInterval(function(){
    ctx.clearRect(0,0,w,h);
    putFlagData(flagAngle);
    flagAngle++;
},windSpeed)
