#include <openxr/openxr.h>
#include <openxr/openxr_platform.h>
#include <iostream>
#include <vector>
#include <cstring>

XrInstance instance;
XrSession session;
XrSpace eyeSpace;
XrSystemId systemId;
bool eyeTrackingSupported = false;

void CheckAndEnableEyeTrackingExtension() {
    uint32_t extensionCount = 0;
    xrEnumerateInstanceExtensionProperties(nullptr, 0, &extensionCount, nullptr);

    std::vector<XrExtensionProperties> extensions(extensionCount, {XR_TYPE_EXTENSION_PROPERTIES});
    xrEnumerateInstanceExtensionProperties(nullptr, extensionCount, &extensionCount, extensions.data());

    for (const auto& ext : extensions) {
        if (strcmp(ext.extensionName, XR_EXT_EYE_GAZE_INTERACTION_EXTENSION_NAME) == 0) {
            eyeTrackingSupported = true;
            std::cout << "Eye tracking extension is supported!\n";
            break;
        }
    }
}

void InitOpenXREyeTracking() {
    // Check if eye tracking extension is supported
    CheckAndEnableEyeTrackingExtension();
    if (!eyeTrackingSupported) {
        std::cerr << "Eye tracking is not supported by the OpenXR runtime.\n";
        return;
    }

    // Get system ID
    XrSystemGetInfo systemInfo{XR_TYPE_SYSTEM_GET_INFO};
    systemInfo.formFactor = XR_FORM_FACTOR_HEAD_MOUNTED_DISPLAY;
    xrGetSystem(instance, &systemInfo, &systemId);

    // Enable the extension when creating the session
    const char* enabledExtensions[] = {XR_EXT_EYE_GAZE_INTERACTION_EXTENSION_NAME};

    XrSessionCreateInfo sessionCreateInfo{XR_TYPE_SESSION_CREATE_INFO};
    sessionCreateInfo.systemId = systemId;
    sessionCreateInfo.enabledExtensionCount = 1;
    sessionCreateInfo.enabledExtensionNames = enabledExtensions;

    if (xrCreateSession(instance, &sessionCreateInfo, &session) != XR_SUCCESS) {
        std::cerr << "Failed to create OpenXR session with eye tracking.\n";
        return;
    }

    // Create an eye tracking space
    XrReferenceSpaceCreateInfo eyeSpaceCreateInfo{XR_TYPE_REFERENCE_SPACE_CREATE_INFO};
    eyeSpaceCreateInfo.referenceSpaceType = XR_REFERENCE_SPACE_TYPE_VIEW;
    eyeSpaceCreateInfo.poseInReferenceSpace = {{0, 0, 0, 1}, {0, 0, 0}};
    xrCreateReferenceSpace(session, &eyeSpaceCreateInfo, &eyeSpace);
}

void GetEyeGaze() {
    if (!eyeTrackingSupported) return;

    XrEyeGazeSampleTimeEXT gazeSampleTime{XR_TYPE_EYE_GAZE_SAMPLE_TIME_EXT};
    XrEyeGazeStateEXT eyeGazeState{XR_TYPE_EYE_GAZE_STATE_EXT};
    eyeGazeState.next = &gazeSampleTime;

    if (xrLocateEyeGazeSampleEXT(session, &eyeGazeState) == XR_SUCCESS) {
        if (eyeGazeState.isValid) {
            std::cout << "Gaze direction: " << eyeGazeState.gazePose.orientation.x << ", "
                      << eyeGazeState.gazePose.orientation.y << ", "
                      << eyeGazeState.gazePose.orientation.z << std::endl;
        }
    }
}

int main() {
    // Initialize OpenXR instance (not shown here for brevity)
    InitOpenXREyeTracking();

    if (eyeTrackingSupported) {
        while (true) { // Should be part of a proper frame loop
            GetEyeGaze();
        }
    }

    return 0;
}