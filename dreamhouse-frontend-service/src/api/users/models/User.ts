/* tslint:disable */
/* eslint-disable */
/**
 * Authorization server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Role } from './Role';
import {
    RoleFromJSON,
    RoleFromJSONTyped,
    RoleToJSON,
    RoleToJSONTyped,
} from './Role';
import type { UserProfile } from './UserProfile';
import {
    UserProfileFromJSON,
    UserProfileFromJSONTyped,
    UserProfileToJSON,
    UserProfileToJSONTyped,
} from './UserProfile';
import type { Listing } from './Listing';
import {
    ListingFromJSON,
    ListingFromJSONTyped,
    ListingToJSON,
    ListingToJSONTyped,
} from './Listing';

/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email?: string;
    /**
     * 
     * @type {Array<Role>}
     * @memberof User
     */
    roles?: Array<Role>;
    /**
     * 
     * @type {Array<Listing>}
     * @memberof User
     */
    listings?: Array<Listing>;
    /**
     * 
     * @type {UserProfile}
     * @memberof User
     */
    userProfile?: UserProfile;
}

/**
 * Check if a given object implements the User interface.
 */
export function instanceOfUser(value: object): value is User {
    return true;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'username': json['username'] == null ? undefined : json['username'],
        'email': json['email'] == null ? undefined : json['email'],
        'roles': json['roles'] == null ? undefined : ((json['roles'] as Array<any>).map(RoleFromJSON)),
        'listings': json['listings'] == null ? undefined : ((json['listings'] as Array<any>).map(ListingFromJSON)),
        'userProfile': json['userProfile'] == null ? undefined : UserProfileFromJSON(json['userProfile']),
    };
}

export function UserToJSON(json: any): User {
    return UserToJSONTyped(json, false);
}

export function UserToJSONTyped(value?: User | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'username': value['username'],
        'email': value['email'],
        'roles': value['roles'] == null ? undefined : ((value['roles'] as Array<any>).map(RoleToJSON)),
        'listings': value['listings'] == null ? undefined : ((value['listings'] as Array<any>).map(ListingToJSON)),
        'userProfile': UserProfileToJSON(value['userProfile']),
    };
}

