import Graf from './components/graf/graf';
import PieCharts from './components/pie_chart/pie_chart';
import Menu from './components/menu/menu';
import Table from './components/table/table';
import { useState } from 'react';
import ReadCsvMatrix from './components/read_csv_matrix/read_csv_matrix';
import TableCounter from './components/table_item_counter/table_item_counter';

function App() {

    const [menuItem, setMenuItem] = useState(0);
    const [dataMatrix, setDataMatrix] = useState([]);
    const [dataUrzadzen, setDataUrzadzen] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([]);

    return (
        <>
            <Menu setMenuItem={setMenuItem} />
            <div className='container'>
                <div className='main_container'>
                    {!menuItem ?
                        <>
                            <Graf dataInput={dataMatrix} dataStation={dataUrzadzen} />
                            <ReadCsvMatrix setData={setDataMatrix} />
                        </>
                        :
                        <div className='table_container'>
                            <Table dataInput={dataUrzadzen} />
                            <div className='table_container_tables'>
                                <TableCounter dataInput={dataUrzadzen} setDataPieChart={setDataPieChart} />
                                {dataUrzadzen.length > 0 ? <PieCharts dataInput={dataUrzadzen} /> : <></>}
                            </div>
                            <ReadCsvMatrix setData={setDataUrzadzen} />
                        </div>
                    }

                </div>
            </div>
        </>
    );
}

export default App;