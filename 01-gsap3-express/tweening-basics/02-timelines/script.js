gsap.set('#demo', { scale: 1.1 }); // set crate a tween with no duration

/*
let animation = gsap
  .timeline()
  .from('#demo', { duration: 1, opacity: 0 })
  .from('#title', { opacity: 0, scale: 0, ease: 'back' })
  .from(
    '#freds img',
    { y: 160, stagger: 0.1, duration: 0.8, ease: 'back' },
    '+=2'
  ) // "+=2" means wait for 2 seconds before starting this tween
  // xPercent: 100 means move the element to the right by 100% of its width
  .from('#time', { xPercent: 100, duration: 0.8 }, '<'); // "-=1" means start this tween 1 second before the end of the previous tween;
// '<' means start this tween at the same time as the previous tween
// '<0.5' means start this tween 0.5 seconds before the end of the previous tween
// '<+1' means start this tween 1 second after the end of the previous tween
// if we just add number 1 instead of '<', it will start after the 1 second of the first tween animation.
*/

let animation = gsap
  .timeline()
  .from('#demo', { duration: 1, opacity: 0 })
  .from('#title', { opacity: 0, scale: 0, duration: 2, ease: 'back' })
  .from(
    '#freds img',
    { y: 160, stagger: 0.1, duration: 0.8, ease: 'back' },
    '+=2'
  )
  .add('test') // add a label to the timeline
  .from('#time', { xPercent: 100, duration: 0.8 }); //

//animation.play('test'); // start the animation from the label 'test'

document.getElementById('play').onclick = () => animation.play();
document.getElementById('pause').onclick = () => animation.pause();
document.getElementById('reverse').onclick = () => animation.reverse();
document.getElementById('restart').onclick = () => animation.restart();
document.getElementById('test').onclick = () => animation.play('test');
