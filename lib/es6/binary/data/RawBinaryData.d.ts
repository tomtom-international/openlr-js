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
import { Header } from './Header';
import { FirstLRP } from './FirstLRP';
import { Offset } from './Offset';
import { LastLRP } from './LastLRP';
import { LastClosedLineLRP } from './LastClosedLineLRP';
import { IntermediateLRP } from './IntermediateLRP';
import { AbsoluteCoordinates } from './AbsoluteCoordinates';
import { AbstractCoordinate } from './AbstractCoordinate';
import { RelativeCoordinates } from './RelativeCoordinates';
export declare class RawBinaryData {
    /** The header. */
    header: Header | undefined;
    /** The first lrp. */
    firstLRP: FirstLRP | undefined;
    /** The pos offset. */
    posOffset: Offset | null | undefined;
    /** The neg offset. */
    negOffset: Offset | null | undefined;
    /** The last lrp. */
    lastLRP: LastLRP | undefined;
    /** The last intermediate lrp. */
    lastClosedLineLRP: LastClosedLineLRP | undefined;
    /** The intermediates. */
    intermediates: Array<IntermediateLRP> | undefined;
    /** The abs coord. */
    absCoord: AbsoluteCoordinates | undefined;
    /** The rel coord. */
    relCoord: RelativeCoordinates | undefined;
    /** The abs coord. */
    absCenter: AbsoluteCoordinates | undefined;
    /** The abs coord. */
    absCoordUR: AbstractCoordinate | undefined;
    /** The abs coord. */
    absCoordLL: AbsoluteCoordinates | undefined;
}
