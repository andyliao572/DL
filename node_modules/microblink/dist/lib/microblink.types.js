"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Library status codes
 */
var StatusCodes;
(function (StatusCodes) {
    StatusCodes["Ok"] = "OK";
    StatusCodes["ResultIsNotValidJSON"] = "RESULT_IS_NOT_VALID_JSON";
    StatusCodes["TimedOut"] = "CONNECTION_TIMED_OUT";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
/**
 * API boolean properties for extracting document images from document
 */
var ExportImageTypes;
(function (ExportImageTypes) {
    ExportImageTypes["Face"] = "exportFaceImage";
    ExportImageTypes["FullDocument"] = "exportFullDocumentImage";
    ExportImageTypes["Signature"] = "exportSignatureImage";
})(ExportImageTypes = exports.ExportImageTypes || (exports.ExportImageTypes = {}));
var ScanExchangerCodes;
(function (ScanExchangerCodes) {
    ScanExchangerCodes["Step01_RemoteCameraIsRequested"] = "STEP_1_REMOTE_CAMERA_IS_REQUESTED";
    ScanExchangerCodes["Step02_ExchangeLinkIsGenerated"] = "STEP_2_EXCHANGE_LINK_IS_GENERATED";
    ScanExchangerCodes["Step03_RemoteCameraIsPending"] = "STEP_3_REMOTE_CAMERA_IS_PENDING";
    ScanExchangerCodes["Step04_RemoteCameraIsOpen"] = "STEP_4_REMOTE_CAMERA_IS_OPEN";
    ScanExchangerCodes["Step05_ImageIsUploading"] = "STEP_5_IMAGE_IS_UPLOADING";
    ScanExchangerCodes["Step06_ImageIsProcessing"] = "STEP_6_IMAGE_IS_PROCESSING";
    ScanExchangerCodes["Step07_ResultIsAvailable"] = "STEP_7_RESULT_IS_AVAILABLE";
    ScanExchangerCodes["ErrorHappened"] = "ERROR_HAPPENED";
})(ScanExchangerCodes = exports.ScanExchangerCodes || (exports.ScanExchangerCodes = {}));
//# sourceMappingURL=microblink.types.js.map