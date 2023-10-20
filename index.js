let clicks = 0;

class Interpolator {
  constructor() {
    this.interpolatedField = 0;
    this.previousFieldUpdate = 0;
    this.currentUpdateMS = Date.now();
    this.lastUpdateMS = 0;
  }

  after_UpdateInterpolationMetadata(field) {
    this.interpolatedField = field;
  }

  before_UpdateInterpolateMetadata(field) {
    this.previousFieldUpdate = field;
    this.lastUpdateMS = this.currentUpdateMS;
    this.currentUpdateMS = Date.now();
  }

  updateCounterField(self) {
    const deltaMS = Date.now() - self.currentUpdateMS;
    const percent = deltaMS / (self.currentUpdateMS - self.lastUpdateMS);
    const diff = self.interpolatedField - self.previousFieldUpdate;

    const valueToShow = Math.floor(self.previousFieldUpdate + diff * percent);
    onFrame(valueToShow);
  }

  startTimer(milisecondsUpdate, onFrame) {
    setInterval(() => this.updateCounterField(this, onFrame), milisecondsUpdate);
  }
}

function onFrame(currentClick) {
  document.getElementById('interp').innerHTML = currentClick;
}

let interpolator = new Interpolator();
interpolator.startTimer(11, onFrame);

function apiClicksCalls() {
  interpolator.before_UpdateInterpolateMetadata(clicks);
  if(clicks < 900) {
    clicks += 10;
  }
  interpolator.after_UpdateInterpolationMetadata(clicks);
}

setInterval(apiClicksCalls, 1000);