"use strict";
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
var microblink_1 = require("./microblink");
var microblink_SDK_types_1 = require("./microblink.SDK.types");
var cryptoHelper_1 = require("./cryptoHelper");
/**
 * Helper for detecting ScanInputFrame type
 */
function IsScanInputFrame(scanInput) {
    return !!scanInput.pixelData;
}
/**
 * NOTE: This is public SDK API, rename of this functions will produce backward incompatible API!
 */
var SDK;
(function (SDK_1) {
    var SDK = new microblink_1.default();
    /**
     * Scan image and get result from subscribed observable
     */
    function ScanImage(scanInput, uploadProgress) {
        return SDK.ScanFile(scanInput, uploadProgress);
    }
    SDK_1.ScanImage = ScanImage;
    /**
     * Register global listener success and/or error callback
     */
    function RegisterListener(scanListener) {
        SDK.RegisterListener(scanListener);
    }
    SDK_1.RegisterListener = RegisterListener;
    /**
     * Push image (file or video frame) to scanning queue, results will be handled by global listener(s)
     */
    function SendImage(scanInput, uploadProgress) {
        if (IsScanInputFrame(scanInput)) {
            return SDK.SendFrame(scanInput);
        }
        else {
            return SDK.SendFile(scanInput, uploadProgress);
        }
    }
    SDK_1.SendImage = SendImage;
    /**
     * Set recognizers which will be used in next request
     */
    function SetRecognizers(recognizers) {
        SDK.SetRecognizers(recognizers);
    }
    SDK_1.SetRecognizers = SetRecognizers;
    /**
     * Get recognizers which are defined in the SDK
     */
    // export function GetRecognizers(): string | string[] {
    //   return SDK.GetRecognizers()
    // }
    /**
     * Set authorization header which will be used in next request
     * @param authorizationHeader is authorization header with apiKey and apiSecret which should be generated
     * here: https://microblink.com/customer/api
     */
    function SetAuthorization(authorizationHeader) {
        SDK.SetAuthorization(authorizationHeader);
    }
    SDK_1.SetAuthorization = SetAuthorization;
    /**
     * Get authorization header which is defined in the SDK
     */
    // export function GetAuthorization(): string {
    //   return SDK.GetAuthorization()
    // }
    /**
     * Change which images to export for next request
     * @param exportImages is either a boolean flag which describes whether API should return extracted images in next response or an array of API properties
     */
    function SetExportImages(exportImages) {
        SDK.SetExportImages(exportImages);
    }
    SDK_1.SetExportImages = SetExportImages;
    /**
     * Change which images to export for next request
     * @param exportFullDocumentImage is a boolean flag which describes whether API should return extracted full document image in next response
     */
    function SetExportFullDocumentImage(exportFullDocumentImage) {
        SDK.SetExportFullDocumentImage(exportFullDocumentImage);
    }
    SDK_1.SetExportFullDocumentImage = SetExportFullDocumentImage;
    /**
     * Change which images to export for next request
     * @param exportSignatureImage is a boolean flag which describes whether API should return extracted signature image in next response
     */
    function SetExportSignatureImage(exportSignatureImage) {
        SDK.SetExportSignatureImage(exportSignatureImage);
    }
    SDK_1.SetExportSignatureImage = SetExportSignatureImage;
    /**
     * Change which images to export for next request
     * @param exportFaceImage is a boolean flag which describes whether API should return extracted face image in next response
     */
    function SetExportFaceImage(exportFaceImage) {
        SDK.SetExportFaceImage(exportFaceImage);
    }
    SDK_1.SetExportFaceImage = SetExportFaceImage;
    /**
     * Set detect glare option for next request
     * @param detectGlare is a boolean flag which describes whether API should return null for image segments where glare is detected
     */
    function SetDetectGlare(detectGlare) {
        SDK.SetDetectGlare(detectGlare);
    }
    SDK_1.SetDetectGlare = SetDetectGlare;
    /**
     * Set allow blur filter option for next request
     * @param allowBlurFilter is a boolean flag which describes whether API should return null for image segments where blur is detected
     */
    function SetAllowBlurFilter(allowBlurFilter) {
        SDK.SetAllowBlurFilter(allowBlurFilter);
    }
    SDK_1.SetAllowBlurFilter = SetAllowBlurFilter;
    /**
     * Set HTTP API endpoint for next request
     */
    function SetEndpoint(endpoint) {
        SDK.SetEndpoint(endpoint);
    }
    SDK_1.SetEndpoint = SetEndpoint;
    /**
     * Set anonymize card number (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCardNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the card number anonymized
     */
    function SetAnonymizeCardNumber(anonymizeCardNumber) {
        SDK.SetAnonymizeCardNumber(anonymizeCardNumber);
    }
    SDK_1.SetAnonymizeCardNumber = SetAnonymizeCardNumber;
    /**
     * Set anonymize IBAN (works on BLINK_CARD recognizer) for next request
     * @param anonymizeIbanNumber is a boolean flag which describes whether API should return a base64 image of the scanned card with the card number anonymized
     */
    function SetAnonymizeIban(anonymizeIban) {
        SDK.SetAnonymizeIban(anonymizeIban);
    }
    SDK_1.SetAnonymizeIban = SetAnonymizeIban;
    /**
     * Set anonymize cvv (works on BLINK_CARD recognizer) for next request
     * @param anonymizeCvv is a boolean flag which describes whether API should return a base64 image of the scanned card with the cvv number anonymized
     */
    function SetAnonymizeCvv(anonymizeCvv) {
        SDK.SetAnonymizeCvv(anonymizeCvv);
    }
    SDK_1.SetAnonymizeCvv = SetAnonymizeCvv;
    /**
     * Set anonymize owner (works on BLINK_CARD recognizer) for next request
     * @param anonymizeOwner is a boolean flag which describes whether API should return a base64 image of the scanned card with the owner name anonymized
     */
    function SetAnonymizeOwner(anonymizeOwner) {
        SDK.SetAnonymizeOwner(anonymizeOwner);
    }
    SDK_1.SetAnonymizeOwner = SetAnonymizeOwner;
    /**
     * Set anonymize netherlandsMrz (works on BLINK_CARD recognizer) for next request
     * @param anonymizeNetherlandsMrz is a boolean flag which describes whether API should return a base64 image of the scanned card with the netherlands MRZ anonymized
     */
    function SetAnonymizeNetherlandsMrz(anonymizeNetherlandsMrz) {
        SDK.SetAnonymizeNetherlandsMrz(anonymizeNetherlandsMrz);
    }
    SDK_1.SetAnonymizeNetherlandsMrz = SetAnonymizeNetherlandsMrz;
    /**
     * Terminate all queued HTTP requests.
     * This is useful when images are sending from camera video stream in ms time periods and when successful
     * result is received then all pending requests could be terminated, this should be primary used for application
     * performance improvements, to break all HTTP connections which will return redundant results
     */
    function TerminateRequest() {
        SDK.TerminateActiveRequests();
    }
    SDK_1.TerminateRequest = TerminateRequest;
    /**
     * Set unique user ID which will be stored with uploaded image to associate image with user who uploaded the image
     * @param userId is string user identificator, recommended it to be an user's email because when delete request is sent by this email, all images associated with this email will be permanentally removed if it is stored on upload, not every image will be stored, this depends on other API key options
     */
    function SetUserId(userId) {
        SDK.SetUserId(userId);
    }
    SDK_1.SetUserId = SetUserId;
    /**
     * When Authorization is not set it is available to disable persiting of uploaded data, by default it is enabled
     * this should be disabled for every page where GDPR is not implemented and this is ability to disable data persisting
     * on some demo pages
     * @param isEnabled is flag which describes should or should not API persist uploaded data, be default it is enabled
     */
    function SetIsDataPersistingEnabled(isEnabled) {
        SDK.SetIsDataPersistingEnabled(isEnabled);
    }
    SDK_1.SetIsDataPersistingEnabled = SetIsDataPersistingEnabled;
    /**
     * Get all SDK status codes
     */
    SDK_1.StatusCodes = microblink_SDK_types_1.StatusCodes;
    /**
     * Create object to exchange data between devices
     * @param data is object with ScanExchanger structure
     */
    function CreateScanExchanger(data, onUpdate) {
        if (data === void 0) { data = {}; }
        return SDK.CreateScanExchanger(data, onUpdate);
    }
    SDK_1.CreateScanExchanger = CreateScanExchanger;
    /**
     * Get all Scan exchanger status codes
     */
    SDK_1.ScanExchangerCodes = microblink_SDK_types_1.ScanExchangerCodes;
    /**
     * Get all export image types
     */
    SDK_1.ExportImageTypes = microblink_SDK_types_1.ExportImageTypes;
    /**
     * Decrypt protected object
     * @param dataEncrypted is encrypted object as string
     * @param key is secret key with which data will be decrypted
     */
    function Decrypt(dataEncrypted, key) {
        return cryptoHelper_1.CryptoHelper.decrypt(dataEncrypted, key);
    }
    SDK_1.Decrypt = Decrypt;
    /**
     * Protect plain object
     * @param data is plain object
     * @param key us secret key with which data will be encrypted
     */
    function Encrypt(data, key) {
        return cryptoHelper_1.CryptoHelper.encrypt(data, key);
    }
    SDK_1.Encrypt = Encrypt;
    /**
     * Check if all requirements for desktop-to-mobile feature are available
     */
    function IsDesktopToMobileAvailable() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, SDK.IsDesktopToMobileAvailable()];
            });
        });
    }
    SDK_1.IsDesktopToMobileAvailable = IsDesktopToMobileAvailable;
    /**
     * Check if any recognizer is set in the recognizers array
     */
    function IsRecognizerArraySet() {
        return SDK.IsRecognizerArraySet();
    }
    SDK_1.IsRecognizerArraySet = IsRecognizerArraySet;
})(SDK = exports.SDK || (exports.SDK = {}));
//# sourceMappingURL=microblink.SDK.js.map