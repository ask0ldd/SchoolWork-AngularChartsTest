import { ISingleEventStats } from "./singleEventState";

export interface ICountryJOStats {
    id: number,
    country: string,
    participations : ISingleEventStats[],
}