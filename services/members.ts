import axiosInstance from "../libs/axios";
import { MemberEntity } from '../entities/roles/MemberEntity';

export function findAllMembers() : Promise<MemberEntity[]> {
    return new Promise((resolve: Function, reject: Function) => {
        axiosInstance.get("api/members")
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
    })
}

export function insertMember(member: MemberEntity) : Promise<MemberEntity> {
    return new Promise((resolve: Function, reject: Function) => {
        axiosInstance.post("api/members", member)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
    })
}