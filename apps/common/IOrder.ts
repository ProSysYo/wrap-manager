export interface IOrder {
    id?: number;
    price: string;
    codeCustomer: string;
    numberCustomer: string;
    nameCustomer: string;
    party: string;
    datePlaneShipment: Date;
    manager: string;
    modelPolotno: string;
    modelCorob: string;
    height: number;
    width: number;
    hinge: string;
    baseLock: string;
    padBaseLock: string;
    handle: string
    cylinderBaseLock: string;
    optionalLock: string;
    padOptionalLock: string;
    cylinderOptionalLock: string;
    bolt: string;
    eye: string;
    colorDoor: string;
    typeDecorationOutside: string;
    colorDecorationOutside: string;
    patinaDecorationOutside: string;
    decorationOutside: string;
    typeDecorationInside: string;
    colorDecorationInside: string;
    patinaDecorationInside: string;
    decorationInside: string;
    window: string;
    heightWindow: string;
    widthWindow: string;
    thickWindow: string;
    colorWindow: string;
    colorKovkaWindow: string;
    patinaKovkaWindow: string;
    seal: string;//уплотнитель
    ear: string;
    closer: string;//Доводчик
    forceCloser: string;//Усиление под доводчик
    holeBox: string;//Отверстия в коробе
    typeHinge: string;
    trioHinge: string;
    steelDoorStep: string;//порог из нержавейки    
    backSheet: string;
    frame: string;
    twoDoor: string;//Двустворчатая дверь
    package: string;
    note: string;
    widthTwoDoor: string;
    metalBox: string;
    metalPolotno: string;
    countDoors: number;
    thickPolotno: string;
    thermoCable: string;
    passport: string;
    eccentric: string;
    electromagnet: string;
    illumination: string;
    leftPolka: string;
    rightPolka: string;
    framuga: string;
    soundInsulation: string;
    colorFrame: string;    
}
