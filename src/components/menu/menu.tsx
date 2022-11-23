import style from './menu.module.scss'

export default function Menu({ setMenuItem }: any) {


    return (
        <nav className={style.menu_container}>
            <div className='container'>
                <ul>
                    <li onClick={() => setMenuItem(0)}>Graf</li>
                    <li onClick={() => setMenuItem(1)}>Table</li>
                </ul>
            </div>
        </nav>
    )
}