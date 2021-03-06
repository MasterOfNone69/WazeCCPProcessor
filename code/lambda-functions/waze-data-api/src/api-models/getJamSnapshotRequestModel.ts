import { StandardListRequest } from "./StandardListRequest";
import { APIGatewayProxyEvent } from "aws-lambda";
import moment = require('moment');
import { customHttpError } from "../utils/customError";
import { deserializeFloat, deserializeInteger, deserializeBoolean, deserializeIntegerArray } from "../utils/serializationHelpers";
import { IJamRequestModel } from "./IJamRequestModel";

export class getJamSnapshotRequestModel extends StandardListRequest<object> implements IJamRequestModel{
    
    // required-ish, we'll set defaults if not passed
    date: string;
    time: string;

    //required
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;

    //optional
    levels?: number[];
    roadTypes?: number[];
    streetName?: string;
    delayMin?: number;
    delayMax?: number;
    speedMin?: number;
    speedMax?: number;
    lengthMin?: number;
    lengthMax?: number;
    includeCoordinates?: boolean;

    // setup private vars that we'll set as we deserialize
    private snapshotDateTime: Date;

    getSnapshotDateTime(){
        return this.snapshotDateTime;
    }
    
    deserialize(input: APIGatewayProxyEvent) {

        //make sure we got some parameters
        if(input.queryStringParameters == null){
            return; 
        }

        //if we didn't get a date, set one for today
        if(!input.queryStringParameters["date"]){
            this.date = moment().format('YYYY-MM-DD');
        }
        else{
            this.date = input.queryStringParameters["date"];
        }

        //do the same for time
        if(!input.queryStringParameters["time"]){
            this.time = moment().format('HH:mm');
        }
        else{
            this.time = input.queryStringParameters["time"];
        }

        //now try to parse date and time into a date object
        let parsedDateTime = moment(this.date + ' ' + this.time, 'YYYY-MM-DD HH:mm');
        if(!parsedDateTime.isValid()){
            this.deserializationErrors.push("The passed date and time values could not be deserialized into a valid datetime")
        }
        else{
            this.snapshotDateTime = parsedDateTime.toDate();
        }
        
        //for the numbers, if we have them but can't parse them, log an error
        deserializeFloat(input.queryStringParameters, 'minLat', 'minLat', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'maxLat', 'maxLat', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'minLon', 'minLon', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'maxLon', 'maxLon', this, this.deserializationErrors);

        //for levels and roadTypes we actually have to turn them into arrays
        deserializeIntegerArray(input.queryStringParameters, 'levels', 'levels', this, this.deserializationErrors);
        deserializeIntegerArray(input.queryStringParameters, 'roadTypes', 'roadTypes', this, this.deserializationErrors);

        deserializeFloat(input.queryStringParameters, 'delayMin', 'delayMin', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'delayMax', 'delayMax', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'speedMin', 'speedMin', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'speedMax', 'speedMax', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'lengthMin', 'lengthMin', this, this.deserializationErrors);
        deserializeFloat(input.queryStringParameters, 'lengthMax', 'lengthMax', this, this.deserializationErrors);

        deserializeBoolean(input.queryStringParameters, 'coordinates', 'includeCoordinates', this, this.deserializationErrors);
        //if we got nothing for coords, we'll default to false, abusing the fact that undefined/null are falsey
        this.includeCoordinates = this.includeCoordinates ? this.includeCoordinates : false;

        //deserialize the base options as well
        super.deserializeBase(input);
        
        //if there were deserialization errors we need to throw an http error
        if(this.deserializationErrors.length > 0){
            throw new customHttpError(400, "Bad Request: There were problems deserializing the request parameters.", this.deserializationErrors);
        }
    }

    validate(): void {
        
        //validate the base options
        super.validateBase();

        //check that all of the required fields exist
        if(!this.minLat){
            this.validationErrors.push("The field 'minLat' is required");
        }

        if(!this.maxLat){
            this.validationErrors.push("The field 'maxLat' is required");
        }

        if(!this.minLon){
            this.validationErrors.push("The field 'minLon' is required");
        }

        if(!this.maxLon){
            this.validationErrors.push("The field 'maxLon' is required");
        }
        
        //if there were validation errors we need to throw an http error
        if(this.validationErrors.length > 0){
            throw new customHttpError(400, "Bad Request: The request parameters contained invalid values.", this.validationErrors);
        }
    }

    
}