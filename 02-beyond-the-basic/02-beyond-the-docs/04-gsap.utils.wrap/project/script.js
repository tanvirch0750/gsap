function init() {
  gsap.set('.wrapper', { autoAlpha: 1 });
  let split = new SplitText('h1', { type: 'chars' });
  let chars = split.chars;
  let animation = gsap.timeline();
  let startY = gsap.utils.wrap([-100, 100]);
  let rotation = gsap.utils.wrap([-100, 100]);
  let colors = gsap.utils.wrap(['pink', 'yellow', 'aqua']);
  let endY = gsap.utils.wrap([-50, -50, -50, 50, 50, 50]);

  animation
    .from(chars, {
      y: startY,
      rotation: rotation,
      opacity: 0,
      stagger: { each: 0.05, from: 'center' },
    })

    .to(chars, { color: colors })

    .to(chars, { y: endY });

  GSDevTools.create({ animation: animation });
}

window.addEventListener('load', init);
