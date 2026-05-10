import { digitBandValues } from "../data/colorValues";
export default function calcResistance(bandColors) {
    const bandValue1 = digitBandValues[bandColors["band1"]];
    const bandValue2 = digitBandValues[bandColors["band2"]];
    const bandValue3 = digitBandValues[bandColors["band3"]];
    let value;
    if (bandColors["band4"]) {
        const bandValue4 = digitBandValues[bandColors["band4"]];
        value =
            (bandValue1 * 100 + bandValue2 * 10 + bandValue3) *
            10 ** bandValue4;
    } else {
        value = (bandValue1 * 10 + bandValue2) * 10 ** bandValue3;
    }
    return formatResistance(value);
}
function formatResistance(value) {
    const prefixes = [
        ["GΩ", 1e9],
        ["MΩ", 1e6],
        ["kΩ", 1e3],
        ["Ω", 1],
        ["mΩ", 1e-3],
        ["µΩ", 1e-6],
        ["nΩ", 1e-9],
    ];;
    for (const [prefix, base] of prefixes) {
        if (value >= base) {
            return (value / base).toFixed(2)+prefix
        }
    }
    return (value / 1e-9).toFixed(4)+"nΩ"
}