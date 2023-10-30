let clicks = 0;

function onFrame(currentClick) {
  document.getElementById('interp').innerHTML = currentClick;
}

function apiClicksCalls(interpolator, clicksCount, endingAtCount) {
  if(clicks < endingAtCount) {
    clicks += clicksCount;
  }
  document.getElementById('normal').innerHTML = clicks;
  interpolator.updateStepField(clicks);
}

function clickData() {

  const clicksCount = parseInt(document.getElementById('click-dom').value)
  const samplingCount = parseInt(document.getElementById('sampling-dom').value)
  const apiCallCount = parseInt(document.getElementById('api-call-dom').value)
  const endingAtCount = parseInt(document.getElementById('ending-at-dom').value)

  let interpolator = new Interpolator();
  interpolator.startTimer(samplingCount, onFrame);

  setInterval(() => apiClicksCalls(interpolator, clicksCount, endingAtCount), apiCallCount);
}
