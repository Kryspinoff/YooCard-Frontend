import {UserResponseData} from "./UserResponseData";

export type TileType = "CLASSIC" | "HEADER" | "CONTACT"

interface TileData {
    id: string;
    type: TileType;
    title: string;
    url: string;
    position: number;
    iconUrl: string;
    shortId: string;
    userId: string;
}

export interface UserProfileData extends UserResponseData {
    tiles: TileData[];
}