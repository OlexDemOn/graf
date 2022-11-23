import { useState, useEffect } from "react";
import TableBody from "./tablebody";
import TableHead from "./tablehead";
import style from './table.module.scss'

function createData(
    name: string,
    rodzaj: string,
    data: string,
    status: string,
) {
    return { name, rodzaj, data, status };
}

const columns = [
    { label: "Enter data", accessor: "name", sortable: true },
    { label: "Enter data", accessor: "rodzaj", sortable: true },
    { label: "Enter data", accessor: "data", sortable: true },
    { label: "Enter data", accessor: "status", sortable: true },
];

const Table = (dataInput: any) => {




    const tableData1: any[] = [
    ]

    if (dataInput.dataInput.length > 0) {

        if (dataInput.dataInput[0]) {
            dataInput.dataInput[0].forEach((el: any, index: any) => {
                columns[index].label = el
            })
            dataInput.dataInput.forEach((el: any, index: number) =>
                index !== 0 ?
                    tableData1.push(createData(el[0], el[1], new Date(el[2]).toUTCString(), el[3]))
                    : ''
            )
        }
    }
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        setTableData(tableData1)
    }, [dataInput])

    const handleSorting = (sortField: any, sortOrder: any) => {
        if (sortField) {
            const sorted = [...tableData1].sort((a: any, b: any) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    return (
        <div className={style.table_container}>
            <table className={style.table}>
                <TableHead {...{ columns, handleSorting }} />
                <TableBody {...{ columns, tableData }} />
            </table>
        </div>
    );
};

export default Table;