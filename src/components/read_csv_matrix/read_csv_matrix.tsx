import { useState } from 'react'
import Papa from "papaparse";
import styles from './read_csv_matrix.module.scss'

const allowedExtensions = ["csv"];

export default function ReadCsvMatrix({ setData }: any) {

    const [closeInputData, setCloseInputData] = useState(`${styles.close_input_data}`);
    const [parseButton, setParseButton] = useState(``)
    const [error, setError] = useState("");
    const [file, setFile] = useState<any>();

    const handleFileChange = (e: any) => {
        setError("");

        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
            setFile(inputFile);
            setParseButton(`${styles.parse_active}`);
        }
    };
    const handleParse = () => {
        if (!file) return setError("Enter a valid file");
        setCloseInputData(`${styles.close_input_data}`);
        const reader = new FileReader();
        reader.onload = async ({ target }: any) => {
            const csv = Papa.parse(target.result);
            const parsedData: any = csv?.data;
            parsedData.pop();
            setData(parsedData);
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.input_data + ' ' + closeInputData}>

            <div className={styles.input_data_block} >
                <label htmlFor="csvInput">Enter CSV File
                    <div className={styles.input_block}>
                        <input onChange={handleFileChange} id="csvInput" name="file" type="File" />
                        <div className={styles.input_block_button}>Load file</div>
                        <span>{file ? file.name : 'Choose file'}</span>
                    </div>
                </label>
                <div>
                    <button onClick={() => parseButton ? handleParse() : console.log('')} className={styles.parse + ' ' + parseButton}>Parse</button>
                </div>
                <div className={styles.input_data_open} onClick={() => setCloseInputData('')}>
                    <i className="fa-solid fa-arrow-right" />
                </div>
            </div>
        </div>

    )
}
