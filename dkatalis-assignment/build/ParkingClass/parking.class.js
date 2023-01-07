"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Parking_instances, _Parking_updateNearestEmptyParkingSlot, _Parking_minifyCarNumber, _Parking_updateStatePostParking, _Parking_updateStateDataPostUnparking;
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../Utils/constants");
class Parking {
    constructor(numberOfSlots) {
        _Parking_instances.add(this);
        this.parkingSlots = [];
        for (let i = 0; i < numberOfSlots; i++) {
            this.parkingSlots.push(null);
        }
        this.nearestEmptySlot = 0;
        this.engagedParkingCounter = 0;
        this.carNumberAndParkSlotMap = {};
    }
    parkCar(carNumber) {
        if (this.engagedParkingCounter < this.parkingSlots.length) {
            const allocatedParkingSlot = this.nearestEmptySlot;
            this.parkingSlots[allocatedParkingSlot] = carNumber;
            __classPrivateFieldGet(this, _Parking_instances, "m", _Parking_updateStatePostParking).call(this, carNumber, allocatedParkingSlot);
            return { status: true, slotNumber: allocatedParkingSlot + 1 };
        }
        return { status: false, error: constants_1.ERROR_CODES.PARKING_FULL };
    }
    removeCar(carNumber) {
        const minifiedCarNumber = __classPrivateFieldGet(this, _Parking_instances, "m", _Parking_minifyCarNumber).call(this, carNumber);
        const parkingSlotNumber = this.carNumberAndParkSlotMap[minifiedCarNumber];
        if (parkingSlotNumber > -1) {
            this.parkingSlots[parkingSlotNumber] = null;
            __classPrivateFieldGet(this, _Parking_instances, "m", _Parking_updateStateDataPostUnparking).call(this, minifiedCarNumber, parkingSlotNumber);
            return { status: true, slotNumber: parkingSlotNumber };
        }
        return { status: false, error: constants_1.ERROR_CODES.CAR_NOT_FOUND_IN_PARKING, slotNumber: parkingSlotNumber + 1 };
    }
    getStatus() {
        const status = this.parkingSlots.map((carNumber, index) => {
            return `${index + 1}.   ${carNumber || 'EMPTY'}`;
        });
        return status;
    }
    getParkingSlots() {
        return this.parkingSlots;
    }
}
_Parking_instances = new WeakSet(), _Parking_updateNearestEmptyParkingSlot = function _Parking_updateNearestEmptyParkingSlot() {
    let i = this.nearestEmptySlot + 1;
    while (i < this.parkingSlots.length) {
        if (!this.parkingSlots[i]) {
            this.nearestEmptySlot = i;
            break;
        }
        i = i + 1;
    }
}, _Parking_minifyCarNumber = function _Parking_minifyCarNumber(carNumber) {
    return carNumber.replace("-", "");
}, _Parking_updateStatePostParking = function _Parking_updateStatePostParking(carNumber, allocatedParkingSlot) {
    const minifiedCarNumber = __classPrivateFieldGet(this, _Parking_instances, "m", _Parking_minifyCarNumber).call(this, carNumber);
    this.carNumberAndParkSlotMap[minifiedCarNumber] = allocatedParkingSlot;
    this.engagedParkingCounter = this.engagedParkingCounter + 1;
    __classPrivateFieldGet(this, _Parking_instances, "m", _Parking_updateNearestEmptyParkingSlot).call(this);
}, _Parking_updateStateDataPostUnparking = function _Parking_updateStateDataPostUnparking(minifiedCarNumber, parkingSlotNumber) {
    this.engagedParkingCounter = this.engagedParkingCounter - 1;
    delete this.carNumberAndParkSlotMap[minifiedCarNumber];
    if (this.nearestEmptySlot > parkingSlotNumber) {
        this.nearestEmptySlot = parkingSlotNumber;
    }
};
exports.default = Parking;
