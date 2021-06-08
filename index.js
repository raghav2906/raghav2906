var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    document.getElementById("header").style.top = "0";
                } else {
                    document.getElementById("header").style.top = "-10vh";
                }
                prevScrollpos = currentScrollPos;
}

const color=[
    '#2196f3',
    '#e91e63',
    '#ffeb3b',
    '#74ff1d'
];
function createSqaure(){
    const section = document.querySelector('section');
    const square = document.createElement('span');
    var size = Math.random() * 50;
    square.style.width=20 + size + 'px';
    square.style.height=20 + size + 'px';
    square.style.top=Math.random() * innerHeight + 'px';
    square.style.left = Math.random() * innerWidth + 'px';
    const bg = color[Math.floor(Math.random() * color.length)];
    square.style.background= bg;
    section.appendChild(square);
    setTimeout(()=>{
        square.remove()
    },5000);
}
setInterval(createSqaure,150);

function createCircle(){
    const sect = document.querySelector('footer');
    const circle = document.createElement('span');
    var size = Math.random() *50;
    circle.style.width=20 + size+ 'px';
    circle.style.height=20 + size+ 'px';
    circle.style.top=Math.random() * innerHeight + 'px';
    circle.style.left = Math.random() * innerWidth + 'px';
    const bg = color[Math.floor(Math.random() * color.length)];
    circle.style.background= bg;
    sect.appendChild(circle);
    setTimeout(()=>{
        circle.remove();
    },5000);
}
setInterval(createCircle,250);

document.getElementById("BigImg").addEventListener("click",Remove);
function Remove(){
    document.getElementById("BigImg").style.display='none'
}
function OnClickFun(item){

    document.getElementById("BigImg").style.display='block';
    document.getElementById("BigImgsrc").src=item;
}
document.getElementById("headi").addEventListener("mouseover",mouseOver);
function mouseOver(){
    document.getElementById("focus").style.display="none";
    document.getElementById("focus2").style.display="block";
    document.getElementById("focus3").style.display="block";
}
document.getElementById("headi").addEventListener("mouseout",mouseOut);
function mouseOut(){
    document.getElementById("focus").style.display="block";
    document.getElementById("focus2").style.display="none";
    document.getElementById("focus3").style.display="none";
}

