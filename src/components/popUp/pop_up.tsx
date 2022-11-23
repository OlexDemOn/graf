import styles from './pop_up.module.scss'
import { useState } from 'react'

export default function PopUp({ data, setPopUp, dataStation }: any) {

    const [close, setClose] = useState(`${styles.pop_up_open}`);

    return (
        <div onClick={() => { setPopUp(false); setClose(`${styles.pop_up_close}`) }} className={styles.pop_up_container + ' ' + close}>
            <div className={styles.pop_up + ' ' + 'container'}>
                <section className={styles.pop_up_section}>
                    {dataStation.length > 0 ?
                        dataStation.map((el: any, index: number) =>
                            index > 0 ?
                                index <= 4 ?
                                    <span key={index}>{dataStation[0][index - 1]}: {
                                        index - 1 == 2 ?
                                            new Date(dataStation[data.id + 1][index - 1]).toUTCString()
                                            : dataStation[data.id + 1][index - 1]
                                    }</span>
                                    : ''
                                : ''
                        )
                        : <p>Enter values</p>
                    }
                </section>
                <div className={styles.close} onClick={() => {
                    setClose(`${styles.pop_up_close}`)
                    setPopUp(false)
                }}></div>
            </div>
        </div>
    )
}