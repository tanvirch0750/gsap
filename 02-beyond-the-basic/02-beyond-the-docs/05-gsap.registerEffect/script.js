gsap.registerPlugin(GSDevTools, SplitText);

gsap.registerEffect({
  name: 'rainbow',
  extendTimeline: true,
  defaults: {
    y: -100,
    colors: ['aqua', 'pink', 'yellow'],
  },
  effect: (targets, config) => {
    let split = new SplitText(targets, { type: 'chars' });
    let tl = gsap.timeline();
    tl.from(split.chars, {
      opacity: 0,
      y: config.y,
      stagger: { each: 0.05, from: 'center' },
    }).to(
      split.chars,
      {
        color: gsap.utils.wrap(config.colors),
        stagger: { each: 0.05, from: 'center' },
      },
      0
    );
    return tl;
  },
});

function init() {
  gsap.set('.wrapper', { autoAlpha: 1 });

  let animation = gsap.timeline();

  animation.rainbow('h1').rainbow('h2', { y: 50 });

  GSDevTools.create({});
}

window.addEventListener('load', init);
