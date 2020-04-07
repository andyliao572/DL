"use strict";
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
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
// import { FrameHelper } from './frameHelper'
var blob_util_1 = require("blob-util");
var microblinkApi_service_1 = require("./microblinkApi.service");
var Observable_1 = require("rxjs/internal/Observable");
var microblink_types_1 = require("./microblink.types");
var frameHelper_1 = require("./frameHelper");
var scanExchangeHelper_1 = require("./scanExchangeHelper");
var cryptoHelper_1 = require("./cryptoHelper");
var Microblink = /** @class */ (function () {
    function Microblink() {
        this.recognizers = [];
        this.authorizationHeader = '';
        this.exportImages = false;
        this.exportFullDocumentImage = false;
        this.exportSignatureImage = false;
        this.exportFaceImage = false;
        this.detectGlare = false;
        this.allowBlurFilter = false;
        this.anonymizeNetherlandsMrz = false;
        this.anonymizeCardNumber = false;
        this.anonymizeIban = false;
        this.anonymizeCvv = false;
        this.anonymizeOwner = false;
        this.listeners = [];
        this.scanFrameQueue = [];
        this.endpoint = '';
        this.API = new microblinkApi_service_1.default();
    }
    /**
     * Terminate all active requests (pending responses)
     */
    Microblink.prototype.TerminateActiveRequests = function () {
        this.API.TerminateAll();
        // Clear scan frame queue if it is not empty
        this.scanFrameQueue = [];
    };
    /**
     * Register global success and/or error listener(s)
     */
    Microblink.prototype.RegisterListener = function (scanListener) {
        this.listeners.push(scanListener);
    };
    /**
     * Scan file and get result from subscribed observable
     */
    Microblink.prototype.ScanFile = function (scanInputFile, uploadProgress) {
        return this.scan(scanInputFile.blob, true);
    };
    /**
     * Push file to SCAN queue, global listener(s) will handle the result
     */
    Microblink.prototype.SendFile = function (scanInputFile, uploadProgress) {
        // Call observable with empty callback because global listener will handle result
        // NOTE: error callback should be defined to handle Uncaught exception
        // tslint:disable-next-line:no-empty
        this.scan(scanInputFile.blob, true, uploadProgress).subscribe(function () {
            /** */
        }, function () {
            /** */
        });
    };
    /**
     * Push video frame to SCAN queue, global listener(s) will handle the result
     */
    Microblink.prototype.SendFrame = function (scanInputFrame) {
        // Get frame quality estimatior
        var frameQuality = frameHelper_1.FrameHelper.getFrameQuality(scanInputFrame.pixelData);
        // Add the frame with quality to the scan queue
        this.scanFrameQueue.push({ frame: scanInputFrame, quality: frameQuality });
        // Skip finding of best frame if queue is not full with enough number of frames
        if (this.scanFrameQueue.length < Microblink.fromHowManyFramesQualityCalculateBestFrame) {
            return;
        }
        // Find video frame with best quality
        var bestQuality = 0;
        var bestFrame;
        this.scanFrameQueue.forEach(function (scanFrame) {
            if (scanFrame.quality > bestQuality) {
                bestQuality = scanFrame.quality;
                bestFrame = scanFrame.frame;
            }
        });
        // Clear scan frame queue
        this.scanFrameQueue = [];
        if (bestFrame !== undefined) {
            // Call observable with empty callback because global listener will handle result
            // NOTE: error callback should be defined to handle Uncaught exception
            // tslint:disable-next-line:no-empty
            this.scan(bestFrame.blob, false).subscribe(function () {
                /** */
            }, function () {
                /** */
            });
        }
    };
    /**
     * Set recognizers which will be used in next SCAN(s)
     */
    Microblink.prototype.SetRecognizers = function (recognizers) {
        this.recognizers = recognizers;
        var event = new CustomEvent('recognizersUpdated', {
            detail: { recognizers: this.recognizers },
            cancelable: true,
            bubbles: true
        });
        document.dispatchEvent(event);
    };
    /**
     * Get defined recognizers
     */
    Microblink.prototype.GetRecognizers = function () {
        return this.recognizers;
    };
    /**
     * Set authorization header value to authorize with https://api.microblink.com/recognize
     */
    Microblink.prototype.SetAuthorization = function (authorizationHeader) {
        this.authorizationHeader = authorizationHeader;
        this.API.SetAuthorization(authorizationHeader);
    };
    /**
     * Get defined authorization header
     */
    Microblink.prototype.GetAuthorization = function () {
        return this.authorizationHeader;
    };
    /**
     * Change which images to export for next request
     * @param exportImages is either a boolean flag which describes whether API should return extracted images in next response or an array of API properties
     */
    Microblink.prototype.SetExportImages = function (exportImages) {
        this.exportImages = exportImages;
        this.API.SetExportImages(exportImages);
    };
    /**
     * Change which images to export for next request
     * @param exportFullDocumentImage is a boolean flag which describes whether API should return extracted full document image in next response
     */
    Microblink.prototype.SetExportFullDocumentImage = function (exportFullDocumentImage) {
        this.exportFullDocumentImage = exportFullDocumentImage;
        this.API.SetExportFullDocumentImage(exportFullDocumentImage);
    };
    /**
     * Change which images to export for next request
     * @param exportSignatureImage is a boolean flag which describes whether API should return extracted signature image in next response
     */
    Microblink.prototype.SetExportSignatureImage = function (exportSignatureImage) {
        this.exportSignatureImage = exportSignatureImage;
        this.API.SetExportSignatureImage(exportSignatureImage);
    };
    /**
     * Change which images to export for next request
     * @param exportFaceImage is a boolean flag which describes whether API should return extracted face image in next response
     */
    Microblink.prototype.SetExportFaceImage = function (exportFaceImage) {
        this.exportFaceImage = exportFaceImage;
        this.API.SetExportFaceImage(exportFaceImage);
    };
    /**
     * Set detect glare option for next request
     * @param detectGlare is a boolean flag which describes whether API should return null for image segments where glare is detected
     */
    Microblink.prototype.SetDetectGlare = function (detectGlare) {
        this.detectGlare = detectGlare;
        this.API.SetDetectGlare(detectGlare);
    };
    /**
     * Set allow blur filter option for next request
     * @param allowBlurFilter is a boolean flag which describes whether API should return null for image segments where blur is detected
     */
    Microblink.prototype.SetAllowBlurFilter = function (allowBlurFilter) {
        this.allowBlurFilter = allowBlurFilter;
        this.API.SetAllowBlurFilter(allowBlurFilter);
    };
    /**
     * Set endpoint for next SCAN(s)
     * Default value is https://api.microblink.com/recognize
     * Endpoint should be changed when backend proxy which is credentials keeper is using as proxy between
     * Microblink SaaS API and frontend application which uses this library.
     */
    Microblink.prototype.SetEndpoint = function (endpoint) {
        this.endpoint = endpoint;
        this.API.SetEndpoint(endpoint);
    };
    /**
     * Set anonymize card number (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCardNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the card number anonymized
     */
    Microblink.prototype.SetAnonymizeCardNumber = function (anonymizeCardNumber) {
        this.anonymizeCardNumber = anonymizeCardNumber;
        this.API.SetAnonymizeCardNumber(anonymizeCardNumber);
    };
    /**
     * Set anonymize IBAN (works on BLINK_CARD recognizer) for next request
     * @param anonymizeIbanNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the IBAN number anonymized
     */
    Microblink.prototype.SetAnonymizeIban = function (anonymizeIban) {
        this.anonymizeIban = anonymizeIban;
        this.API.SetAnonymizeIban(anonymizeIban);
    };
    /**
     * Set anonymize cvv (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCvv is a boolean flag which describes whether API should return a base64 image of the scanned card with the cvv number anonymized
     */
    Microblink.prototype.SetAnonymizeCvv = function (anonymizeCvv) {
        this.anonymizeCvv = anonymizeCvv;
        this.API.SetAnonymizeCvv(anonymizeCvv);
    };
    /**
     * Set anonymize owner (works on BLINK_CARD recognizer) for next request
     * @param anonymizeOwner is a boolean flag which describes whether API should return a base64 image of the scanned card with the owner name anonymized
     */
    Microblink.prototype.SetAnonymizeOwner = function (anonymizeOwner) {
        this.anonymizeOwner = anonymizeOwner;
        this.API.SetAnonymizeOwner(anonymizeOwner);
    };
    /**
     * Set user identificator which will be stored with uploaded image
     * @param userId is any string which unique identifies user who use SDK and upload any image to API
     */
    Microblink.prototype.SetUserId = function (userId) {
        this.API.SetUserId(userId);
    };
    /**
     * When Authorization is not set it is available to disable persiting of uploaded data, by default it is enabled
     * this should be disabled for every page where GDPR is not implemented and this is ability to disable data persisting
     * on some demo pages
     * @param isEnabled is flag which describes should or should not API persist uploaded data, be default it is enabled
     */
    Microblink.prototype.SetIsDataPersistingEnabled = function (isEnabled) {
        this.API.SetIsDataPersistingEnabled(isEnabled);
    };
    /**
     * Set anonymize netherlandsMrz (works on BLINK_CARD recognizer) for next request
     * @param anonymizeNetherlandsMrz is a boolean flag which describes whether API should return a base64 image of the scanned card with the netherlands MRZ anonymized
     */
    Microblink.prototype.SetAnonymizeNetherlandsMrz = function (anonymizeNetherlandsMrz) {
        this.anonymizeNetherlandsMrz = anonymizeNetherlandsMrz;
        this.API.SetAnonymizeNetherlandsMrz(anonymizeNetherlandsMrz);
    };
    /**
     * Check is all requirement for desktop-to-mobile feature are available
     */
    Microblink.prototype.IsDesktopToMobileAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.isDesktopToMobileAvailable()];
            });
        });
    };
    /**
     * Check if any recognizer is set in the recognizers array
     */
    Microblink.prototype.IsRecognizerArraySet = function () {
        if (this.recognizers) {
            if (this.recognizers.constructor === Array) {
                if (this.recognizers.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * Create object for exchange data for scan between devices
     * @param data is object with optional data which will be added to the ScanExchanger object
     */
    Microblink.prototype.CreateScanExchanger = function (data, onChange) {
        return __awaiter(this, void 0, void 0, function () {
            var secretKey, scanAsPromise, scan, unsubscribe;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Get recognizers, authorizationHeader, images to export, and glare detection option from remote request
                        data.recognizers = this.recognizers;
                        data.authorizationHeader = this.authorizationHeader; // it is encrypted
                        data.exportImages = this.exportImages;
                        data.exportFullDocumentImage = this.exportFullDocumentImage;
                        data.exportSignatureImage = this.exportSignatureImage;
                        data.exportFaceImage = this.exportFaceImage;
                        data.detectGlare = this.detectGlare;
                        data.allowBlurFilter = this.allowBlurFilter;
                        data.anonymizeCardNumber = this.anonymizeCardNumber;
                        data.anonymizeIban = this.anonymizeIban;
                        data.anonymizeCvv = this.anonymizeCvv;
                        data.anonymizeOwner = this.anonymizeOwner;
                        data.endpoint = this.endpoint;
                        data.anonymizeNetherlandsMrz = this.anonymizeNetherlandsMrz;
                        secretKey = cryptoHelper_1.CryptoHelper.randomString(32);
                        // Key should be part of object during creating shortUrl, Firebase Function will read key, generate link
                        // and delete key set in plain string
                        data.key = secretKey;
                        // Encrypt authorizationHeader
                        data.authorizationHeader = cryptoHelper_1.CryptoHelper.encrypt(data.authorizationHeader, secretKey);
                        scanAsPromise = scanExchangeHelper_1.ScanExchangeHelper.createScanExchanger(data);
                        return [4 /*yield*/, scanAsPromise
                            // Listen for data from Firestore
                        ];
                    case 1:
                        scan = _a.sent();
                        unsubscribe = scan.onSnapshot(function (scanDoc) { return __awaiter(_this, void 0, void 0, function () {
                            var scanDocData, qrCodeAsBase64, scanResultDec, resultUrl, response, blob, text;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        scanDocData = scanDoc.data();
                                        if (!(scanDocData.status === microblink_types_1.ScanExchangerCodes.Step02_ExchangeLinkIsGenerated &&
                                            scanDocData.shortLink)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, scanExchangeHelper_1.ScanExchangeHelper.generateQRCode(scanDocData.shortLink)];
                                    case 1:
                                        qrCodeAsBase64 = _a.sent();
                                        scanDocData.qrCodeAsBase64 = qrCodeAsBase64;
                                        _a.label = 2;
                                    case 2:
                                        if (!(scanDocData.status === microblink_types_1.ScanExchangerCodes.Step07_ResultIsAvailable &&
                                            (scanDocData.result || scanDocData.resultUrl))) return [3 /*break*/, 8];
                                        scanResultDec = void 0;
                                        if (!scanDocData.result) return [3 /*break*/, 3];
                                        scanResultDec = cryptoHelper_1.CryptoHelper.decrypt(scanDocData.result, secretKey);
                                        return [3 /*break*/, 7];
                                    case 3:
                                        if (!scanDocData.resultUrl) return [3 /*break*/, 7];
                                        resultUrl = cryptoHelper_1.CryptoHelper.decrypt(scanDocData.resultUrl, secretKey);
                                        return [4 /*yield*/, fetch(resultUrl)];
                                    case 4:
                                        response = _a.sent();
                                        return [4 /*yield*/, response.blob()];
                                    case 5:
                                        blob = _a.sent();
                                        return [4 /*yield*/, blob_util_1.blobToBase64String(blob)];
                                    case 6:
                                        text = _a.sent();
                                        scanDocData.result = text;
                                        scanResultDec = cryptoHelper_1.CryptoHelper.decrypt(text, secretKey);
                                        firebase
                                            .storage()
                                            .refFromURL(resultUrl)
                                            .delete();
                                        _a.label = 7;
                                    case 7:
                                        // Notify success listeners
                                        this.notifyOnSuccessListeners({ result: scanResultDec, sourceBlob: null }, true);
                                        // After successfully read 'result', remove it from the Firestore
                                        scan.update({
                                            result: null,
                                            resultUrl: null
                                        });
                                        _a.label = 8;
                                    case 8:
                                        // Error handling
                                        if (scanDocData.status === microblink_types_1.ScanExchangerCodes.ErrorHappened && scanDocData.error) {
                                            // Notify error listeners
                                            this.notifyOnErrorListeners(scanDocData.error);
                                        }
                                        // Send onUpdate callback
                                        onChange(scanDocData);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // Return scan object subscription to enable external unsubscribe
                        return [2 /*return*/, unsubscribe];
                }
            });
        });
    };
    Microblink.prototype.isDesktopToMobileAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Try to fetch any document
                        return [4 /*yield*/, firebase
                                .app()
                                .firestore()
                                .doc('scans/any-document')
                                .get()];
                    case 1:
                        // Try to fetch any document
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        // Only if Firestore is not available then desktop-to-mobile is not available
                        if (err_1.name === 'FirebaseError' && err_1.code === 'unavailable') {
                            /*
                            console.error(
                              'Microblink.SDK: feature desktop-to-mobile is not available because connection to the Firebase.Firestore is not available!'
                            )
                            */
                            return [2 /*return*/, false];
                        }
                        else {
                            // console.log('IsDesktopToMobileAvailable.error', err)
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Notify all global listeners when success scan is complete
     */
    Microblink.prototype.notifyOnSuccessListeners = function (scanOutput, isFileScan) {
        var data = scanOutput.result.data;
        var isSuccessfulResponse = false;
        // check if it is fetched data array of results
        if (Array.isArray(data)) {
            data.forEach(function (resultItem) {
                if (resultItem.result) {
                    isSuccessfulResponse = true;
                }
            });
        }
        else {
            // otherwise it is returned result as object
            var result = data.result;
            if (result) {
                isSuccessfulResponse = true;
            }
        }
        // when success response is received then terminate active requests and return results
        if (isSuccessfulResponse || isFileScan) {
            // Active requests can only exists if it is video frame scan
            if (!isFileScan) {
                this.TerminateActiveRequests();
            }
            this.listeners.forEach(function (listener) {
                if (listener.onScanSuccess) {
                    listener.onScanSuccess(scanOutput);
                }
            });
        }
    };
    /**
     * Notify all global listeners when error happens, HTTP response status code is not equal to 200 or
     * base64 encode failed
     */
    Microblink.prototype.notifyOnErrorListeners = function (err) {
        this.TerminateActiveRequests();
        // Make silent if JSON is not prasable because this error will happen when request is aborted
        if (err.code === microblink_types_1.StatusCodes.ResultIsNotValidJSON) {
            return;
        }
        this.listeners.forEach(function (listener) {
            if (listener.onScanError) {
                listener.onScanError(err);
            }
        });
    };
    /**
     * Execute scan on Microblink API service
     */
    Microblink.prototype.scan = function (blob, isFileScan, uploadProgress) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            blob_util_1.blobToBase64String(blob)
                .then(function (blobAsBase64String) {
                _this.API.Recognize(_this.recognizers, blobAsBase64String, uploadProgress).subscribe(function (result) {
                    var output = { sourceBlob: blob, result: result };
                    _this.notifyOnSuccessListeners(output, isFileScan);
                    observer.next(output);
                    observer.complete();
                }, function (err) {
                    if (err) {
                        _this.notifyOnErrorListeners(err);
                        observer.error(err);
                    }
                });
            })
                .catch(function (err) {
                _this.notifyOnErrorListeners(err);
                observer.error(err);
            });
        });
    };
    Microblink.fromHowManyFramesQualityCalculateBestFrame = 5;
    return Microblink;
}());
exports.default = Microblink;
//# sourceMappingURL=microblink.js.map