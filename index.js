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