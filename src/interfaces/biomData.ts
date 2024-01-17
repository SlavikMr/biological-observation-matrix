export interface Lineage {
    rank: string,
    name: string,
    tax_id: number
}

export interface Row {
    id: string,
    metadata: {
        taxonomy: string[],
        tax_id: number,
        title: string,
        lineage: Lineage[],
        id: string,
        assembly?: string
    }
}

export interface BiomData {
    id: string,
    format: string,
    format_url: string,
    matrix_type: string,
    generated_by: string,
    date: string,
    type: string,
    matrix_element_type: string,
    shape: number[],
    data: Array<number[]>
    rows: Row[],
    columns: Array<{ id: string, metadata: null }>,
    metadata: {
        analysis_id: string,
        name: string,
        database: string,
        created: string,
        database_feature: string,
        biom_version: number,
        filterset_name: string,
        filterset_id: string
    }
}