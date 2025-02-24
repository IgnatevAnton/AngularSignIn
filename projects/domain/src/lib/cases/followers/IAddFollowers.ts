import { IFollowerUser } from "../../interface/IFollowerUser";

export interface IAddFollowers {
    addFollowers(group:string, follower: IFollowerUser): void;
}
