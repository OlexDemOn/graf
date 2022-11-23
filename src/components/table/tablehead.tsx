import style from './table.module.scss'
import React, { useState } from 'react';

const TableHead = ({ columns, handleSorting }: any) => {

    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc")

    const sortingChange = (accessor: any) => {
        const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <thead className={style.thead}>
            <tr className={style.first_line}>
                {columns.map(({ label, accessor, sortable }: any) => {
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up" : sortField === accessor && order === "desc" ? "down" : "default"
                        : "";
                    return <td key={accessor} onClick={() => sortable ? sortingChange(accessor) : null}>
                        {label}
                        {" "}
                        {cl !== "default" ? cl !== "up" ? <i className="fa-solid fa-arrow-down" /> : <i className="fa-solid fa-arrow-up" /> : " "}
                    </td>;
                })}
            </tr>
        </thead>
    );
};

export default TableHead;