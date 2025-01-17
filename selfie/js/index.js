var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

// desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
if (window.innerWidth > window.innerHeight) {
    canvasWidth = Math.floor(window.innerHeight*0.66);
}
const fullscreenOverlay = document.getElementById('canvas-fullscreen')
const closeBtn = document.getElementById('close-button')
const downloadBtn = document.getElementById('download-button')
const shareBtn = document.getElementById('share-button')
const backBtn = document.getElementById('back-button')

var cameraFlashSound = document.getElementById('camera-flash')
// cameraFlashSound.src = '../../sceneFolder/sounds/sfx/flash.mp3';
// document.body.appendChild(cameraFlashSound);

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
var analyser = context.createAnalyser();

var source = context.createMediaElementSource(cameraFlashSound);
source.connect(analyser);
analyser.connect(context.destination);

var readyForSelfie = false;
console.log("selfie not ready");

var deepAR = DeepAR({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    licenseKey: '15611f67d939bddce1f0ddec66f4764b409577cbce0e7e9d7899911eebfef21688fa8a3bd37d018e\n',
    canvas: document.getElementById('deepar-canvas'),
    numberOfFaces: 1,
    libPath: './lib',
    segmentationInfoZip: 'segmentation.zip',
    onInitialize: function() {
        // start video immediately after the initalization, mirror = true
        deepAR.startVideo(true);

        // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
        console.log("initialized")
        deepAR.switchEffect(0, 'slot', './effects/background_segmentation6', function() {
            // effect loaded
            console.log("effect loaded")
            takePicBtn.style.opacity = 1;
            fullscreenOverlay.style.opacity = 0;
            backBtn.style.display = "block";
            readyForSelfie = true;
            console.log("selfie  ready");

            // fullscreenOverlay.style.display = 'none';

        });
    }
});

deepAR.onCameraPermissionAsked = function() {
    console.log('camera permission asked.');
};

deepAR.onCameraPermissionGranted = function() {
    console.log('camera permission granted.');
};

deepAR.onCameraPermissionDenied = function() {
    console.log('camera permission denied.');
};

// deepAR.onScreenshotTaken = function(photo) {
//   console.log('screenshot taken');
// };

deepAR.onImageVisibilityChanged = function(visible) {
    console.log('image visible', visible);
};

deepAR.onFaceVisibilityChanged = function(visible) {
    console.log('face visible', visible);
};

deepAR.onVideoStarted = function() {
    var loaderWrapper = document.getElementById('loader-wrapper');
    loaderWrapper.style.display = 'none';
    takePicBtn.style.opacity = 1;
};

var screenshot;

deepAR.onScreenshotTaken = function(photo) {
    // Pause camera video
    // fullscreenOverlay.style.display = 'block';
    // console.log(img);
    if(readyForSelfie){

      cameraFlashSound.play()
      takePicBtn.style.display = 'none';
      takePicBtn.style.opacity = 0;
      fullscreenOverlay.style.opacity = 0.8;
      deepAR.pause();
      screenshot = photo;
      shareCanvas(photo);
      readyForSelfie = false;
      console.log("selfie not ready");
    }

    // if share is cancelled, resume video
    //deepAR.resume();
};

async function shareCanvas(image) {
  setTimeout(function(){

    fullscreenOverlay.style.opacity = 0;
    closeBtn.style.opacity = 1;
    downloadBtn.style.opacity = 1;
    shareBtn.style.opacity = 1;
    // fullscreenOverlay.style.display = 'none';
  }, 200);

    // let canvasElement = document.getElementById('deepar-canvas');

}

deepAR.downloadFaceTrackingModel('lib/models-68-extreme.bin');


$(document).ready(function() {
    // $('.effect-carousel').slick({
    //   slidesToShow: 1,
    //   centerMode: true,
    //   focusOnSelect: true,
    //   arrows: false,
    //   accessibility: false,
    //   variableWidth: true
    // });

    var effects = [
        './effects/youspa_bg_v7'
    ];


    // $('.effect-carousel').on('afterChange', function(event, slick, currentSlide){
    //   deepAR.switchEffect(0, 'slot', effects[currentSlide]);
    // });

});

const takePicBtn = document.getElementById('takepic-button')
takePicBtn.addEventListener("click", async () => {
    try {
        // await navigator.share({ title: "Example Page", url: "" });
        // console.log("Data was shared successfully");
        console.log("taken a screenshot")
        backBtn.style.display = "none";

        deepAR.takeScreenshot();

    } catch (err) {
        // console.error("Share failed:", err.message);
        console.log("take screenshot failed :(")
    }
});

closeBtn.addEventListener("click", async () => {
  backBtn.style.display = "block";

  closeBtn.style.opacity = 0;
  downloadBtn.style.opacity = 0;
  shareBtn.style.opacity = 0;
  // closeBtn.style.display = 'none';
  // downloadBtn.style.display = 'none';
  // shareBtn.style.display = 'none';

  setTimeout(function(){
    takePicBtn.style.display = 'block';
    takePicBtn.style.opacity = 1;
    readyForSelfie = true
    console.log("selfie ready");
    deepAR.resume();
    // fullscreenOverlay.style.display = 'none';
  }, 200);
  console.log("closed");
});

downloadBtn.addEventListener("click", async () => {
  download(screenshot, 'AHC Selfie with Krystal Jung.png');
});

shareBtn.addEventListener("click", async () => {
  sharePopup();

    // share(screenshot);
});

backBtn.addEventListener("click", async () => {
  window.location.href="../sceneFolder/index.html";
});

/* Canvas Donwload */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  // lnk.href = canvas.toDataURL("image/png;base64");
  lnk.href = canvas;

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}

async function share(image){
  const dataUrl = image;
  const blob = await (await fetch(dataUrl)).blob();
  const filesArray = [
      new File(
          [blob],
          'AHCSelfie.png',
          {
              type: blob.type,
              lastModified: new Date().getTime()
          }
      )
  ];
  const shareData = {
      files: filesArray,
  };
  console.log(shareData);
  console.log("shareData = " + shareData);
  // console.log(typeof(shareData));

  // navigator.share(shareData).then(r =>  console.log('share image'));

  if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      // Supported Browsers - Share image with UX share dialog
      navigator.share({
          files: filesArray,
          title: 'AHC',
          text: 'Selfie with Krystal Jung.',
      })
          .then(() => console.log('Share was successful.'))
          .catch((error) => console.log('Sharing failed', error));

  } else {
      // Fallback - Save image, prompt user to share
      console.log(`Your system doesn't support sharing files.`);
      alert("Your device does not allow sharing of files from the web browser. Please download the image instead.");
  }

}

// Share Link UI
// shareButton.addEventListener("click", async () => {
//   try {
//     await navigator.share({ title: "Example Page", url: "" });
//     console.log("Data was shared successfully");
//   } catch (err) {
//     console.error("Share failed:", err.message);
//   }
// });


const shareSubmit = document.getElementById('share-submit');
shareSubmit.addEventListener('click', sendUser)
const shareContainer = document.getElementById('share-container')
const shareClose = document.getElementById('share-close')

var input = document.getElementById('phone');
input.oninvalid = function(event) {
    event.target.setCustomValidity('Phone number is 18 digit maximum');
}

var xmlhttp;
var post_url = 'post_user.php';

$(document).ready(function() {
    const submit = document.getElementById('share-submit');
    submit.addEventListener('click', sendUser);
});

function sendUser() {
    let phoneNumber = document.getElementById('phone').value;
    console.log(phoneNumber)
    if (phoneNumber==null || phoneNumber === ""){
        alert("Phone number invalid, try again");

    } else {
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open("POST", post_url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        console.log("sendUser phone = " + phoneNumber);
        xmlhttp.send("phone="+phoneNumber);
        xmlhttp.addEventListener("load", transferComplete);
    }
}

function transferComplete(evt) {
    console.log("The transfer is complete.");
    input.value = "";
    shareContainer.style.display = 'none';

    // copyLink();
    share(screenshot);


}


function sharePopup() {
    shareContainer.style.display = 'block';
    console.log('show share-container')

    // add close button listener
    shareClose.addEventListener('click', closeSharePopup);
}

function closeSharePopup() {
    shareContainer.style.display = 'none'
}

// function copyLink() {
//     const linkToCopy = "https://us.ahcbeauty.com/";
//
//     if (navigator.share) {
//         navigator.share({
//             title: 'AHC You Spa',
//             url: linkToCopy
//         }).then(() => {
//
//             setTimeout(() => {
//                 shareContainer.style.display = 'none;'
//             }, 2000)
//         })
//             .catch(console.error);
//     } else {
//         // TODO Add fallback to copy Link
//         navigator.clipboard.writeText(linkToCopy)
//             .then(() => {
//                 shareSubmit.innerText = 'LINK COPIED'
//                 setTimeout(() => {
//                     shareSubmit.innerText = 'Share Experience With a Friend'
//                     shareContainer.style.display = 'none;'
//                 }, 2000)
//
//             })
//             .catch((error) => {
//                 alert('Copy failed! ${error}')
//             })
//     }
// }
