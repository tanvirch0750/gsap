const hole = document.querySelector('.hole');
const herman = document.querySelector('.herman');
const shadow = document.querySelector('.shadow');

const tl = gsap
  .timeline()
  .from(hole, { scale: 0, repeat: 1, yoyo: true })
  .fromTo(herman, { y: 110, scaleY: 2 }, { y: -175, scaleY: 1 }, 0.2)
  .to(herman, { y: -4, ease: 'power1.in' }, '>')
  .to(herman, {
    scaleY: 0.8,
    transformOrigin: '50% 100%',
    scaleX: 1.3,
    repeat: 1,
    yoyo: true,
    duration: 0.2,
  })
  .to(shadow, { opacity: 1, duration: 0.2 }, 0.7)
  .to(shadow, { scaleX: 0.7, ease: 'power1.in' }, '>');

// window.addEventListener('load', () => {
//   GSDevTools.create();
// });
