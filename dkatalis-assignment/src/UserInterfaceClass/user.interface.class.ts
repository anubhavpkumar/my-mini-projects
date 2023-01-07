import fs from 'fs';
import Parking from '../ParkingClass/parking.class';
import { ERROR_CODES } from '../Utils/constants';
import path from 'path';
import Pricing from '../PricingClass/pricing.class';

class UserInterface {
    //@ts-ignore
    parkingObj: Parking;

    getFunctionFromCommand(command: string) {
        switch(command) {
            case 'create':
                return (args: Array<number>) => {
                    const numberOfParkingSlots = args[0];
                    this.parkingObj = new Parking(numberOfParkingSlots);
                    return `Created parking lot with ${numberOfParkingSlots} slots`;
                }
            case 'park':
                return (args: Array<string>) => {
                    const carNumber = args[0];
                    const response = this.parkingObj.parkCar(carNumber);
                    const { status, slotNumber, error } = response;
                    if (status) {
                        return `Allocated slot number: ${slotNumber}`;
                    }
                    if (error === ERROR_CODES.PARKING_FULL) {
                        return `Sorry, parking lot is full`;
                    }
                    return `Unknown Error occured`;
                }
            case 'leave':
                return (args: Array<string>) => {
                    const carNumber = args[0];
                    const timeSpentInParking = args[1];
                    const parkingCharges = Pricing.getPriceByTime(parseInt(timeSpentInParking));
                    const response = this.parkingObj.removeCar(carNumber);
                    const { status, slotNumber, error } = response;
                    if (status) {
                        return `Registration Number ${carNumber} from Slot ${(slotNumber || 0) + 1} has left with Charge ${parkingCharges}`;
                    }
                    return `Registration Number ${carNumber} not found`;
                }
            case 'status': 
                return () => {
                    const statusResp = this.parkingObj.getStatus();
                    console.log('Slot No. Registration No.');
                    statusResp.forEach(status => {
                        console.log(status)
                    })
                }
            case 'default':
                return null;
        }
    }

    run(): void {    
        const data = fs.readFileSync(`${__dirname}/../input.txt`, {encoding:'utf8', flag:'r'});
        data.split('\n').forEach(line => {
            const [command, ...args] = line.split(" ");
            const functionToExecute = this.getFunctionFromCommand(command);
            if (functionToExecute){
                //@ts-ignore
                const output = functionToExecute(args);
                if (output) {
                    console.log(output);
                }
            } else {
                console.log('Invalid OP code: ', command);
            }
        });
    }
}

export default UserInterface;
