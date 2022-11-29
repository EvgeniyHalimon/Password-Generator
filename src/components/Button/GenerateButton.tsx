import { FC, memo } from "react"
import { Button } from "@mui/material"

interface IGenerateButton{
    title: string,
    onClick: any
}

const GenerateButton: FC<IGenerateButton> = ({title, onClick}) => {
    return <Button onClick={onClick}>{title}</Button>
}

export {GenerateButton}