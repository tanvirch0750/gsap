1️⃣ What is timeline.getChildren()?
getChildren() is a GSAP Timeline method that returns an array of all child animations inside that timeline.

Children can be tweens or nested timelines.

You can choose whether to include:

tweens (animations on properties)

timelines (nested timelines)

labels (named points in the timeline)

timeline.getChildren(nested, tweens, timelines, ignoreBeforeTime);

| Parameter          | Default      | Meaning                                             |
| ------------------ | ------------ | --------------------------------------------------- |
| `nested`           | `false`      | Whether to include animations from nested timelines |
| `tweens`           | `true`       | Include tween animations                            |
| `timelines`        | `true`       | Include timelines                                   |
| `ignoreBeforeTime` | `-999999999` | Ignore animations starting before this time         |
