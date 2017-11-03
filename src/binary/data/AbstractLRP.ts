/**
 * Copyright 2017 TomTom International B.V
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import AbstractCoordinate from './AbstractCoordinate';
import Attr1 from './Attr1';

export default class AbstractLRP extends AbstractCoordinate {
    protected _attrib1: Attr1;

    public static fromBitCount(countBits: number) {
        const abstractLrp = new AbstractLRP();
        abstractLrp._coordBits = countBits;
        return abstractLrp;
    }

    public get attrib1() {
        return this._attrib1;
    }
};
