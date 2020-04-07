"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_ts_1 = require("crypto-ts");
var CryptoHelper = /** @class */ (function () {
    function CryptoHelper() {
    }
    CryptoHelper.encrypt = function (data, secretKey) {
        var originalText = JSON.stringify(data);
        var cipherText = crypto_ts_1.AES.encrypt(originalText, secretKey).toString();
        return cipherText;
    };
    CryptoHelper.decrypt = function (cipherText, secretKey) {
        var bytes = crypto_ts_1.AES.decrypt(cipherText, secretKey);
        var originalText = bytes.toString(crypto_ts_1.enc.Utf8);
        var data = JSON.parse(originalText);
        return data;
    };
    CryptoHelper.randomString = function (stringLength) {
        if (!stringLength) {
            stringLength = 128;
        }
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        var randomString = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum, rnum + 1);
        }
        return randomString;
    };
    return CryptoHelper;
}());
exports.CryptoHelper = CryptoHelper;
//# sourceMappingURL=cryptoHelper.js.map