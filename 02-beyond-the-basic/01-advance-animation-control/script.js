// Utility functions for selecting elements
const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// DOM references
let time = select('#time'); // Displays current animation time
let pause = select('#pause'); // Play/Pause toggle button
let progressSlider = select('#progressSlider'); // Slider to scrub animation
let home = select('#home'); // Button to jump to start
let school = select('#school'); // Button to jump to end
let candy = select('#candy'); // Button to jump to 50%
let dog = select('#dogpark'); // Button to jump to 90%

// Create main animation timeline
let animation = gsap.to('#herman', {
  duration: 6, // Total animation duration
  ease: 'none', // No easing (linear motion)
  motionPath: {
    path: '#motionpath', // SVG path to follow
    align: '#herman', // Align element along path
  },
  onUpdate: animationUpdate, // Called on every frame
  onComplete: () => (pause.innerHTML = 'play'), // When complete, update button label
});

// Sync animation progress with slider input (scrub mode)
progressSlider.addEventListener('input', function () {
  animation.progress(this.value).pause(); // Set progress + pause animation
});

// When user releases slider, update button text
progressSlider.addEventListener('change', function () {
  pause.innerHTML = 'play';
});

// Smart play/pause toggle button
pause.addEventListener('click', () => {
  animation.paused(!animation.paused()); // Toggle play/pause
  if (animation.progress() == 1) {
    // If at end, restart
    animation.restart();
  }
  setButtonState(); // Update button label
});

// Runs every frame while animation plays
function animationUpdate() {
  progressSlider.value = this.progress().toFixed(2); // Update slider value (0–1)
  time.innerHTML = this.time().toFixed(2); // Update time display
}

// Update pause button label based on animation state
function setButtonState() {
  pause.innerHTML = animation.paused() ? 'play' : 'pause';
}

// Jump to specific animation points when buttons clicked

home.addEventListener('click', () => {
  animation.pause();
  gsap.to(animation, { progress: 0, duration: 1, onComplete: setButtonState });
});

school.addEventListener('click', () => {
  animation.pause();
  gsap.to(animation, { progress: 1, duration: 1, onComplete: setButtonState });
});

candy.addEventListener('click', () => {
  animation.pause();
  gsap.to(animation, {
    progress: 0.5,
    duration: 1,
    onComplete: setButtonState,
  });
});

dog.addEventListener('click', () => {
  animation.pause();
  gsap.to(animation, {
    progress: 0.9,
    duration: 1,
    onComplete: setButtonState,
  });
});

// --- Advanced Controls (getter/setter examples) ---

// animation.paused();         // Getter: returns true/false
// animation.paused(true);     // Setter: pauses animation
// animation.progress(0.5);    // Jumps to 50% progress
// animation.time(2.5);        // Jumps to 2.5 seconds into animation
// animation.duration(10);     // Changes total duration to 10 seconds
// animation.timeScale(2);     // Speeds up animation by 2x
// animation.reversed(true);   // Plays animation in reverse
