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
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
    UserToJSONTyped,
} from './User';

/**
 * 
 * @export
 * @interface Listing
 */
export interface Listing {
    /**
     * 
     * @type {string}
     * @memberof Listing
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Listing
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Listing
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof Listing
     */
    price?: number;
    /**
     * 
     * @type {string}
     * @memberof Listing
     */
    location?: string;
    /**
     * 
     * @type {number}
     * @memberof Listing
     */
    surface?: number;
    /**
     * 
     * @type {number}
     * @memberof Listing
     */
    rooms?: number;
    /**
     * 
     * @type {User}
     * @memberof Listing
     */
    owner?: User;
    /**
     * 
     * @type {Date}
     * @memberof Listing
     */
    createdAt?: Date;
}

/**
 * Check if a given object implements the Listing interface.
 */
export function instanceOfListing(value: object): value is Listing {
    return true;
}

export function ListingFromJSON(json: any): Listing {
    return ListingFromJSONTyped(json, false);
}

export function ListingFromJSONTyped(json: any, ignoreDiscriminator: boolean): Listing {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'price': json['price'] == null ? undefined : json['price'],
        'location': json['location'] == null ? undefined : json['location'],
        'surface': json['surface'] == null ? undefined : json['surface'],
        'rooms': json['rooms'] == null ? undefined : json['rooms'],
        'owner': json['owner'] == null ? undefined : UserFromJSON(json['owner']),
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
    };
}

export function ListingToJSON(json: any): Listing {
    return ListingToJSONTyped(json, false);
}

export function ListingToJSONTyped(value?: Listing | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'description': value['description'],
        'price': value['price'],
        'location': value['location'],
        'surface': value['surface'],
        'rooms': value['rooms'],
        'owner': UserToJSON(value['owner']),
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
    };
}

