import style from './table_item_counter.module.scss';

export default function TableCounter(props: any) {

    const data = props.dataInput;
    let objectType: string[] = [];

    let countTypes: any[] = [];

    const tableItem = data?.map((el: any, index: any) => {
        objectType.push(el[1]);

        if ((objectType.filter((item: any) => item === el[1]).length <= 1) && index !== 0) {

            countTypes.push(data.filter((object: any) => object[1] === el[1]));
            return (
                <tr className='table_count_data' key={index}>
                    <td>{objectType[index] + ': '}</td>
                    <td>{countTypes[index - 1]?.length}</td>
                </tr>
            )
        }
    })

    return (
        <table className={style.table_container}>
            <tbody>
                {tableItem}
            </tbody>
        </table>
    )
}