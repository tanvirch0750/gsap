1️⃣ What is killTweensOf()?
gsap.killTweensOf() instantly stops and removes any active tweens targeting a specific element or object.
Think of it as saying:

“Hey GSAP, forget everything you’re doing to this target right now.”

It’s useful when:

You want to stop an animation early

You want to prevent multiple animations from stacking on the same element

You’re cleaning up when switching states (like in games or interactive apps)

2️⃣ Syntax
js
Copy
Edit
gsap.killTweensOf(targets, vars);
Parameter Type Default Meaning
targets Element / Array / Selector / Object Required The thing(s) you want to stop animating
vars Object null Optional — kill only tweens affecting specific properties
