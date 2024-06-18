document.getElementById('set').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let startMinutes = parseInt(document.getElementById('start-minutes').value) || 0;
  let startSeconds = parseInt(document.getElementById('start-seconds').value) || 0;
  let endMinutes = parseInt(document.getElementById('end-minutes').value) || 0;
  let endSeconds = parseInt(document.getElementById('end-seconds').value) || 0;
  let count = parseInt(document.getElementById('count').value);

  let startTime = startMinutes * 60 + startSeconds;
  let endTime = endMinutes * 60 + endSeconds;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setLoop,
    args: [startTime, endTime, count]
  });
});

document.getElementById('stop').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: stopLoop
  });
});

function setLoop(start, end, count) {
  let video = document.querySelector('video');
  if (!video) return;

  video.currentTime = start;

  let playCount = 0;
  video.addEventListener('timeupdate', function loop() {
    if (video.currentTime >= end) {
      if (playCount < count - 1) {
        playCount++;
        video.currentTime = start;
      } else {
        video.removeEventListener('timeupdate', loop);
      }
    }
    video.loopFn = loop;
  });
}

function stopLoop() {
  let video = document.querySelector('video');
  if (!video || !video.loopFn) return;

  video.removeEventListener('timeupdate', video.loopFn);
  delete video.loopFn;
}
