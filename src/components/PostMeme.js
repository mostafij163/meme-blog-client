import { Button, Card, CardAction, CardContent, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { useState } from "react"

const useStyles = makeStyles(() => ({
    file: {
        margin: "11rem auto",
        width: "22rem",
    },
    btn: {
        margin: "1rem",
        float: "right",

    }
}))

export default function PostMeme() {
    const classes = useStyles()
    const [selectedFile, setSelectedFile] = useState({})

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const uploadFile = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("meme", selectedFile, selectedFile.name)
        axios.post("http://localhost:8000/meme/upload-meme", formData).then(res => {
            console.log(res)
        })
    }

    return (
        <Card    
            className={classes.file}
        >
            <Typography variant="h5"
                style={{fontSize: "1.5rem", margin: "0 auto", width: "11rem"}}
            >
                Upload A Meme
            </Typography>
            <form>
                <input
                    type="file"
                    onChange={handleFileUpload}
                    style={{padding: "5rem"}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    type="submit"
                    onClick={uploadFile}
                >
                    Post
                </Button>
            </form>
        </Card>
    )
}