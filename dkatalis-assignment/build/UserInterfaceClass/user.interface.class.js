"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parking_class_1 = __importDefault(require("../ParkingClass/parking.class"));
const constants_1 = require("../Utils/constants");
const pricing_class_1 = __importDefault(require("../PricingClass/pricing.class"));
class UserInterface {
    getFunctionFromCommand(command) {
        switch (command) {
            case 'create':
                return (args) => {
                    const numberOfParkingSlots = args[0];
                    this.parkingObj = new parking_class_1.default(numberOfParkingSlots);
                    return `Created parking lot with ${numberOfParkingSlots} slots`;
                };
            case 'park':
                return (args) => {
                    const carNumber = args[0];
                    const response = this.parkingObj.parkCar(carNumber);
                    const { status, slotNumber, error } = response;
                    if (status) {
                        return `Allocated slot number: ${slotNumber}`;
                    }
                    if (error === constants_1.ERROR_CODES.PARKING_FULL) {
                        return `Sorry, parking lot is full`;
                    }
                    return `Unknown Error occured`;
                };
            case 'leave':
                return (args) => {
                    const carNumber = args[0];
                    const timeSpentInParking = args[1];
                    const parkingCharges = pricing_class_1.default.getPriceByTime(parseInt(timeSpentInParking));
                    const response = this.parkingObj.removeCar(carNumber);
                    const { status, slotNumber, error } = response;
                    if (status) {
                        return `Registration Number ${carNumber} from Slot ${(slotNumber || 0) + 1} has left with Charge ${parkingCharges}`;
                    }
                    return `Registration Number ${carNumber} not found`;
                };
            case 'status':
                return () => {
                    const statusResp = this.parkingObj.getStatus();
                    console.log('Slot No. Registration No.');
                    statusResp.forEach(status => {
                        console.log(status);
                    });
                };
            case 'default':
                return null;
        }
    }
    run() {
        const data = fs_1.default.readFileSync(`${__dirname}/../input.txt`, { encoding: 'utf8', flag: 'r' });
        data.split('\n').forEach(line => {
            const [command, ...args] = line.split(" ");
            const functionToExecute = this.getFunctionFromCommand(command);
            if (functionToExecute) {
                //@ts-ignore
                const output = functionToExecute(args);
                if (output) {
                    console.log(output);
                }
            }
            else {
                console.log('Invalid OP code: ', command);
            }
        });
    }
}
exports.default = UserInterface;
