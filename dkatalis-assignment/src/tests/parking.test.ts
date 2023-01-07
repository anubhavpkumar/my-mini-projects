import Parking from '../ParkingClass/parking.class';

describe('Test Parking Class', () => {
    const parking = new Parking(5);
    test('Initialize Car Parking Class', () => {
        expect(parking).toBeDefined();
    });
    test('Add Car to Parking', () => {
        const response = parking.parkCar('MH04-AW-2304');
        expect(response.status).toBe(true);
        expect(response.slotNumber).toBe(1);
    });
    test('Check if car added Properly', () => {
        const response = parking.getParkingSlots();
        expect(response[0]).toEqual('MH04-AW-2304');
    });
    test('Add Second Car to Parking', () => {
        const response = parking.parkCar('MH04-AW-2306');
        expect(response.status).toBe(true);
        expect(response.slotNumber).toBe(2);
    });
    test('Remove car', () => {
        const response = parking.removeCar('MH04-AW-2304');
        expect(response.status).toEqual(true);
    });
    test('Check if car removed Properly', () => {
        const response = parking.getParkingSlots();
        expect(response[0]).toEqual(null);
    });
    test('Add Second Car to Parking', () => {
        const response = parking.parkCar('MH04-AW-2310');
        expect(response.status).toBe(true);
        expect(response.slotNumber).toBe(1);
    });
    test('Add Third Car to Parking', () => {
        const response = parking.parkCar('MH04-AW-2310');
        expect(response.status).toBe(true);
        expect(response.slotNumber).toBe(3);
    });
    
})