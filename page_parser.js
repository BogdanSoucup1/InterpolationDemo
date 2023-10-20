let clicks = 0;

function onFrame(currentClick) {
  document.getElementById('interp').innerHTML = currentClick;
}

function apiClicksCalls(interpolator, clicksCount) {
  interpolator.before_UpdateInterpolateMetadata(clicks);
  if(clicks < 900) {
    clicks += clicksCount;
  }
  document.getElementById('normal').innerHTML = clicks;
  interpolator.after_UpdateInterpolationMetadata(clicks);
}

function clickData() {

  const clicksCount = parseInt(document.getElementById('click-dom').value)
  const samplingCount = parseInt(document.getElementById('sampling-dom').value)
  const apiCallCount = parseInt(document.getElementById('api-call-dom').value)

  let interpolator = new Interpolator();
  interpolator.startTimer(samplingCount, onFrame);

  setInterval(() => apiClicksCalls(interpolator, clicksCount), apiCallCount);
}
