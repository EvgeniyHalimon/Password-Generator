import { FC } from "react"
import { Button } from "@mui/material"

interface IGenerateButton{
    title: string,
    onClick: any
}

const GenerateButton: FC<IGenerateButton> = ({title, onClick}) => {
    return <Button variant="contained" sx={{m: '15px 0'}} onClick={onClick}>{title}</Button>
}

export {GenerateButton}