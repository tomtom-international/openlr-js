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

import Header from './Header';
import FirstLRP from './FirstLRP';
import Offset from './Offset';
import LastLRP from './LastLRP';
import LastClosedLineLRP from './LastClosedLineLRP';
import IntermediateLRP from './IntermediateLRP';
import AbsoluteCoordinates from './AbsoluteCoordinates';
import AbstractCoordinate from './AbstractCoordinate';
import RelativeCoordinates from './RelativeCoordinates';

export default class RawBinaryData {
    /** The header. */
    public header: Header;

    /** The first lrp. */
    public firstLRP: FirstLRP;

    /** The pos offset. */
    public posOffset: Offset | null;

    /** The neg offset. */
    public negOffset: Offset | null;

    /** The last lrp. */
    public lastLRP: LastLRP;

    /** The last intermediate lrp. */
    public lastClosedLineLRP: LastClosedLineLRP;

    /** The intermediates. */
    public intermediates: Array<IntermediateLRP>;

    /** The abs coord. */
    public absCoord: AbsoluteCoordinates;

    /** The rel coord. */
    public relCoord: RelativeCoordinates;

    /** The abs coord. */
    public absCenter: AbsoluteCoordinates;

    /** The abs coord. */
    public absCoordUR: AbstractCoordinate;

    /** The abs coord. */
    public absCoordLL: AbsoluteCoordinates;
};
