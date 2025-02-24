import { IFollowerUser } from "../../interface/IFollowerUser";

export interface IRemoveFollowers {
    removeFollowers(group:string, follower: IFollowerUser): void;
}
