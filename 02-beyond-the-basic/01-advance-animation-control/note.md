🧠 Vital Notes for Future Reference
🧩 1. GSAP Core Timeline Control
gsap.to() creates a tween/animation to a given state.

Use .paused(), .play(), .restart(), .reverse() for advanced control.

🎛️ 2. Progress Control
animation.progress() accepts values from 0 to 1.

You can link this to a slider to allow scrubbing through the animation.

📟 3. Time Control
.time() lets you jump to a specific second in the animation.

.duration() can dynamically change the full length of an animation.

🎚️ 4. Time Scaling
.timeScale(x) lets you speed up or slow down playback:

1 = normal speed

0.5 = half speed

2 = double speed

🧠 5. Getter/Setter Methods
These act both as get and set depending on if you pass a value.

Method Getter Usage Setter Usage
paused() paused() → true/false paused(true) pauses
progress() progress() → 0-1 progress(0.5) jumps to 50%
time() time() → seconds time(2.5) goes to 2.5s
duration() duration() → seconds duration(10) sets to 10s
timeScale() timeScale() → factor timeScale(2) = 2x faster
reversed() reversed() → boolean reversed(true) reverses

🧰 6. Smart Play/Pause System
Always check .progress() === 1 to know if it's completed.

animation.restart() will reset and start over.

🕹️ 7. Scrubbing Animations
Use input event on a slider to set .progress().

Also use pause() so it doesn't resume playing automatically.

🎯 8. MotionPath Plugin
motionPath.path: the SVG path your object should follow.

motionPath.align: aligns the element along the path.

If you want, I can also generate a cheat sheet PDF from this, or a React version of the same logic. Let me know!
