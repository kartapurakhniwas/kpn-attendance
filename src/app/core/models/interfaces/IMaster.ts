// Interface for Country
interface ICountry {
  countryId: number;
  countryName: string;
  countryCode: string;
  numCode: number | null;
  niceName: string | null;
  phoneCode: string | null;
  countryDescription: string;
  utcCreatedAt: string;
  createdBy: number;
  utcModifiedAt: string;
  modifiedBy: number;
}

// Interface for State With Country
interface IStateByCountry {
    stateId: number,
    stateName: string,
    stateCode: string,
    stateDescription: string,
    countryId: number,
    utcCreatedAt: Date,
    createdBy: number,
    utcModifiedAt: Date,
    modifiedBy: number
}

// Interface for RateZone
interface IRateZone {
  rateZoneId: number;
  rateCode: string;
  zoneName: string;
  description: string;
  isActive: boolean;
}

// Interface for TimeZone
interface ITimeZone {
  timeZoneId: number;
  timeZoneCode: string;
  timeZoneName: string;
  standardOffsetMinutes: number;
  observeDaylightSaving: boolean;
}

// Interface for AddressType
interface IAddressType {
  addressTypeId: number;
  addressTypeGuid: string;
  addressTypeName: string;
  addressTypeDescription: string | null;
  utcCreatedAt: string;
  createdBy: number;
  utcModifiedAt: string;
  modifiedBy: number;
}

// Interface for Gender
interface IGender {
  genderId: number;
  genderName: string;
}

// Interface for EmailType
interface IEmailType {
  emailTypeId: number;
  emailTypeName: string;
  emailTypeDescription: string;
}

// Interface for CustomerContactType
interface ICustomerContactType {
  customerContactTypeId: number;
  customerContactTypeGuid: string;
  contactType: string;
  contactTypeDescription: string | null;
  utcCreatedAt: string;
  createdBy: number;
  utcModifiedAt: string;
  modifiedBy: number;
}

// Interface for TruckType (potential incompleteness in JSON data)
interface ITruckType {
  truckTypeId: number;
  truckTypeName: string;
  truckTypeDescription: string;
  truckTypeIconPath: string;
}

// Interface for TruckMake (potential incompleteness in JSON data)
interface ITruckMake {
  truckMakeId: number;
  makeName: string;
  truckMakeIconPath: string;
  truckMakeDescription: string;
}

