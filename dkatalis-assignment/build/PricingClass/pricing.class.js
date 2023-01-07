"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../Utils/constants");
class Pricing {
    static getPriceByTime(timeSpentInParking) {
        if (timeSpentInParking < constants_1.PRICING_DETAILS.MINIMUM_HOURS) {
            return constants_1.PRICING_DETAILS.PRICE_IN_MINIMUM_HOUR;
        }
        return constants_1.PRICING_DETAILS.PRICE_IN_MINIMUM_HOUR + ((timeSpentInParking - constants_1.PRICING_DETAILS.MINIMUM_HOURS) * constants_1.PRICING_DETAILS.PRICE_PER_HOUR);
    }
}
exports.default = Pricing;
