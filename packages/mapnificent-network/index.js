/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const mapnificent = $root.mapnificent = (() => {

    /**
     * Namespace mapnificent.
     * @exports mapnificent
     * @namespace
     */
    const mapnificent = {};

    mapnificent.MapnificentNetwork = (function() {

        /**
         * Properties of a MapnificentNetwork.
         * @memberof mapnificent
         * @interface IMapnificentNetwork
         * @property {string|null} [Cityid] MapnificentNetwork Cityid
         * @property {Array.<mapnificent.MapnificentNetwork.IStop>|null} [Stops] MapnificentNetwork Stops
         * @property {Array.<mapnificent.MapnificentNetwork.ILine>|null} [Lines] MapnificentNetwork Lines
         */

        /**
         * Constructs a new MapnificentNetwork.
         * @memberof mapnificent
         * @classdesc Represents a MapnificentNetwork.
         * @implements IMapnificentNetwork
         * @constructor
         * @param {mapnificent.IMapnificentNetwork=} [properties] Properties to set
         */
        function MapnificentNetwork(properties) {
            this.Stops = [];
            this.Lines = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MapnificentNetwork Cityid.
         * @member {string} Cityid
         * @memberof mapnificent.MapnificentNetwork
         * @instance
         */
        MapnificentNetwork.prototype.Cityid = "";

        /**
         * MapnificentNetwork Stops.
         * @member {Array.<mapnificent.MapnificentNetwork.IStop>} Stops
         * @memberof mapnificent.MapnificentNetwork
         * @instance
         */
        MapnificentNetwork.prototype.Stops = $util.emptyArray;

        /**
         * MapnificentNetwork Lines.
         * @member {Array.<mapnificent.MapnificentNetwork.ILine>} Lines
         * @memberof mapnificent.MapnificentNetwork
         * @instance
         */
        MapnificentNetwork.prototype.Lines = $util.emptyArray;

        /**
         * Decodes a MapnificentNetwork message from the specified reader or buffer.
         * @function decode
         * @memberof mapnificent.MapnificentNetwork
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mapnificent.MapnificentNetwork} MapnificentNetwork
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MapnificentNetwork.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.mapnificent.MapnificentNetwork();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Cityid = reader.string();
                    break;
                case 2:
                    if (!(message.Stops && message.Stops.length))
                        message.Stops = [];
                    message.Stops.push($root.mapnificent.MapnificentNetwork.Stop.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.Lines && message.Lines.length))
                        message.Lines = [];
                    message.Lines.push($root.mapnificent.MapnificentNetwork.Line.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MapnificentNetwork message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mapnificent.MapnificentNetwork
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mapnificent.MapnificentNetwork} MapnificentNetwork
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MapnificentNetwork.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MapnificentNetwork message.
         * @function verify
         * @memberof mapnificent.MapnificentNetwork
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MapnificentNetwork.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Cityid != null && message.hasOwnProperty("Cityid"))
                if (!$util.isString(message.Cityid))
                    return "Cityid: string expected";
            if (message.Stops != null && message.hasOwnProperty("Stops")) {
                if (!Array.isArray(message.Stops))
                    return "Stops: array expected";
                for (let i = 0; i < message.Stops.length; ++i) {
                    let error = $root.mapnificent.MapnificentNetwork.Stop.verify(message.Stops[i]);
                    if (error)
                        return "Stops." + error;
                }
            }
            if (message.Lines != null && message.hasOwnProperty("Lines")) {
                if (!Array.isArray(message.Lines))
                    return "Lines: array expected";
                for (let i = 0; i < message.Lines.length; ++i) {
                    let error = $root.mapnificent.MapnificentNetwork.Line.verify(message.Lines[i]);
                    if (error)
                        return "Lines." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MapnificentNetwork message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mapnificent.MapnificentNetwork
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mapnificent.MapnificentNetwork} MapnificentNetwork
         */
        MapnificentNetwork.fromObject = function fromObject(object) {
            if (object instanceof $root.mapnificent.MapnificentNetwork)
                return object;
            let message = new $root.mapnificent.MapnificentNetwork();
            if (object.Cityid != null)
                message.Cityid = String(object.Cityid);
            if (object.Stops) {
                if (!Array.isArray(object.Stops))
                    throw TypeError(".mapnificent.MapnificentNetwork.Stops: array expected");
                message.Stops = [];
                for (let i = 0; i < object.Stops.length; ++i) {
                    if (typeof object.Stops[i] !== "object")
                        throw TypeError(".mapnificent.MapnificentNetwork.Stops: object expected");
                    message.Stops[i] = $root.mapnificent.MapnificentNetwork.Stop.fromObject(object.Stops[i]);
                }
            }
            if (object.Lines) {
                if (!Array.isArray(object.Lines))
                    throw TypeError(".mapnificent.MapnificentNetwork.Lines: array expected");
                message.Lines = [];
                for (let i = 0; i < object.Lines.length; ++i) {
                    if (typeof object.Lines[i] !== "object")
                        throw TypeError(".mapnificent.MapnificentNetwork.Lines: object expected");
                    message.Lines[i] = $root.mapnificent.MapnificentNetwork.Line.fromObject(object.Lines[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MapnificentNetwork message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mapnificent.MapnificentNetwork
         * @static
         * @param {mapnificent.MapnificentNetwork} message MapnificentNetwork
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MapnificentNetwork.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.Stops = [];
                object.Lines = [];
            }
            if (options.defaults)
                object.Cityid = "";
            if (message.Cityid != null && message.hasOwnProperty("Cityid"))
                object.Cityid = message.Cityid;
            if (message.Stops && message.Stops.length) {
                object.Stops = [];
                for (let j = 0; j < message.Stops.length; ++j)
                    object.Stops[j] = $root.mapnificent.MapnificentNetwork.Stop.toObject(message.Stops[j], options);
            }
            if (message.Lines && message.Lines.length) {
                object.Lines = [];
                for (let j = 0; j < message.Lines.length; ++j)
                    object.Lines[j] = $root.mapnificent.MapnificentNetwork.Line.toObject(message.Lines[j], options);
            }
            return object;
        };

        /**
         * Converts this MapnificentNetwork to JSON.
         * @function toJSON
         * @memberof mapnificent.MapnificentNetwork
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MapnificentNetwork.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MapnificentNetwork.Stop = (function() {

            /**
             * Properties of a Stop.
             * @memberof mapnificent.MapnificentNetwork
             * @interface IStop
             * @property {number|null} [Latitude] Stop Latitude
             * @property {number|null} [Longitude] Stop Longitude
             * @property {Array.<mapnificent.MapnificentNetwork.Stop.ITravelOption>|null} [TravelOptions] Stop TravelOptions
             * @property {string|null} [Name] Stop Name
             */

            /**
             * Constructs a new Stop.
             * @memberof mapnificent.MapnificentNetwork
             * @classdesc Represents a Stop.
             * @implements IStop
             * @constructor
             * @param {mapnificent.MapnificentNetwork.IStop=} [properties] Properties to set
             */
            function Stop(properties) {
                this.TravelOptions = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Stop Latitude.
             * @member {number} Latitude
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @instance
             */
            Stop.prototype.Latitude = 0;

            /**
             * Stop Longitude.
             * @member {number} Longitude
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @instance
             */
            Stop.prototype.Longitude = 0;

            /**
             * Stop TravelOptions.
             * @member {Array.<mapnificent.MapnificentNetwork.Stop.ITravelOption>} TravelOptions
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @instance
             */
            Stop.prototype.TravelOptions = $util.emptyArray;

            /**
             * Stop Name.
             * @member {string} Name
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @instance
             */
            Stop.prototype.Name = "";

            /**
             * Decodes a Stop message from the specified reader or buffer.
             * @function decode
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {mapnificent.MapnificentNetwork.Stop} Stop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Stop.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.mapnificent.MapnificentNetwork.Stop();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.Latitude = reader.double();
                        break;
                    case 2:
                        message.Longitude = reader.double();
                        break;
                    case 3:
                        if (!(message.TravelOptions && message.TravelOptions.length))
                            message.TravelOptions = [];
                        message.TravelOptions.push($root.mapnificent.MapnificentNetwork.Stop.TravelOption.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.Name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Stop message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {mapnificent.MapnificentNetwork.Stop} Stop
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Stop.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Stop message.
             * @function verify
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Stop.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.Latitude != null && message.hasOwnProperty("Latitude"))
                    if (typeof message.Latitude !== "number")
                        return "Latitude: number expected";
                if (message.Longitude != null && message.hasOwnProperty("Longitude"))
                    if (typeof message.Longitude !== "number")
                        return "Longitude: number expected";
                if (message.TravelOptions != null && message.hasOwnProperty("TravelOptions")) {
                    if (!Array.isArray(message.TravelOptions))
                        return "TravelOptions: array expected";
                    for (let i = 0; i < message.TravelOptions.length; ++i) {
                        let error = $root.mapnificent.MapnificentNetwork.Stop.TravelOption.verify(message.TravelOptions[i]);
                        if (error)
                            return "TravelOptions." + error;
                    }
                }
                if (message.Name != null && message.hasOwnProperty("Name"))
                    if (!$util.isString(message.Name))
                        return "Name: string expected";
                return null;
            };

            /**
             * Creates a Stop message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {mapnificent.MapnificentNetwork.Stop} Stop
             */
            Stop.fromObject = function fromObject(object) {
                if (object instanceof $root.mapnificent.MapnificentNetwork.Stop)
                    return object;
                let message = new $root.mapnificent.MapnificentNetwork.Stop();
                if (object.Latitude != null)
                    message.Latitude = Number(object.Latitude);
                if (object.Longitude != null)
                    message.Longitude = Number(object.Longitude);
                if (object.TravelOptions) {
                    if (!Array.isArray(object.TravelOptions))
                        throw TypeError(".mapnificent.MapnificentNetwork.Stop.TravelOptions: array expected");
                    message.TravelOptions = [];
                    for (let i = 0; i < object.TravelOptions.length; ++i) {
                        if (typeof object.TravelOptions[i] !== "object")
                            throw TypeError(".mapnificent.MapnificentNetwork.Stop.TravelOptions: object expected");
                        message.TravelOptions[i] = $root.mapnificent.MapnificentNetwork.Stop.TravelOption.fromObject(object.TravelOptions[i]);
                    }
                }
                if (object.Name != null)
                    message.Name = String(object.Name);
                return message;
            };

            /**
             * Creates a plain object from a Stop message. Also converts values to other types if specified.
             * @function toObject
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @static
             * @param {mapnificent.MapnificentNetwork.Stop} message Stop
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Stop.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.TravelOptions = [];
                if (options.defaults) {
                    object.Latitude = 0;
                    object.Longitude = 0;
                    object.Name = "";
                }
                if (message.Latitude != null && message.hasOwnProperty("Latitude"))
                    object.Latitude = options.json && !isFinite(message.Latitude) ? String(message.Latitude) : message.Latitude;
                if (message.Longitude != null && message.hasOwnProperty("Longitude"))
                    object.Longitude = options.json && !isFinite(message.Longitude) ? String(message.Longitude) : message.Longitude;
                if (message.TravelOptions && message.TravelOptions.length) {
                    object.TravelOptions = [];
                    for (let j = 0; j < message.TravelOptions.length; ++j)
                        object.TravelOptions[j] = $root.mapnificent.MapnificentNetwork.Stop.TravelOption.toObject(message.TravelOptions[j], options);
                }
                if (message.Name != null && message.hasOwnProperty("Name"))
                    object.Name = message.Name;
                return object;
            };

            /**
             * Converts this Stop to JSON.
             * @function toJSON
             * @memberof mapnificent.MapnificentNetwork.Stop
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Stop.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            Stop.TravelOption = (function() {

                /**
                 * Properties of a TravelOption.
                 * @memberof mapnificent.MapnificentNetwork.Stop
                 * @interface ITravelOption
                 * @property {number|null} [Stop] TravelOption Stop
                 * @property {number|null} [TravelTime] TravelOption TravelTime
                 * @property {number|null} [StayTime] TravelOption StayTime
                 * @property {string|null} [Line] TravelOption Line
                 * @property {number|null} [WalkDistance] TravelOption WalkDistance
                 */

                /**
                 * Constructs a new TravelOption.
                 * @memberof mapnificent.MapnificentNetwork.Stop
                 * @classdesc Represents a TravelOption.
                 * @implements ITravelOption
                 * @constructor
                 * @param {mapnificent.MapnificentNetwork.Stop.ITravelOption=} [properties] Properties to set
                 */
                function TravelOption(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TravelOption Stop.
                 * @member {number} Stop
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 */
                TravelOption.prototype.Stop = 0;

                /**
                 * TravelOption TravelTime.
                 * @member {number} TravelTime
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 */
                TravelOption.prototype.TravelTime = 0;

                /**
                 * TravelOption StayTime.
                 * @member {number} StayTime
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 */
                TravelOption.prototype.StayTime = 0;

                /**
                 * TravelOption Line.
                 * @member {string} Line
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 */
                TravelOption.prototype.Line = "";

                /**
                 * TravelOption WalkDistance.
                 * @member {number} WalkDistance
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 */
                TravelOption.prototype.WalkDistance = 0;

                /**
                 * Decodes a TravelOption message from the specified reader or buffer.
                 * @function decode
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {mapnificent.MapnificentNetwork.Stop.TravelOption} TravelOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TravelOption.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.mapnificent.MapnificentNetwork.Stop.TravelOption();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Stop = reader.uint32();
                            break;
                        case 2:
                            message.TravelTime = reader.uint32();
                            break;
                        case 3:
                            message.StayTime = reader.uint32();
                            break;
                        case 4:
                            message.Line = reader.string();
                            break;
                        case 5:
                            message.WalkDistance = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a TravelOption message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {mapnificent.MapnificentNetwork.Stop.TravelOption} TravelOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TravelOption.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TravelOption message.
                 * @function verify
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TravelOption.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Stop != null && message.hasOwnProperty("Stop"))
                        if (!$util.isInteger(message.Stop))
                            return "Stop: integer expected";
                    if (message.TravelTime != null && message.hasOwnProperty("TravelTime"))
                        if (!$util.isInteger(message.TravelTime))
                            return "TravelTime: integer expected";
                    if (message.StayTime != null && message.hasOwnProperty("StayTime"))
                        if (!$util.isInteger(message.StayTime))
                            return "StayTime: integer expected";
                    if (message.Line != null && message.hasOwnProperty("Line"))
                        if (!$util.isString(message.Line))
                            return "Line: string expected";
                    if (message.WalkDistance != null && message.hasOwnProperty("WalkDistance"))
                        if (!$util.isInteger(message.WalkDistance))
                            return "WalkDistance: integer expected";
                    return null;
                };

                /**
                 * Creates a TravelOption message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {mapnificent.MapnificentNetwork.Stop.TravelOption} TravelOption
                 */
                TravelOption.fromObject = function fromObject(object) {
                    if (object instanceof $root.mapnificent.MapnificentNetwork.Stop.TravelOption)
                        return object;
                    let message = new $root.mapnificent.MapnificentNetwork.Stop.TravelOption();
                    if (object.Stop != null)
                        message.Stop = object.Stop >>> 0;
                    if (object.TravelTime != null)
                        message.TravelTime = object.TravelTime >>> 0;
                    if (object.StayTime != null)
                        message.StayTime = object.StayTime >>> 0;
                    if (object.Line != null)
                        message.Line = String(object.Line);
                    if (object.WalkDistance != null)
                        message.WalkDistance = object.WalkDistance >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a TravelOption message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @static
                 * @param {mapnificent.MapnificentNetwork.Stop.TravelOption} message TravelOption
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TravelOption.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.Stop = 0;
                        object.TravelTime = 0;
                        object.StayTime = 0;
                        object.Line = "";
                        object.WalkDistance = 0;
                    }
                    if (message.Stop != null && message.hasOwnProperty("Stop"))
                        object.Stop = message.Stop;
                    if (message.TravelTime != null && message.hasOwnProperty("TravelTime"))
                        object.TravelTime = message.TravelTime;
                    if (message.StayTime != null && message.hasOwnProperty("StayTime"))
                        object.StayTime = message.StayTime;
                    if (message.Line != null && message.hasOwnProperty("Line"))
                        object.Line = message.Line;
                    if (message.WalkDistance != null && message.hasOwnProperty("WalkDistance"))
                        object.WalkDistance = message.WalkDistance;
                    return object;
                };

                /**
                 * Converts this TravelOption to JSON.
                 * @function toJSON
                 * @memberof mapnificent.MapnificentNetwork.Stop.TravelOption
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TravelOption.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return TravelOption;
            })();

            return Stop;
        })();

        MapnificentNetwork.Line = (function() {

            /**
             * Properties of a Line.
             * @memberof mapnificent.MapnificentNetwork
             * @interface ILine
             * @property {string|null} [LineId] Line LineId
             * @property {Array.<mapnificent.MapnificentNetwork.Line.ILineTime>|null} [LineTimes] Line LineTimes
             * @property {string|null} [Name] Line Name
             */

            /**
             * Constructs a new Line.
             * @memberof mapnificent.MapnificentNetwork
             * @classdesc Represents a Line.
             * @implements ILine
             * @constructor
             * @param {mapnificent.MapnificentNetwork.ILine=} [properties] Properties to set
             */
            function Line(properties) {
                this.LineTimes = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Line LineId.
             * @member {string} LineId
             * @memberof mapnificent.MapnificentNetwork.Line
             * @instance
             */
            Line.prototype.LineId = "";

            /**
             * Line LineTimes.
             * @member {Array.<mapnificent.MapnificentNetwork.Line.ILineTime>} LineTimes
             * @memberof mapnificent.MapnificentNetwork.Line
             * @instance
             */
            Line.prototype.LineTimes = $util.emptyArray;

            /**
             * Line Name.
             * @member {string} Name
             * @memberof mapnificent.MapnificentNetwork.Line
             * @instance
             */
            Line.prototype.Name = "";

            /**
             * Decodes a Line message from the specified reader or buffer.
             * @function decode
             * @memberof mapnificent.MapnificentNetwork.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {mapnificent.MapnificentNetwork.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.mapnificent.MapnificentNetwork.Line();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.LineId = reader.string();
                        break;
                    case 2:
                        if (!(message.LineTimes && message.LineTimes.length))
                            message.LineTimes = [];
                        message.LineTimes.push($root.mapnificent.MapnificentNetwork.Line.LineTime.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.Name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Line message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof mapnificent.MapnificentNetwork.Line
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {mapnificent.MapnificentNetwork.Line} Line
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Line.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Line message.
             * @function verify
             * @memberof mapnificent.MapnificentNetwork.Line
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Line.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.LineId != null && message.hasOwnProperty("LineId"))
                    if (!$util.isString(message.LineId))
                        return "LineId: string expected";
                if (message.LineTimes != null && message.hasOwnProperty("LineTimes")) {
                    if (!Array.isArray(message.LineTimes))
                        return "LineTimes: array expected";
                    for (let i = 0; i < message.LineTimes.length; ++i) {
                        let error = $root.mapnificent.MapnificentNetwork.Line.LineTime.verify(message.LineTimes[i]);
                        if (error)
                            return "LineTimes." + error;
                    }
                }
                if (message.Name != null && message.hasOwnProperty("Name"))
                    if (!$util.isString(message.Name))
                        return "Name: string expected";
                return null;
            };

            /**
             * Creates a Line message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof mapnificent.MapnificentNetwork.Line
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {mapnificent.MapnificentNetwork.Line} Line
             */
            Line.fromObject = function fromObject(object) {
                if (object instanceof $root.mapnificent.MapnificentNetwork.Line)
                    return object;
                let message = new $root.mapnificent.MapnificentNetwork.Line();
                if (object.LineId != null)
                    message.LineId = String(object.LineId);
                if (object.LineTimes) {
                    if (!Array.isArray(object.LineTimes))
                        throw TypeError(".mapnificent.MapnificentNetwork.Line.LineTimes: array expected");
                    message.LineTimes = [];
                    for (let i = 0; i < object.LineTimes.length; ++i) {
                        if (typeof object.LineTimes[i] !== "object")
                            throw TypeError(".mapnificent.MapnificentNetwork.Line.LineTimes: object expected");
                        message.LineTimes[i] = $root.mapnificent.MapnificentNetwork.Line.LineTime.fromObject(object.LineTimes[i]);
                    }
                }
                if (object.Name != null)
                    message.Name = String(object.Name);
                return message;
            };

            /**
             * Creates a plain object from a Line message. Also converts values to other types if specified.
             * @function toObject
             * @memberof mapnificent.MapnificentNetwork.Line
             * @static
             * @param {mapnificent.MapnificentNetwork.Line} message Line
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Line.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.LineTimes = [];
                if (options.defaults) {
                    object.LineId = "";
                    object.Name = "";
                }
                if (message.LineId != null && message.hasOwnProperty("LineId"))
                    object.LineId = message.LineId;
                if (message.LineTimes && message.LineTimes.length) {
                    object.LineTimes = [];
                    for (let j = 0; j < message.LineTimes.length; ++j)
                        object.LineTimes[j] = $root.mapnificent.MapnificentNetwork.Line.LineTime.toObject(message.LineTimes[j], options);
                }
                if (message.Name != null && message.hasOwnProperty("Name"))
                    object.Name = message.Name;
                return object;
            };

            /**
             * Converts this Line to JSON.
             * @function toJSON
             * @memberof mapnificent.MapnificentNetwork.Line
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Line.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            Line.LineTime = (function() {

                /**
                 * Properties of a LineTime.
                 * @memberof mapnificent.MapnificentNetwork.Line
                 * @interface ILineTime
                 * @property {number|null} [Interval] LineTime Interval
                 * @property {number|null} [Start] LineTime Start
                 * @property {number|null} [Stop] LineTime Stop
                 * @property {number|null} [Weekday] LineTime Weekday
                 */

                /**
                 * Constructs a new LineTime.
                 * @memberof mapnificent.MapnificentNetwork.Line
                 * @classdesc Represents a LineTime.
                 * @implements ILineTime
                 * @constructor
                 * @param {mapnificent.MapnificentNetwork.Line.ILineTime=} [properties] Properties to set
                 */
                function LineTime(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * LineTime Interval.
                 * @member {number} Interval
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @instance
                 */
                LineTime.prototype.Interval = 0;

                /**
                 * LineTime Start.
                 * @member {number} Start
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @instance
                 */
                LineTime.prototype.Start = 0;

                /**
                 * LineTime Stop.
                 * @member {number} Stop
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @instance
                 */
                LineTime.prototype.Stop = 0;

                /**
                 * LineTime Weekday.
                 * @member {number} Weekday
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @instance
                 */
                LineTime.prototype.Weekday = 0;

                /**
                 * Decodes a LineTime message from the specified reader or buffer.
                 * @function decode
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {mapnificent.MapnificentNetwork.Line.LineTime} LineTime
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineTime.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.mapnificent.MapnificentNetwork.Line.LineTime();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.Interval = reader.uint32();
                            break;
                        case 2:
                            message.Start = reader.uint32();
                            break;
                        case 3:
                            message.Stop = reader.uint32();
                            break;
                        case 4:
                            message.Weekday = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a LineTime message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {mapnificent.MapnificentNetwork.Line.LineTime} LineTime
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LineTime.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a LineTime message.
                 * @function verify
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                LineTime.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.Interval != null && message.hasOwnProperty("Interval"))
                        if (!$util.isInteger(message.Interval))
                            return "Interval: integer expected";
                    if (message.Start != null && message.hasOwnProperty("Start"))
                        if (!$util.isInteger(message.Start))
                            return "Start: integer expected";
                    if (message.Stop != null && message.hasOwnProperty("Stop"))
                        if (!$util.isInteger(message.Stop))
                            return "Stop: integer expected";
                    if (message.Weekday != null && message.hasOwnProperty("Weekday"))
                        if (!$util.isInteger(message.Weekday))
                            return "Weekday: integer expected";
                    return null;
                };

                /**
                 * Creates a LineTime message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {mapnificent.MapnificentNetwork.Line.LineTime} LineTime
                 */
                LineTime.fromObject = function fromObject(object) {
                    if (object instanceof $root.mapnificent.MapnificentNetwork.Line.LineTime)
                        return object;
                    let message = new $root.mapnificent.MapnificentNetwork.Line.LineTime();
                    if (object.Interval != null)
                        message.Interval = object.Interval >>> 0;
                    if (object.Start != null)
                        message.Start = object.Start >>> 0;
                    if (object.Stop != null)
                        message.Stop = object.Stop >>> 0;
                    if (object.Weekday != null)
                        message.Weekday = object.Weekday >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a LineTime message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @static
                 * @param {mapnificent.MapnificentNetwork.Line.LineTime} message LineTime
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                LineTime.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.Interval = 0;
                        object.Start = 0;
                        object.Stop = 0;
                        object.Weekday = 0;
                    }
                    if (message.Interval != null && message.hasOwnProperty("Interval"))
                        object.Interval = message.Interval;
                    if (message.Start != null && message.hasOwnProperty("Start"))
                        object.Start = message.Start;
                    if (message.Stop != null && message.hasOwnProperty("Stop"))
                        object.Stop = message.Stop;
                    if (message.Weekday != null && message.hasOwnProperty("Weekday"))
                        object.Weekday = message.Weekday;
                    return object;
                };

                /**
                 * Converts this LineTime to JSON.
                 * @function toJSON
                 * @memberof mapnificent.MapnificentNetwork.Line.LineTime
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                LineTime.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return LineTime;
            })();

            return Line;
        })();

        return MapnificentNetwork;
    })();

    return mapnificent;
})();

export { $root as default };
