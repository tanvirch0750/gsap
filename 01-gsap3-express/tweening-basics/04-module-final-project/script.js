// let tl = gsap.timeline();

// tl.from('#demo', { opacity: 0 })
//   .from('h1', { x: 80, opacity: 0 })
//   .from('h2', { x: -80, opacity: 0 })
//   .from('p', { y: 30, opacity: 0 })
//   .from('button', { y: 30, opacity: 0, ease: 'bounce.out' })
//   .from('#items > g', {
//     scale: 0,
//     stagger: 0.2,
//     opacity: 0,
//     transformOrigin: '50% 50%',
//   });

let tl = gsap.timeline({ defaults: { opacity: 0, ease: 'back' } });

// add visibility hidden to demo element in css, then autoAlpha to 0 in the the gsap demo, so that now all the elemeation will happen after the page load
// this is a good practice to avoid flickering of elements before the animation starts
function init() {
  tl.from('#demo', { ease: 'linear', autoAlpha: 0 })
    .from('h1', { x: 80, duration: 1 })
    .from('h2', { x: -80, duration: 1 }, '<')
    .from('p', { y: 30 }, '-=0.2')
    .from('button', { y: 50 }, '-=0.4')
    .from(
      '#items > g',
      {
        scale: 0,
        stagger: 0.2,
        transformOrigin: '50% 50%',
      },
      '-=0.2'
    );
}

window.addEventListener('load', () => {
  init();
  GSDevTools.create();
});
