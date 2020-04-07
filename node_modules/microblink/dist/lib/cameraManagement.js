"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Preferred type of camera to be used when opening the camera feed.
 */
var PreferredCameraType;
(function (PreferredCameraType) {
    /** Prefer back facing camera */
    PreferredCameraType[PreferredCameraType["BackFacingCamera"] = 0] = "BackFacingCamera";
    /** Prefer front facing camera */
    PreferredCameraType[PreferredCameraType["FrontFacingCamera"] = 1] = "FrontFacingCamera";
})(PreferredCameraType = exports.PreferredCameraType || (exports.PreferredCameraType = {}));
/**
 * Explanation why VideoRecognizer has failed to open the camera feed.
 */
var NotSupportedReason;
(function (NotSupportedReason) {
    /** navigator.mediaDevices.getUserMedia is not supported by current browser for current context. */
    NotSupportedReason["MediaDevicesNotSupported"] = "MediaDevicesNotSupported";
    /** Camera with requested features is not available on current device. */
    NotSupportedReason["CameraNotFound"] = "CameraNotFound";
    /** Camera access was not granted by the user. */
    NotSupportedReason["CameraNotAllowed"] = "CameraNotAllowed";
    /** Unable to start playing because camera is already in use. */
    NotSupportedReason["CameraInUse"] = "CameraInUse";
    /** Camera is currently not available due to a OS or hardware error. */
    NotSupportedReason["CameraNotAvailable"] = "CameraNotAvailable";
})(NotSupportedReason = exports.NotSupportedReason || (exports.NotSupportedReason = {}));
/**
 * The error object thrown when VideoRecognizer fails to open the camera feed.
 */
var CameraManagerError = /** @class */ (function (_super) {
    __extends(CameraManagerError, _super);
    function CameraManagerError(reason) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, params) || this;
        _this.reason = reason;
        _this.name = 'CameraManagerError';
        return _this;
    }
    return CameraManagerError;
}(Error));
exports.CameraManagerError = CameraManagerError;
/**
 * Creates a new VideoRecognizer by opening a camera stream and attaching it to given HTMLVideoElement. If camera cannot be accessed,
 * the returned promise will be rejected.
 * @param cameraFeed HTMLVideoELement to which camera stream should be attached
 * @param preferredCameraType Whether back facing or front facing camera is preferred. Obeyed only if there is a choice (i.e. if device has only front-facing camera, the opened camera will be a front-facing camera, regardless of preference)
 */
function cameraManager(cameraFeed, preferredCameraType) {
    if (preferredCameraType === void 0) { preferredCameraType = PreferredCameraType.BackFacingCamera; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var selectedCamera, constraints, stream, error_1, errorReason;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return [3 /*break*/, 6];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, selectCamera(preferredCameraType)];
                            case 2:
                                selectedCamera = _a.sent();
                                if (selectedCamera === null) {
                                    reject(new CameraManagerError(NotSupportedReason.CameraNotFound));
                                    return [2 /*return*/];
                                }
                                constraints = {
                                    audio: false,
                                    video: {
                                        width: {
                                            min: 640,
                                            ideal: 1920,
                                            max: 1920
                                        },
                                        height: {
                                            min: 480,
                                            ideal: 1080,
                                            max: 1080
                                        }
                                    }
                                };
                                if (selectedCamera.deviceId === '') {
                                    ;
                                    constraints.video.facingMode = {
                                        ideal: preferredCameraType === PreferredCameraType.BackFacingCamera ? 'environment' : 'user'
                                    };
                                }
                                else {
                                    ;
                                    constraints.video.deviceId = {
                                        exact: selectedCamera.deviceId
                                    };
                                }
                                return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                            case 3:
                                stream = _a.sent();
                                cameraFeed.controls = false;
                                cameraFeed.srcObject = stream;
                                resolve(cameraFeed);
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _a.sent();
                                errorReason = NotSupportedReason.CameraInUse;
                                switch (error_1.name) {
                                    case 'NotFoundError':
                                    case 'OverconstrainedError':
                                        errorReason = NotSupportedReason.CameraNotFound;
                                        break;
                                    case 'NotAllowedError':
                                    case 'SecurityError':
                                        errorReason = NotSupportedReason.CameraNotAllowed;
                                        break;
                                    case 'AbortError':
                                    case 'NotReadableError':
                                        errorReason = NotSupportedReason.CameraNotAvailable;
                                        break;
                                    case 'TypeError':
                                        throw error_1;
                                }
                                reject(new CameraManagerError(errorReason, error_1.message));
                                return [3 /*break*/, 5];
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                reject(new CameraManagerError(NotSupportedReason.MediaDevicesNotSupported));
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.cameraManager = cameraManager;
// inspired by https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
var backCameraKeywords = [
    'rear',
    'back',
    'rück',
    'arrière',
    'trasera',
    'trás',
    'traseira',
    'posteriore',
    '后面',
    '後面',
    '背面',
    '后置',
    '後置',
    '背置',
    'задней',
    'الخلفية',
    '후',
    'arka',
    'achterzijde',
    'หลัง',
    'baksidan',
    'bagside',
    'sau',
    'bak',
    'tylny',
    'takakamera',
    'belakang',
    'אחורית',
    'πίσω',
    'spate',
    'hátsó',
    'zadní',
    'darrere',
    'zadná',
    'задня',
    'stražnja',
    'belakang',
    'बैक'
];
function isBackCameraLabel(label) {
    var lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(function (keyword) { return lowercaseLabel.includes(keyword); });
}
function selectCamera(preferredCameraType) {
    return __awaiter(this, void 0, void 0, function () {
        var frontCameras, backCameras, devices, stream, cameras, i, camera, cameraPool, selectedCameraIndex, cameraResolutions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    frontCameras = [];
                    backCameras = [];
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()
                        // if permission is not given, label of video devices will be empty string
                    ];
                case 1:
                    devices = _a.sent();
                    if (!devices.filter(function (device) { return device.kind === 'videoinput'; }).every(function (device) { return device.label === ''; })) return [3 /*break*/, 4];
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: { facingMode: { ideal: 'environment' } },
                            audio: false
                        })
                        // enumerate devices again - now the label field should be non-empty, as we have a stream active (even if we didn't get persistent permission for camera)
                    ];
                case 2:
                    stream = _a.sent();
                    return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()
                        // close the stream, as we don't need it anymore
                    ];
                case 3:
                    // enumerate devices again - now the label field should be non-empty, as we have a stream active (even if we didn't get persistent permission for camera)
                    devices = _a.sent();
                    // close the stream, as we don't need it anymore
                    stream.getTracks().forEach(function (track) { return track.stop(); });
                    _a.label = 4;
                case 4:
                    cameras = devices.filter(function (device) { return device.kind === 'videoinput'; });
                    for (i in cameras) {
                        camera = cameras[i];
                        if (isBackCameraLabel(camera.label)) {
                            backCameras.push(camera);
                        }
                        else {
                            frontCameras.push(camera);
                        }
                    }
                    if (frontCameras.length > 0 || backCameras.length > 0) {
                        cameraPool = backCameras.length > 0 ? backCameras : frontCameras;
                        // if there is at least one back facing camera and user prefers back facing camera, use that as a selection pool
                        if (preferredCameraType === PreferredCameraType.BackFacingCamera && backCameras.length > 0) {
                            cameraPool = backCameras;
                        }
                        // if there is at least one front facing camera and user prefers front facing camera, use that as a selection pool
                        if (preferredCameraType === PreferredCameraType.FrontFacingCamera && frontCameras.length > 0) {
                            cameraPool = frontCameras;
                        }
                        // otherwise use whichever pool is non-empty
                        // sort camera pool by label
                        cameraPool = cameraPool.sort(function (camera1, camera2) { return camera1.label.localeCompare(camera2.label); });
                        // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
                        // Otherwise pick the first camera
                        {
                            selectedCameraIndex = 0;
                            cameraResolutions = cameraPool.map(function (camera) {
                                var match = camera.label.match(/\b([0-9]+)MP?\b/i);
                                if (match !== null) {
                                    return parseInt(match[1], 10);
                                }
                                else {
                                    return NaN;
                                }
                            });
                            if (!cameraResolutions.some(function (cameraResolution) { return isNaN(cameraResolution); })) {
                                selectedCameraIndex = cameraResolutions.lastIndexOf(Math.max.apply(Math, cameraResolutions));
                            }
                            return [2 /*return*/, cameraPool[selectedCameraIndex]];
                        }
                    }
                    else {
                        // no cameras available on the device
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=cameraManagement.js.map