import {Box} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useRef} from "react";
import {BiomData} from "../interfaces/biomData";
import biomData from "../mocks/biom.json";
import {
    getAbundanceScore,
    getName,
    getRelativeAbundance,
    getTaxId,
    getUniqueMatchesFrequency
} from "../utils/observationMatrix";

const ObservationMatrix = () => {
    const matrixData = useRef<BiomData>(biomData);

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', width: 300, valueGetter: getName},
        {field: 'taxId', headerName: 'Tax ID', width: 150, valueGetter: getTaxId},
        {
            field: 'abundanceScore',
            headerName: 'Abundance score',
            width: 150,
            valueGetter: getAbundanceScore(matrixData)
        },
        {
            field: 'relativeAbundance',
            headerName: 'Relative abundance',
            width: 150,
            valueGetter: getRelativeAbundance(matrixData)
        },
        {
            field: 'uniqueMatchesFrequency',
            headerName: 'Unique matches frequency',
            width: 200,
            valueGetter: getUniqueMatchesFrequency(matrixData)
        },
    ];

    return (
        <Box height={600}>
            <DataGrid
                rows={matrixData.current.rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 10},
                    },
                }}
                pageSizeOptions={[10, 15]}
            />
        </Box>
    );
}

export default ObservationMatrix;
