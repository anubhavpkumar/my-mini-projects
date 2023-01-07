import { ERROR_CODES } from "../Utils/constants";

type ReturnType = {
    status: boolean,
    error?: ERROR_CODES,
    slotNumber? :number;
};

class Parking {
    parkingSlots: Array<string | null>;

    nearestEmptySlot: number;
    carNumberAndParkSlotMap: {[key: string]: number};
    engagedParkingCounter: number;

    constructor(numberOfSlots: number) {
        this.parkingSlots = [];
        for (let i = 0; i < numberOfSlots; i++) {
            this.parkingSlots.push(null);
        }
        this.nearestEmptySlot = 0;
        this.engagedParkingCounter = 0;
        this.carNumberAndParkSlotMap = {};
    }

    #updateNearestEmptyParkingSlot(): void {
        let i: number = this.nearestEmptySlot + 1;
        while(i< this.parkingSlots.length) {
            if (!this.parkingSlots[i]) {
                this.nearestEmptySlot = i;
                break;
            }
            i = i + 1;
        }
    }

    #minifyCarNumber(carNumber: string): string {
        return carNumber.replace("-", "")
    }

    #updateStatePostParking(carNumber: string, allocatedParkingSlot: number): void {
        const minifiedCarNumber = this.#minifyCarNumber(carNumber);
        this.carNumberAndParkSlotMap[minifiedCarNumber] = allocatedParkingSlot;
        this.engagedParkingCounter = this.engagedParkingCounter + 1;
        this.#updateNearestEmptyParkingSlot();
    }

    #updateStateDataPostUnparking(minifiedCarNumber: string, parkingSlotNumber: number): void {
        this.engagedParkingCounter = this.engagedParkingCounter - 1;
        delete this.carNumberAndParkSlotMap[minifiedCarNumber];
        if (this.nearestEmptySlot > parkingSlotNumber){
            this.nearestEmptySlot = parkingSlotNumber;
        }
    }

    parkCar(carNumber: string): ReturnType {
        if (this.engagedParkingCounter < this.parkingSlots.length) {
            const allocatedParkingSlot = this.nearestEmptySlot;
            this.parkingSlots[allocatedParkingSlot] = carNumber;
            this.#updateStatePostParking(carNumber, allocatedParkingSlot);
            return { status: true, slotNumber: allocatedParkingSlot + 1 };
        }
        return { status: false, error: ERROR_CODES.PARKING_FULL }
    }

    removeCar(carNumber: string): ReturnType {
        const minifiedCarNumber = this.#minifyCarNumber(carNumber);
        const parkingSlotNumber = this.carNumberAndParkSlotMap[minifiedCarNumber];
        if (parkingSlotNumber > -1) {
            this.parkingSlots[parkingSlotNumber] = null;
            this.#updateStateDataPostUnparking(minifiedCarNumber, parkingSlotNumber);
            return { status: true, slotNumber: parkingSlotNumber };
        }
        return { status: false, error: ERROR_CODES.CAR_NOT_FOUND_IN_PARKING, slotNumber: parkingSlotNumber + 1 }
    }

    getStatus(): Array<string> {
        const status = this.parkingSlots.map((carNumber, index) => {
            return `${index + 1}.   ${carNumber || 'EMPTY'}`;
        })
        return status;
    }

    getParkingSlots(): Array<string | null> {
        return this.parkingSlots;
    }
    
}

export default Parking;
