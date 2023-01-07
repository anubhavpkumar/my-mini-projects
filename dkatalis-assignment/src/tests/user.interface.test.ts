import UserInterface from "../UserInterfaceClass/user.interface.class";

// describe('User Interface testng', () => {
//     const userInterface = new UserInterface();
//     test('Opening file', () => {
//         const response = userInterface.run();
//         expect(response).toBe(undefined);
//     });
// });

const userInterface = new UserInterface();
test('Create Parking lot', () => {
    const statement = `create 10`;
    const [command, ...args] = statement.split(" ");
    const func = userInterface.getFunctionFromCommand(command);
    expect(func).toBeTruthy();
    if (func) {
        //@ts-ignore
        const resp = func(args);
        expect(resp).toBe(`Created parking lot with 10 slots`);
    }
});

test('Add Car park', () => {
    const statementOne = `park KA-01-HH-1234`;
    const [commandOne, ...argsOne] = statementOne.split(" ");
    const funcOne = userInterface.getFunctionFromCommand(commandOne);
    expect(funcOne).toBeTruthy();
    if (funcOne) {
        //@ts-ignore
        const resp = funcOne(argsOne);
        expect(resp).toBe(`Allocated slot number: 1`);
    }
});

test('Add Second Car park', () => {
    const statement = `park KA-01-HH-9999`;
    const [command, ...args] = statement.split(" ");
    const func = userInterface.getFunctionFromCommand(command);
    expect(func).toBeTruthy();
    if (func) {
        //@ts-ignore
        const resp = func(args);
        expect(resp).toBe(`Allocated slot number: 2`);
    }
});

test('Not Found Car', () => {
    const statement = `leave KA-01-HH-3141 4`;
    const [command, ...args] = statement.split(" ");
    const func = userInterface.getFunctionFromCommand(command);
    expect(func).toBeTruthy();
    if (func) {
        //@ts-ignore
        const resp = func(args);
        expect(resp).toBe(`Registration Number KA-01-HH-3141 not found`);
    }
});

test('First Car Out', () => {
    const statement = `leave KA-01-HH-1234 4`;
    const [command, ...args] = statement.split(" ");
    const func = userInterface.getFunctionFromCommand(command);
    expect(func).toBeTruthy();
    if (func) {
        //@ts-ignore
        const resp = func(args);
        expect(resp).toBe(`Registration Number KA-01-HH-1234 from Slot 1 has left with Charge 30`);
    }
});

test('Status', () => {
    const statement = `status`;
    const [command, ...args] = statement.split(" ");
    const func = userInterface.getFunctionFromCommand(command);
    expect(func).toBeTruthy();
    if (func) {
        //@ts-ignore
        const resp = func(args);
    }
})