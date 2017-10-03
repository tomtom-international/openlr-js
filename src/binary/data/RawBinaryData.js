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

export default class RawBinaryData {
    /** The header. */
    header;

    /** The first lrp. */
    firstLRP;

    /** The pos offset. */
    posOffset;

    /** The neg offset. */
    negOffset;

    /** The last lrp. */
    lastLRP;

    /** The last intermediate lrp. */
    lastClosedLineLRP;

    /** The intermediates. */
    intermediates;

    /** The abs coord. */
    absCoord;

    /** The rel coord. */
    relCoord;

    /** The abs coord. */
    absCenter;

    /** The abs coord. */
    absCoordUR;

    /** The abs coord. */
    absCoordLL;
};
