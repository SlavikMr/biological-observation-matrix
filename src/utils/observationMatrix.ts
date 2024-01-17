import {BiomData, Lineage, Row} from "../interfaces/biomData";
import {GridValueGetterParams} from "@mui/x-data-grid";

const getStrainLevel = (row: Row): Lineage | undefined =>
    row?.metadata.lineage.find(item => item.rank === 'strain');

export const getName = (params: GridValueGetterParams<Row>): string => {
    const strainLevel = getStrainLevel(params.row);
    return strainLevel?.name || params.row?.metadata?.title;
};

export const getTaxId = (params: GridValueGetterParams<Row>): number => {
    const strainLevel = getStrainLevel(params.row);
    return strainLevel?.tax_id || params.row?.metadata?.tax_id;
};

export const getAbundanceScore = (matrixData: { current: BiomData }) =>
    (params: GridValueGetterParams<Row>): string | undefined => {
        const rowIndex = matrixData.current.rows.findIndex(row => row.id === params.id);
        const abundanceScoreItem = matrixData.current.data.find(item => {
            if (item[0] === rowIndex && item[1] === 1) {
                return item;
            }
        });

        if (abundanceScoreItem) {
            return Number.parseFloat(String(abundanceScoreItem[2])).toFixed(2);
        }
    };

export const getRelativeAbundance = (matrixData: { current: BiomData }) =>
    (params: GridValueGetterParams<Row>): string | undefined => {
        const abundanceScore = getAbundanceScore(matrixData)(params);

        const abundanceSummary = matrixData.current.data.reduce((res, item) => {
            if (item[1] === 1) {
                return res + item[2];
            } else {
                return res;
            }
        }, 0);

        const relativeAbundance = (Number(abundanceScore) / abundanceSummary) * 100;
        const relativeAbundanceWithPercent = `${Number.parseFloat(String(relativeAbundance)).toFixed(2)}%`;

        return relativeAbundance < 0.01 ? '<0.01%' : relativeAbundanceWithPercent;
    };

export const getUniqueMatchesFrequency = (matrixData: { current: BiomData }) =>
    (params: GridValueGetterParams<Row>): number | undefined => {
        const rowIndex = matrixData.current.rows.findIndex(row => row.id === params.id);
        const uniqueMatchesFrequencyItem = matrixData.current.data.find(item => {
            if (item[0] === rowIndex && item[1] === 2) {
                return item;
            }
        });

        if (uniqueMatchesFrequencyItem) {
            return Number.parseInt(String(uniqueMatchesFrequencyItem[2]));
        }
    };