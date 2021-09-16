import { useState, useEffect } from "react";
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
        maxWidth: 345,
        margin: "2rem",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function Home() {
    const [posts, setPosts] = useState([
        {
            id: "1",
            userName: "mostafijur",
            createdAt: new Date().toString()
        }
    ])
    useEffect(() => {
        // axios.get().then(res => {
        //     if (res.status === 200) {
        //         setPosts(res.data)
        //     }
        // })
    }, [])

    const classes = useStyles();

    const postList = posts.map(post => (
            <Card key={post.id} className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    title={post.userName}
                    subheader={post.createdAt}
                />
                <CardMedia
                    className={classes.media}
                    image="./logo512.png"
                    title="meme"
                />
                    <CardContent>
                        
                </CardContent>
            </Card>
        ))

    return (
        <>
            {
                postList.length ? postList :
                    <Card style={{width: "50%", margin: "5rem auto"}}>
                        <Typography
                            variant="h5"
                            style={{padding: "3rem"}}
                        > Opps!! No Memes</Typography>
                    </Card>
            }
        </>
    )
}