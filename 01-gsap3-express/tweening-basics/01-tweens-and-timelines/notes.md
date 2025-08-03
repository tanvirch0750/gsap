## The gsap object has 3 main methods for creating Tweens and optionally adding them to timelines.

- gsap.to()
- gsap.from()
- gsap.fromTo()

### Tween: A Tween can change a single property of a single object over time

- gsap.to(".star", {x:750, duration:3})

### Tween: A Tween can change a multiple property of a single object over time

- gsap.to(".star", {x:750, scale:2, rotation:360, fill: 'yellow', duration:3})

### Tween: A Tween can change a multiple property of a multiple object over time

- gsap.to(".star", {x:750, scale:2, rotation:360, fill: 'yellow', duration:3})

### Tween: A Tween can animate multiple objects with staggered start times

- gsap.to(".star", {stagger:1 x:750, scale:2, rotation:360, fill: 'yellow', duration:3})

## A Timeline is a container for multiple tweens

### For best performance animate CSS Transform values and opacity:

- gsap.to('img.fred', { x: 400, y: 400, scale: 3, rotation: 360, duration: 3 });
- x
- y
- rotation
- rotationX
- rotationY
- skewX and skewY
- scaleX, scaleY, or just scale

### GSAP can animate any numeric property you throw at it.

- width and height
- backgroundColor, borderRadius (\*hyphenated values need to be camelCase)
- color, padding
- left and top (must set position to relative, absolute, or fixed)
- vh and vw

### from() and fromTo()

- gsap.from() animates from the values you specify to the object’s natural values.
- To animate from x and y values of 400, use:
- gsap.from(".fred", {x:400, y:400});
- gsap.fromTo() animates from the values you specify to the values you specify.

- The 2 objects in the code below are the from vars and to vars.
- gsap.fromTo(".fred", {x:400, y:400}, {x:200, y:200});

For best results make sure the from vars and to vars have the same properties.

### Special Properties: Delay and Repeat

- Special properties define how the animation should run and what it should do. Special properties are not animated.

- delay: how much time should transpire before animation begins
- repeat: how many times the animation should repeat
- yoyo: when set to true the animation will play back and forth
- repeatDelay: how much time should transpire between each repeat

An animation will repeat indefinitely if you set repeat:-1

### Special Property: Ease and Using the Ease Visualizer

- An ease controls the rate of change as your animation plays.
- In simple uses an ease will control whether your animation slows down or speeds up.
- An ease can be applied on the way out (default), on the way in, or both directions.
- The steeper the curve the faster change is taking place.
- ease:”bounce” will bounce on the way out
- ease:”bounce.in” will bounce on the way in
- ease:”bounce.inOut” will bounce on the way in and out
- ease: 'elastic, ease: 'back'

Some eases can be configured

- ease: 'back(6)'

ease:”back.config(6)” will have a stronger overshoot

#### Important notes about ease curves

- eases dictate the rate of change of an animation
- eases dictate the direction of change of an animation (bounce, back, elastic, etc)
- steep curves cause quick rate of change
- flat curves cause slow rate of change
- you can create your own ease curve using Custom Ease.

### Special Property: Stagger

- The stagger property allows you to offset the start time of multiple targets in a single tween. animation happened one after another
- In GSAP3 you no longer need the staggerTo(), staggerFrom(), and staggerFromTo() methods of GSAP2.

// each image will start 0.2 seconds after the previous one starts.
gsap.to("#freds img", {y:-100, stagger:0.2});
A stagger object gives you greater control over where the staggers start from and how the timing is dispersed.

gsap.to("#freds img", {y:-50, stagger:{
each:0.2,
from:"end"
}
});
each:0.2 means there will be 0.2 seconds between the start of each animation.

If instead you use amount:0.2 then all animations will start within 0.2 seconds.

### Tween Control

Tween’s have a number of methods for controlling playback.

In order to control a tween you need have way to reference it. Below we set up a variable to reference our tween.

var tween = gsap.to("#fred", {x:600});
\*You can use let or const instead of var based on your preference and level of comfort with JS.

To prevent a tween from playing automatically you can set its paused special property to true.

var tween = gsap.to("#fred", {x:600, paused:true});
To play that tween you can later call:

tween.play();

### Trasnform origin

By default DOM elements will scale, spin, and skew around their center point.

If we want to alter that we have access to the css property transform-origin.

Like all hyphenated css properties transform-origin becomes transformOrigin when used in a GSAP tween.

transformOrigin values are set with a pair of horizontal (x) and vertical (y) values as a single string.

The values are commonly set in pixels, percents, or using the css keywords: left, center, right, top, bottom.

The demo below shows a wide variety of examples of each unit.
