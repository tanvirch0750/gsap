// const tween = gsap.to('.text', { color: 'white', paused: true });
// const dotTween = gsap.to('.dot', {
//   scale: 1.2,
//   backgroundColor: 'yellow',
//   paused: true,
// });

const items = document.querySelectorAll('.item');

gsap.defaults({ duration: 0.3 });

items.forEach((item, index) => {
  const tl = gsap
    .timeline({ paused: true })
    .to(item.querySelector('.text'), {
      color: 'white',
      x: 10,
      scale: 1.2,
      transformOrigin: 'left center',
    })
    .to(
      item.querySelector('.dot'),
      {
        scale: 1.2,
        backgroundColor: '#f93',
      },
      0
    );

  item.addEventListener('mouseenter', () => {
    tl.play();
  });
  item.addEventListener('mouseleave', () => {
    tl.reverse();
  });
});

// Building a repeating hover pulse effect on a button

const cta = document.querySelector('.cta');

// create a repeating scale tween
const scaleTween = gsap.to(cta, {
  scale: 1,
  paused: true,
  repeat: -1,
  yoyo: true,
  duration: 0.5,
});

cta.addEventListener('mouseenter', () => {
  scaleTween.restart();
});
cta.addEventListener('mouseleave', () => {
  // scaleTween.reverse();
  scaleTween.pause();
  gsap.to(cta, { scale: 0.8, duration: 0.5 });
});
