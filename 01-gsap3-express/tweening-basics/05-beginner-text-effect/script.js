gsap.to('p', {
  text: 'Welcome to the Gsap Lesson',
  duration: 2,
  ease: 'power1.in',
});

gsap.registerPlugin(GSDevTools, SplitText);

let split;
let animation = gsap.timeline({ repeat: 10, yoyo: true, repeatDelay: 0.3 });

let word;

let line;

function init() {
  gsap.set('.wrapper-two', { autoAlpha: 1 });
  split = new SplitText('h1', { type: 'chars' });
  animation.from(split.chars, {
    opacity: 0,
    y: 50,
    ease: 'back(2)',
    stagger: 0.05,
  });

  // word by word animation
  word = new SplitText('h2', { type: 'words' });
  gsap.set('.wrapper-three', { autoAlpha: 1 });
  animation.from(word.words, {
    opacity: 0,
    // rotation: -40,
    // scale: 0.4,
    stagger: 0.1,
    duration: 1,
    ease: 'back',
  });

  // line by line animation
  line = new SplitText('h3', { type: 'lines' });
  gsap.set('.wrapper-four', { autoAlpha: 1 });
  animation.from(line.lines, {
    opacity: 0,
    rotationX: -90,
    rotationY: -80,
    stagger: 0.1,
    transformOrigin: '50% 50% -200',
  });

  GSDevTools.create({ animation: animation });
}

window.addEventListener('load', init);
