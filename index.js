class Interpolator {
  constructor() {
    this.interpolatedField = 0;
    this.previousFieldUpdate = 0;
    this.currentUpdateMS = Date.now();
    this.lastUpdateMS = 0;
  }

  updateStepField(field) {
    this.previousFieldUpdate = this.interpolatedField;
    this.lastUpdateMS = this.currentUpdateMS;
    this.currentUpdateMS = Date.now();

    this.interpolatedField = field;
  }

  updateCounterField(self) {
    const deltaMS = Date.now() - self.currentUpdateMS;
    const previuousDeltaMS = self.currentUpdateMS - self.lastUpdateMS;
    if(previuousDeltaMS) {
      const percent = deltaMS / previuousDeltaMS;
      const diff = self.interpolatedField - self.previousFieldUpdate;

      const valueToShow = Math.floor(self.previousFieldUpdate + diff * percent);
      onFrame(valueToShow);
    }
  }

  startTimer(milisecondsUpdate, onFrame) {
    setInterval(() => this.updateCounterField(this, onFrame), milisecondsUpdate);
  }
}