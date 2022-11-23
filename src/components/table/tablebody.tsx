import style from './table.module.scss'

const TableBody = ({ tableData, columns }: any) => {
    return (
        <tbody className={style.tbody}>
            {tableData.map((data: any, index: any) => {
                return (
                    <tr key={index}>
                        {columns.map(({ accessor }: any, index: any) => {
                            const tData = data[accessor] ? data[accessor] : "——";
                            return <td className={style.table_data} key={index}>{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;