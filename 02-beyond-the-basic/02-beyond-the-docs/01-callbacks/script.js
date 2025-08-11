window.addEventListener('load', () => {
  init();
  GSDevTools.create();
});

const logBox = document.getElementById('log');
const log = (msg) => {
  logBox.innerHTML += msg + '<br>';
  logBox.scrollTop = logBox.scrollHeight;
};

const player = { name: 'Tanvir', score: 200 };

// NORMAL CALLBACK (default GSAP scope)
document.getElementById('startNormal').addEventListener('click', () => {
  logBox.innerHTML = '<strong>Logs:</strong><br>';

  gsap.to('#box', {
    x: 300,
    duration: 1,

    onStart: function () {
      log(
        "✅ onStart → 'this' is Tween instance: " +
          (this.targets ? 'Yes' : 'No')
      );
    },
    onUpdate: function () {
      log('⏳ onUpdate → Tween targets: ' + this.targets()[0].id);
    },
    onComplete: function () {
      log(
        '🎯 onComplete → Still Tween instance, target id: ' +
          this.targets()[0].id
      );
    },
  });
});

// CUSTOM SCOPE CALLBACK
document.getElementById('startCustomScope').addEventListener('click', () => {
  logBox.innerHTML = '<strong>Logs:</strong><br>';

  gsap.to('#box', {
    x: 300,
    duration: 1,
    callbackScope: player, // Now `this` refers to player object

    onStart: function () {
      log(
        `✅ onStart → 'this' is Player: name=${this.name}, score=${this.score}`
      );
    },
    onUpdate: function () {
      log(`⏳ onUpdate → Player score updating: ${this.score}`);
    },
    onComplete: function (msg) {
      log(
        `🎯 onComplete → ${msg} Player: ${this.name}, Final Score: ${this.score}`
      );
    },
    onCompleteParams: ['Animation finished! ✅'],
  });
});
