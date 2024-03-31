// create function to get user info (device type / device / browser)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
export const getDeviceType = () => {
    const touchPoints = navigator.maxTouchPoints
    const UA = navigator.userAgent

    let deviceType;
    if (touchPoints > 0 && UA.match("iPhone")) {
        deviceType = "iPhone"
    } else if (touchPoints === 0 && UA.match("iPad")) {
        deviceType = "iPad"
    } else if (touchPoints > 0 && UA.match("Mobi")) {
        deviceType = "Mobile"
    } else {
        deviceType = "Desktop"
    };

    return (deviceType)
};

export const getBrowser = () => {
    const UA = navigator.userAgent

    let browserCheck;
    // check if chrome
    if (UA.match("Chrome") && !UA.match("Edg") && !UA.match("Chromium")) {
        browserCheck = "Chrome"
    } else if (UA.match("Edg")) { //check if  edge
        browserCheck = "Edge"
    } else if (UA.match("Safari") && !UA.match("Chrome") && !UA.match("Chromium")) { // check if safari
        browserCheck = "Safari"
    } else if (UA.match("Firefox")) {
        browserCheck = "Firefox"
    } else {
        browserCheck = "Other"
    }
    return (browserCheck)
};

export const getDisplayMode = () => {
    let displayMode = 'browser';
    if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
    };

    return (displayMode)
};