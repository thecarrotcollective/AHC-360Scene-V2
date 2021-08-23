var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

// desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
if (window.innerWidth > window.innerHeight) {
    canvasWidth = Math.floor(window.innerHeight*0.66);
}

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
        deepAR.switchEffect(0, 'slot', './effects/background_segmentation4', function() {
            // effect loaded
            console.log("effect loaded")
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
};


deepAR.onScreenshotTaken = function(photo) {
    // Pause camera video
    deepAR.pause();

    // console.log(img);
    shareCanvas(photo);

    // if share is cancelled, resume video
    deepAR.resume();
};

async function shareCanvas(image) {
    // let canvasElement = document.getElementById('deepar-canvas');
    // const dataUrl = canvasElement.toDataURL();
    const dataUrl = image;
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'share.png',
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
            title: 'Pictures',
            text: 'Our Pictures.',
        })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));

    } else {
        // Fallback - Save image, prompt user to share
        console.log(`Your system doesn't support sharing files.`);
    }

}

deepAR.downloadFaceTrackingModel('lib/models-68-extreme.bin');

function startExternalVideo() {

    // create video element
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.controls = true;
    video.setAttribute('playsinline', 'playsinline');
    video.style.width = '100%';
    video.style.height = '100%';

    // put it somewhere in the DOM
    var videoContainer = document.createElement('div');
    videoContainer.appendChild(video);
    videoContainer.style.width = '1px';
    videoContainer.style.height = '1px';
    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '0px';
    videoContainer.style.left = '0px';
    videoContainer.style['z-index'] = '-1';
    document.body.appendChild(videoContainer);

    navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
        try {
            video.srcObject = stream;
        } catch (error) {
            video.src = URL.createObjectURL(stream);
        }

        setTimeout(function() {
            video.play();
        }, 50);
    }).catch(function(error) {

    });

    // tell the DeepAR SDK about our new video element
    deepAR.setVideoElement(video, true);
}


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

const shareButton = document.getElementById('share-button')
shareButton.addEventListener("click", async () => {
    try {
        // await navigator.share({ title: "Example Page", url: "" });
        // console.log("Data was shared successfully");
        deepAR.takeScreenshot();

    } catch (err) {
        // console.error("Share failed:", err.message);
        console.log("take screenshot failed :(")
    }
});


// Share Link UI
// shareButton.addEventListener("click", async () => {
//   try {
//     await navigator.share({ title: "Example Page", url: "" });
//     console.log("Data was shared successfully");
//   } catch (err) {
//     console.error("Share failed:", err.message);
//   }
// });
