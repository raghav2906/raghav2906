var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-8vh";
  }
  prevScrollpos = currentScrollPos;
}
$(window).on("load", function() {
  $(".preloader").delay(100).fadeOut(500);
});

const nav = document.querySelector('.nav2');
const nav3 = document.querySelector('.nav3');
var cnt=1;

nav.addEventListener('click',() => {
  cnt++;
  if(cnt%2 === 0){
      nav3.classList.remove('nondi');
      nav3.classList.add('di');
      
  }
  else{
    nav3.classList.remove('di');
    nav3.classList.add('nondi');
  }
})