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
var microblink_types_1 = require("./microblink.types");
var FIRESTORE_COLLECTION_ID = 'scans';
// This should be in try/catch block because firebase could not be configured
// this is helper only for optional feature "Desktop to mobile"
try {
    // NOTE: avoid use of shortcut `firestore` instead of `firebase.firestore()` beacause this produce error in
    // Codepen and jsFiddle environment!
    // const settings = { timestampsInSnapshots: true } // deprecated, new firebase version released
    firebase.firestore().settings({});
}
catch (e) {
    /* tslint:disable:no-empty */
}
var ScanExchangeHelper = /** @class */ (function () {
    function ScanExchangeHelper() {
    }
    /**
     * Create Firestore object for scan data exchanging
     * @param data is optional object with data which will be added to the created Firestore object
     */
    ScanExchangeHelper.createScanExchanger = function (data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var scan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scan = firebase
                            .firestore()
                            .collection(FIRESTORE_COLLECTION_ID)
                            .doc();
                        // Define default status STEP_01...
                        data.status = microblink_types_1.ScanExchangerCodes.Step01_RemoteCameraIsRequested;
                        // For easier scanId fetching append it to the document
                        data.scanId = scan.id;
                        // Wait until data is set
                        return [4 /*yield*/, scan.set(data)
                            // Return promise
                        ];
                    case 1:
                        // Wait until data is set
                        _a.sent();
                        // Return promise
                        return [2 /*return*/, scan];
                }
            });
        });
    };
    /**
     * Generate QR code as base64 image for specific URL
     * @param url is string
     */
    ScanExchangeHelper.generateQRCode = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var qrCodeAsBase64, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qrCodeAsBase64 = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, QRCode.toDataURL(url, {
                                errorCorrectionLevel: 'H',
                                type: 'image/png',
                                width: 1024,
                                margin: 4
                            })];
                    case 2:
                        qrCodeAsBase64 = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, qrCodeAsBase64];
                }
            });
        });
    };
    return ScanExchangeHelper;
}());
exports.ScanExchangeHelper = ScanExchangeHelper;
//# sourceMappingURL=scanExchangeHelper.js.map