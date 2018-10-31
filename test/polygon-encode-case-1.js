/**
 * Copyright 2018 TomTom International B.V
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { BinaryEncoder } = require('../lib/es5');
const { RawPolygonLocationReference } = require('../lib/es5/data/raw-location-reference/RawPolygonLocationReference');
const { GeoCoordinates } = require('../lib/es5/map/GeoCoordinates');

const coordinates = [
    [-0.129898533096366, 51.50871146282117],
    [-0.13016675399785527, 51.50899525912013],
    [-0.1311323492432166, 51.50893182245375],
    [-0.13136301921849736, 51.508207302683445],
    [-0.13119135784154423, 51.50801698912801],
    [-0.13093386577611454, 51.507826674777675],
    [-0.13278458999639042, 51.50720230457256],
    [-0.132645115127616, 51.507045375956295],
    [-0.1311323492432166, 51.50759629318469],
    [-0.13144348548894413, 51.50717559335692],
    [-0.13107334064488896, 51.507078765068854],
    [-0.13001655029302128, 51.50711883197158],
    [-0.12958739685063847, 51.50710881524924],
    [-0.12839113162999638, 51.50698861440878],
    [-0.1282355635071326, 51.50708878179785],
    [-0.12807999538426884, 51.50729245480977],
    [-0.127951249351554, 51.507178932259706],
    [-0.12772594379430302, 51.50713218759802],
    [-0.12847159790044316, 51.50674153390753],
    [-0.13099823879247197, 51.505699774358334],
    [-0.1300433723831702, 51.50149242616396],
    [-0.13277922557836064, 51.50119188642839],
    [-0.13769303249364384, 51.500644231147135],
    [-0.1396993248367835, 51.50042383143284],
    [-0.14055763172154911, 51.5003570434302],
    [-0.1406005470657874, 51.50015000000002],
    [-0.1397636978531409, 51.50016335766907],
    [-0.13036523746495732, 51.50111842085823],
    [-0.12967859195714482, 51.50122194049112],
    [-0.12933526920323857, 51.50120190445148],
    [-0.12779031681066044, 51.50108502737805],
    [-0.12720023082738408, 51.50103827646478],
    [-0.12664233135228642, 51.50095813193042],
    [-0.12602005886083134, 51.50114513562471],
    [-0.1258591263199378, 51.50246749699289],
    [-0.125928863754325, 51.50371635860836],
    [-0.12615416931157597, 51.504748146262386],
    [-0.12648139881139286, 51.50556621371936],
    [-0.12537096427922734, 51.50589677558651],
    [-0.12558017658238896, 51.506274080645596],
    [-0.12506519245152958, 51.506491113113725],
    [-0.1248774378204871, 51.50684504076719],
    [-0.1249149887466956, 51.50689512464709],
    [-0.127227052917533, 51.50731248817175],
    [-0.12716804431920536, 51.50745606034047],
    [-0.1266155092621375, 51.50780664164199],
    [-0.12600933002477177, 51.50813050959016],
    [-0.1256391851807166, 51.50833751676339],
    [-0.12478624271398076, 51.50879159372005],
    [-0.12261901782994755, 51.50984329870323],
    [-0.12163732933049687, 51.50911545466687],
    [-0.12097214149480351, 51.50942595836142],
    [-0.12111698078160771, 51.509910072803166],
    [-0.12036596225743779, 51.510163813490294],
    [-0.12023721622472294, 51.51080817493664],
    [-0.11936818050389775, 51.511135360161575],
    [-0.11878345893865117, 51.51135570807054],
    [-0.11779104160314091, 51.51170625936561],
    [-0.11665914939885624, 51.51198669845945],
    [-0.11581157135015019, 51.512327229324],
    [-0.11510346817021855, 51.51109529679087],
    [-0.11484597610478886, 51.51114537599875],
    [-0.1155540792847205, 51.51241736942086],
    [-0.1146850435638953, 51.512641049631554],
    [-0.11495862888341435, 51.51289811359186],
    [-0.11592422412877568, 51.5132119299667],
    [-0.11610661434178837, 51.513231960725705],
    [-0.11819873737340458, 51.512327229324],
    [-0.11876736568456181, 51.511619456439064],
    [-0.11922870563512333, 51.51141246417751],
    [-0.11905167984014042, 51.51219034957654],
    [-0.1188424675369788, 51.512580956548504],
    [-0.11850987361913924, 51.512851374798196],
    [-0.11805389808660038, 51.5130416681593],
    [-0.11897657798773055, 51.513375514241126],
    [-0.11969004558568486, 51.512454093112865],
    [-0.12030695365911015, 51.51211022465549],
    [-0.12059663223271855, 51.51186984904683],
    [-0.1220933048630286, 51.51117876210674],
    [-0.12200210975652226, 51.51106191062178],
    [-0.1238689272308875, 51.51034744073769],
    [-0.1246253101730872, 51.510097039762286],
    [-0.12577329563146122, 51.509572862597736],
    [-0.12576793121343144, 51.50900527542785],
    [-0.12557481216435917, 51.50868141369784],
    [-0.1269051878357459, 51.50796022879098],
    [-0.12730751918797978, 51.50782667477773],
    [-0.12843404697423466, 51.50828743446897],
    [-0.129898533096366, 51.50871146282117]
];
const expectedOpenLrString = 'E//oWiSg4f/lABz/n//6/+n/uAAR/+0AGv/t/0f/wgAO//AAlwA3/+H/1gAl//YAagAEACv//wB4//QAEAAKABAAFAAN//UAF//7/7X/2f8D/5gAX/5b/u7/4v4V/8n/N//q/6r/+f/8/+sAVAABA6wAYABFAAoAIv/+AJr/9AA7//sAOP/4AD4AEwAQAIT/+QB9/+kAZ//fAFIAbwAh/+sAJgAzABYAEwAj//wABf8ZACoABgAOADcAIwA9ACAAJQAVAFUALQDZAGkAYv+3AEMAH//yADAASwAZAA0AQABXACEAOgAWAGMAIwBxABwAVQAiAEf/hQAaAAX/uQB/AFcAFv/lABr/nwAf/+4AAv8v/6b/x/+5/9L/6wASAE4AFQAnACEAGwAuABP/pAAh/7n/pP/C/97/4//o/2r/uwAJ//T/Rf+5/7T/5/+N/8wAAf/HABP/4P97/7j/2P/z/48ALv9uACo=';

const binaryEncoder = new BinaryEncoder();
const rawLocationReference = RawPolygonLocationReference.fromPolygonValues('polygon', coordinates.map(([longitude, latitude]) => GeoCoordinates.fromValues(longitude, latitude)));
const encodedLocationReference = binaryEncoder.encodeDataFromRLR(rawLocationReference);
const encodedOpenLrBinary = encodedLocationReference.getLocationReferenceData();
const encodedOpenLrString = encodedOpenLrBinary.toString('base64');

if (expectedOpenLrString !== encodedOpenLrString) {
    throw new Error('Expected OpenLR string to be equal: ' + expectedOpenLrString + ' and ' + encodedOpenLrString);
}
