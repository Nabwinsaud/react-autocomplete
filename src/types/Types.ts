export interface ICommon {
  common: string;
  offical?: string;
}
export interface ICountry {
  name: ICommon;
  flags: IFlagType;
}

export interface IFlagType {
  png?: string;
  svg?: string;
}
