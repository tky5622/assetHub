import { type FC } from 'react'
import style from './styles.module.css'
export type Web3Props = {}

export const Web3: FC<Web3Props> = (props) => {
  return (
    <div className={style.module}>
      <h1>Hello World</h1>
    </div>
  )
}
