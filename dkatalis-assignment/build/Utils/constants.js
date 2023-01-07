"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_DETAILS = exports.ERROR_CODES = void 0;
var ERROR_CODES;
(function (ERROR_CODES) {
    ERROR_CODES[ERROR_CODES["PARKING_FULL"] = 0] = "PARKING_FULL";
    ERROR_CODES[ERROR_CODES["CAR_NOT_FOUND_IN_PARKING"] = 1] = "CAR_NOT_FOUND_IN_PARKING";
})(ERROR_CODES = exports.ERROR_CODES || (exports.ERROR_CODES = {}));
exports.PRICING_DETAILS = {
    MINIMUM_HOURS: 2,
    PRICE_IN_MINIMUM_HOUR: 10,
    PRICE_PER_HOUR: 10
};
