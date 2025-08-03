// gsap tween to
/*
gsap.to('img.fred', {
  x: 400,
  y: 400,
  scale: 3,
  rotation: 360,
  duration: 3,
});
*/

// gsap tween from

/*
gsap.from('img.fred', {
  x: 400,
  y: 400,
  scale: 1,
  rotation: 0,
  duration: 3,
});
*/

// gsap tween fromTo

/*
gsap.fromTo(
  'img.fred',
  {
    x: 700,
    y: 400,
    opacity: 0,
  },
  {
    x: 400,
    y: 200,
    opacity: 1,
    scale: 3,
    duration: 3,
  }
);
*/

// gsap delay and repeat

/*
gsap.from('img.fred', {
  x: 400,
  repeat: -1, // infinite repeat
  yoyo: true, // reverse the animation on repeat
  duration: 3,
  ease: 'linear',
});
*/

/*
gsap.to('#freds img', {
  y: -100,
  // stagger: 0.1,
  stagger: {
    each: 0.2,
    // amount: 1, // they all will share the 1 second duration
    from: 'end', // center, start, end, edges
  },
});
*/

// Tween control

// const tween = gsap.to('img.fred', {
//   duration: 3,
//   x: 600,
//   ease: 'linear',
//   paused: true,
// });

// document.getElementById('play').addEventListener('click', () => {
//   tween.play();
// });
// document.getElementById('pause').addEventListener('click', () => {
//   tween.pause();
// });
// document.getElementById('reverse').addEventListener('click', () => {
//   tween.reverse();
// });
// document.getElementById('restart').addEventListener('click', () => {
//   tween.restart();
// });

// Transform Origin
const t = gsap.to('.truck', {
  transformOrigin: '65px 160px',
  rotation: -40,
  repeat: 1,
  yoyo: true,
});

demo.addEventListener('click', () => t.restart());

document.querySelector('.truck').onclick = function (e) {
  // e = Mouse click event.
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  console.log(x, y);
};
