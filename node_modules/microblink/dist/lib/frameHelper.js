"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper for get detailed information from the frame of the image as RAW pixels array, with defined width and height
 */
var FrameHelper = /** @class */ (function () {
    function FrameHelper() {
    }
    /**
     * Get frame quality
     * @param pixelData is ImageData from `canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height)`
     */
    FrameHelper.getFrameQuality = function (pixelData) {
        return this.calculateFrameQuality(pixelData.data, pixelData.width, pixelData.height);
    };
    /**
     * Calculate frame quality
     * @param rgbaImgData is an RGB array (3n)=>RED, (3n+1)=>GREEN, (3n+2)=>BLUE, where n is pixel index in 2D grid
     * @param width is the frame horizontal dimension in pixels
     * @param height is the frame vertical dimension in pixels
     */
    FrameHelper.calculateFrameQuality = function (rgbaImgData, width, height) {
        var vertScanLineNum = 28;
        var horizScanLineNum = 20;
        var totalStrength = 0;
        var sampleNum = 0;
        for (var i = 0; i < vertScanLineNum; i++) {
            var distance = parseInt((width / (vertScanLineNum + 1)).toString(), 10);
            var col = parseInt((distance * i + distance / 2).toString(), 10);
            for (var row = 1; row < height - 1; row++) {
                var curPixel = this.getIntensity(rgbaImgData, row, col, width);
                var prevPixel = this.getIntensity(rgbaImgData, row - 1, col, width);
                var nextPixel = this.getIntensity(rgbaImgData, row + 1, col, width);
                var lastDiff = prevPixel - curPixel;
                var currDiff = curPixel - nextPixel;
                var secondDiff = currDiff - lastDiff;
                sampleNum += 1;
                totalStrength += secondDiff * secondDiff;
            }
        }
        for (var i = 0; i < horizScanLineNum; i++) {
            var distance = parseInt((height / (horizScanLineNum + 1)).toString(), 10);
            var row = parseInt((distance * i + distance / 2).toString(), 10);
            for (var col = 1; col < width - 1; col++) {
                var curPixel = this.getIntensity(rgbaImgData, row, col, width);
                var prevPixel = this.getIntensity(rgbaImgData, row, col - 1, width);
                var nextPixel = this.getIntensity(rgbaImgData, row, col + 1, width);
                var lastDiff = prevPixel - curPixel;
                var currDiff = curPixel - nextPixel;
                var secondDiff = currDiff - lastDiff;
                sampleNum += 1;
                totalStrength += secondDiff * secondDiff;
            }
        }
        var res = totalStrength / sampleNum;
        var qratio = parseFloat((width * height).toString()) / (640.0 * 480.0);
        if (qratio > 1.0) {
            if (qratio > 10.0)
                qratio = 10.0;
            res /= qratio;
        }
        else {
            res *= qratio;
        }
        return res;
    };
    /**
     * Get pixel intensity
     * @param rgbaImgData is an RGB array (3n)=>RED, (3n+1)=>GREEN, (3n+2)=>BLUE, where n is pixel index in 2D grid
     * @param row is an row of the pixel in the frame
     * @param col is na column of the pixel in the frame
     * @param width is the frame horizontal dimension in pixels
     */
    FrameHelper.getIntensity = function (rgbaImgData, row, col, width) {
        var baseIdx = (row * width + col) * 4;
        var r = rgbaImgData[baseIdx];
        var g = rgbaImgData[baseIdx + 1];
        var b = rgbaImgData[baseIdx + 2];
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    return FrameHelper;
}());
exports.FrameHelper = FrameHelper;
//# sourceMappingURL=frameHelper.js.map