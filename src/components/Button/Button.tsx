import { FC } from "react"
import { Button } from "@mui/material"

interface IGenerateButton{
    title: string
}

const GenerateButton: FC<IGenerateButton> = ({title}) => {
    return <Button>{title}</Button>
}

export {GenerateButton}