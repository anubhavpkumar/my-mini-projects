import { PRICING_DETAILS } from "../Utils/constants";

class Pricing {
    static getPriceByTime(timeSpentInParking: number): number {
        if (timeSpentInParking < PRICING_DETAILS.MINIMUM_HOURS) {
            return PRICING_DETAILS.PRICE_IN_MINIMUM_HOUR;
        }
        return PRICING_DETAILS.PRICE_IN_MINIMUM_HOUR + ((timeSpentInParking - PRICING_DETAILS.MINIMUM_HOURS) * PRICING_DETAILS.PRICE_PER_HOUR);
    }
}

export default Pricing;