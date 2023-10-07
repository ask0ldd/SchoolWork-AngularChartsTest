export interface ICountryJOStats {
    id: number,
    country: string,
    participations : IEventStats[],
}

export interface IEventStats {
  id : number,
  year : number,
  city : string,
  medalsCount : number,
  athleteCount : number,
}