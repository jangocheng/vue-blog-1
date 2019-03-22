function getRgb(r,g,b)
{
  return "rgb("+ r+","+g+","+b+")";
}

function main()
{
  //drop
  let dropList=[];
  let gravity=0.8;
  //
  let linelist=[];
  let canvasEl = document.getElementById('canvas');
  let ctx = canvasEl.getContext('2d');
  let mousePos = [0, 0];
  let backgroundColor = '#fff';
  canvasEl.width=canvasEl.clientWidth;
  canvasEl.height=canvasEl.clientHeight;
  let speedx=0;
  let maxspeedx=0;
  window.onresize=function ()
  {
    canvasEl.width=canvasEl.clientWidth;
    canvasEl.height=canvasEl.clientHeight;
  }
  window.onmousemove=function (e)
  {
    let winWidth=document.body.clientWidth||document.documentElement.clientWidth;
    mousePos[0]=e.clientX;
    mousePos[1]=e.clientY;
    maxspeedx=(e.clientX-winWidth/2)/(winWidth/2);
  }
  // window.onmousedown=function(e)
  function createLine(e)
  {
    let temp= 0.25*( 50+Math.random()*100);
    let myline={
      speed:2*(Math.random()*6+3),
      die:false,
      posx:e,
      posy:-200,
      h:temp,
      color:getRgb(Math.floor(temp*255/75),Math.floor(temp*255/75),Math.floor(temp*255/75))
    };
    linelist.push(myline);
  }
  window.requestAnimationFrame(update);
  function createDrop(x,y)
  {
    let mydrop={
      die:false,
      posx:x,
      posy:y,
      vx:(Math.random()-0.5)*8,
      vy:Math.random()*(-6)-3,
      radius:Math.random()*1.5+1
    };
    return mydrop;
  }

  function madedrops(x,y)
  {
    let maxi=Math.floor(Math.random()*5+5);
    for(let i=0;i<maxi;i++)
    {
      dropList.push(createDrop(x,y));
    }
  }

  function update() {
    if(dropList.length>0)
    {
      dropList.forEach(function (e) {
        e.vx=e.vx+(speedx)/2;
        e.posx=e.posx+e.vx;
        e.vy=e.vy+gravity;
        e.posy=e.posy+e.vy;
        if(e.posy>canvasEl.clientHeight)
        {
          e.die=true;
        }
      });
    }
    for(let i=dropList.length-1;i>=0;i--)
    {
      //delite die
      if(dropList[i].die){
        dropList.splice(i,1);
      }
    }

    speedx=speedx+(maxspeedx-speedx)/50;

    if(Math.random()>0)
    {
      createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
      createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
      //createLine(Math.random()*2*canvasEl.width-(0.5*canvasEl.width));
    }
    let mydeadline=canvasEl.clientHeight- Math.random()*canvasEl.clientHeight/5;
    linelist.forEach(function (e) {
      let dis=Math.sqrt( ((e.posx+speedx*e.h)-mousePos[0])*((e.posx+speedx*e.h)-mousePos[0])+(e.posy+e.h-mousePos[1])*(e.posy+e.h-mousePos[1]));
      if(dis<35)
      {
        madedrops(e.posx+speedx*e.h,e.posy+e.h);
        e.die=true;
      }

      if((e.posy+e.h)>mydeadline)
      {
        if(Math.random()>0.85)
        {
          madedrops(e.posx+speedx*e.h,e.posy+e.h);
          e.die=true;
        }
      }
      if(e.posy>=canvasEl.clientHeight)
      {
        e.die=true;
      }else{
        e.posy=e.posy+e.speed;
        e.posx=e.posx+(e.speed*speedx);
      }
    });
    for(let i=linelist.length-1;i>=0;i--)
    {
      if(linelist[i].die){
        linelist.splice(i,1);
      }
    }
    render();
    window.requestAnimationFrame(update);
  }
  function  render() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    linelist.forEach(
      function (line) {

        ctx.strokeStyle =line.color;
        ctx.lineWidth=0.4;
        ctx.beginPath();
        ctx.moveTo(line.posx,line.posy);
        ctx.lineTo(line.posx+speedx*line.h,line.posy+line.h);
        ctx.stroke();
      });
    ctx.lineWidth=0.2;
    ctx.strokeStyle = "#000";
    dropList.forEach(function (e) {
      ctx.beginPath();
      ctx.arc(e.posx,e.posy,e.radius,Math.random()*Math.PI*2,1*Math.PI);
      ctx.stroke();
    });
  }
}
export default main

