"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/internal/Observable");
var microblink_types_1 = require("./microblink.types");
var DEFAULT_ENDPOINT = 'https://api.microblink.com';
/**
 * HTTP layer with Microblink API
 */
var MicroblinkApi = /** @class */ (function () {
    function MicroblinkApi() {
        this.authorizationHeader = '';
        this.exportImages = false;
        this.exportFullDocumentImage = false;
        this.exportSignatureImage = false;
        this.exportFaceImage = false;
        this.detectGlare = false;
        this.anonymizeCardNumber = false;
        this.anonymizeIban = false;
        this.anonymizeCvv = false;
        this.anonymizeOwner = false;
        this.allowBlurFilter = false;
        this.anonymizeNetherlandsMrz = false;
        this.activeRequests = [];
        this.userId = '';
        this.isDataPersistingEnabled = true;
        this.endpoint = DEFAULT_ENDPOINT;
    }
    /**
     * Terminate request session with aborting all pending responses
     */
    MicroblinkApi.prototype.TerminateAll = function () {
        this.activeRequests.forEach(function (activeRequest) {
            activeRequest.abort();
        });
        // Clear array of all active requests when every request is terminated (aborted)
        this.activeRequests = [];
    };
    /**
     * Change authorization header value
     */
    MicroblinkApi.prototype.SetAuthorization = function (authorizationHeader) {
        this.authorizationHeader = authorizationHeader;
    };
    /**
     * Change which images to export for next request
     * @param exportImages is either a boolean flag which describes whether API should return extracted images in next response or an array of API properties
     */
    MicroblinkApi.prototype.SetExportImages = function (exportImages) {
        this.exportImages = exportImages;
    };
    /**
     * Change which images to export for next request
     * @param exportFullDocumentImage is a boolean flag which describes whether API should return extracted full document image in next response
     */
    MicroblinkApi.prototype.SetExportFullDocumentImage = function (exportFullDocumentImage) {
        this.exportFullDocumentImage = exportFullDocumentImage;
    };
    /**
     * Change which images to export for next request
     * @param exportSignatureImage is a boolean flag which describes whether API should return extracted signature image in next response
     */
    MicroblinkApi.prototype.SetExportSignatureImage = function (exportSignatureImage) {
        this.exportSignatureImage = exportSignatureImage;
    };
    /**
     * Change which images to export for next request
     * @param exportFaceImage is a boolean flag which describes whether API should return extracted face image in next response
     */
    MicroblinkApi.prototype.SetExportFaceImage = function (exportFaceImage) {
        this.exportFaceImage = exportFaceImage;
    };
    /**
     * Set detect glare option for next request
     * @param detectGlare is a boolean flag which describes whether API should return null for image segments where glare is detected
     */
    MicroblinkApi.prototype.SetDetectGlare = function (detectGlare) {
        this.detectGlare = detectGlare;
    };
    /**
     * Set allow blur filter option for next request
     * @param allowBlurFilter is a boolean flag which describes whether API should return null for image segments where blur is detected
     */
    MicroblinkApi.prototype.SetAllowBlurFilter = function (allowBlurFilter) {
        this.allowBlurFilter = allowBlurFilter;
    };
    /**
     * Change API endpoint
     * @param endpoint is API endpoint where Microblink API or Microblink API proxy is available
     */
    MicroblinkApi.prototype.SetEndpoint = function (endpoint) {
        this.endpoint = endpoint;
    };
    /**
     * Set anonymize card number (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCardNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the card number anonymized
     */
    MicroblinkApi.prototype.SetAnonymizeCardNumber = function (anonymizeCardNumber) {
        this.anonymizeCardNumber = anonymizeCardNumber;
    };
    /**
     * Set anonymize card number (works on BLINK_CARD recognizer) for next request
     * @param anonymizeIbanNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the card number anonymized
     */
    MicroblinkApi.prototype.SetAnonymizeIban = function (anonymizeIban) {
        this.anonymizeIban = anonymizeIban;
    };
    /**
     * Set anonymize cvv (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCvv is a boolean flag which describes whether API should return a base64 image of the scanned card with the cvv number anonymized
     */
    MicroblinkApi.prototype.SetAnonymizeCvv = function (anonymizeCvv) {
        this.anonymizeCvv = anonymizeCvv;
    };
    /**
     * Set anonymize owner (works on BLINK_CARD recognizer) for next request
     * @param anonymizeOwner is a boolean flag which describes whether API should return a base64 image of the scanned card with the owner name anonymized
     */
    MicroblinkApi.prototype.SetAnonymizeOwner = function (anonymizeOwner) {
        this.anonymizeOwner = anonymizeOwner;
    };
    /**
     * Set user identificator which will be stored with uploaded image
     * @param userId is any string which unique identifies user who use SDK and upload any image to API
     */
    MicroblinkApi.prototype.SetUserId = function (userId) {
        this.userId = userId;
    };
    /**
     * When Authorization is not set it is available to disable persisting of uploaded data, by default it is enabled
     * this should be disabled for every page where GDPR is not implemented and this is ability to disable data persisting
     * on some demo pages
     * @param isEnabled is flag which describes should or should not API persist uploaded data, be default it is enabled
     */
    MicroblinkApi.prototype.SetIsDataPersistingEnabled = function (isEnabled) {
        this.isDataPersistingEnabled = isEnabled;
    };
    /**
     * Set anonymize netherlandsMrz (works on BLINK_CARD recognizer) for next request
     * @param anonymizeNetherlandsMrz is a boolean flag which describes whether API should return a base64 image of the scanned card with the netherlands MRZ anonymized
     */
    MicroblinkApi.prototype.SetAnonymizeNetherlandsMrz = function (anonymizeNetherlandsMrz) {
        this.anonymizeNetherlandsMrz = anonymizeNetherlandsMrz;
    };
    /**
     * Execute remote recognition
     * @param recognizers is string or array of strings on which image will be processed
     * @param imageBase64 is Base64 encoded image which should contain document for processing
     * @param uploadProgress (optional) is XHR event listener for image upload to show upload progress bar on UI
     */
    MicroblinkApi.prototype.Recognize = function (recognizers, imageBase64, uploadProgress) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Image should be as Base64 encoded file
            var body = {
                imageBase64: imageBase64
            };
            // Recognizers could be one defined as string or multiple defined as string array
            if (typeof recognizers === 'string') {
                body['recognizer'] = recognizers;
            }
            else {
                body['recognizers'] = recognizers;
            }
            // Export images flag set if it is enabled
            if (_this.exportImages) {
                body['exportImages'] = _this.exportImages;
            }
            // Export full document image flag set if it is enabled
            if (_this.exportFullDocumentImage) {
                body['exportFullDocumentImage'] = true;
            }
            // Export signature image flag set if it is enabled
            if (_this.exportSignatureImage) {
                body['exportSignatureImage'] = true;
            }
            // Export face image flag set if it is enabled
            if (_this.exportFaceImage) {
                body['exportFaceImage'] = true;
            }
            // Detect glare flag set if it is enabled
            if (_this.detectGlare) {
                body['detectGlare'] = true;
            }
            // Detect blur flag set if it is enabled
            if (_this.allowBlurFilter) {
                body['allowBlurFilter'] = true;
            }
            // Anonymize card number flag set if it is enabled
            if (_this.anonymizeCardNumber) {
                body['anonymizeCardNumber'] = true;
            }
            // Anonymize IBAN number flag set if it is enabled
            if (_this.anonymizeIban) {
                body['anonymizeIban'] = true;
            }
            // Anonymize cvv flag set if it is enabled
            if (_this.anonymizeCvv) {
                body['anonymizeCvv'] = true;
            }
            // Anonymize owner set if it is enabled
            if (_this.anonymizeOwner) {
                body['anonymizeOwner'] = true;
            }
            // Set userId if it is defined
            if (_this.userId) {
                body['userId'] = _this.userId;
            }
            // If it is set to FALSE then set disable data persisting flag
            if (_this.isDataPersistingEnabled === false) {
                body['disableDataPersisting'] = true;
            }
            // If it is set to FALSE then set disable data persisting flag
            if (_this.anonymizeNetherlandsMrz) {
                body['anonymizeNetherlandsMrz'] = true;
            }
            // Body data should be send as stringified JSON and as Content-type=application/json
            var data = JSON.stringify(body);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            if (uploadProgress) {
                // FIX: timeout should not be set, because some client can have really slow uplink
                // set timeout for file uploading
                xhr.timeout = 40000;
            }
            xhr.open('POST', _this.endpoint + '/recognize/execute');
            xhr.setRequestHeader('Content-Type', 'application/json');
            // When Authorization header is not set results will be masked on server-side
            if (_this.isAuthorizationHeaderValid) {
                xhr.setRequestHeader('Authorization', _this.authorizationHeader);
            }
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    var responseBody = null;
                    try {
                        // Return result as parsed JSON object
                        responseBody = JSON.parse(this.responseText);
                        // OCR result will be available ony on status 200 OK, otherwise some problem is with backend or api key
                        if (this.status === 200) {
                            observer.next(responseBody);
                            observer.complete();
                        }
                        else {
                            observer.error(responseBody);
                        }
                    }
                    catch (err) {
                        if (uploadProgress && this.status === 0) {
                            responseBody = {
                                code: microblink_types_1.StatusCodes.TimedOut,
                                message: 'Connection timed out. Please try again.'
                            };
                        }
                        else {
                            responseBody = {
                                error: 'Result is not valid JSON',
                                code: microblink_types_1.StatusCodes.ResultIsNotValidJSON,
                                responseText: this.responseText
                            };
                        }
                        observer.error(responseBody);
                    }
                }
            });
            xhr.onerror = function (error) {
                observer.error(error);
            };
            if (uploadProgress) {
                xhr.upload.addEventListener('progress', uploadProgress, false);
                xhr.upload.addEventListener('load', uploadProgress, false);
            }
            xhr.send(data);
            // append the request to active stack
            _this.activeRequests.push(xhr);
        });
    };
    Object.defineProperty(MicroblinkApi.prototype, "isAuthorizationHeaderValid", {
        /**
         * Authorization header offline validator, just check for Authorization header format before sending it to the API
         */
        get: function () {
            if (this.authorizationHeader.startsWith('Bearer ') ||
                this.authorizationHeader.startsWith('bearer ') ||
                this.authorizationHeader.startsWith('Basic ') ||
                this.authorizationHeader.startsWith('basic ')) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return MicroblinkApi;
}());
exports.default = MicroblinkApi;
//# sourceMappingURL=microblinkApi.service.js.map