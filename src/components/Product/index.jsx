import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid,
  CardActions,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "24px auto",
  },
  content: {
    margin: "auto 0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "100%",
    height: "90%",
    minHeight: "200px",
  },
  ellipsis: {
    margin: "auto 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  actions: {
    margin: 0,
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const Product = ({ product = {} }) => {
  const classes = useStyles();

  const formatDate = (date) => {
    date = date.replace(" ", "T");
    const now = new Date();
    const minute = 60 * 1000; // Milliseconds in Minute
    const hour = minute * 60; // Milliseconds in Hour
    const day = hour * 24; // Milliseconds in Day

    let diff = now - new Date(date); // Calculate Difference

    if (diff < minute) {
      return Math.floor(diff / 1000) + " seconds ago";
    } else if (diff < hour) {
      return Math.floor(diff / minute) + " minutes ago";
    } else if (diff < day) {
      return Math.floor(diff / hour) + " hours ago";
    } else if (diff < day * 8) {
      return Math.floor(diff / day) + " days ago";
    } else {
      // Older than 1 Week
      return new Date(date).toDateString();
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar
          variant="square"
          src={product.image_url}
          className={classes.avatar}
          style={{ fontSize: product.size }}
        >
          {product.face}
        </Avatar>
        <Typography
          align="center"
          className={classes.ellipsis}
          gutterBottom
          variant="body1"
          title={product.name}
        >
          {product.name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container justifyContent="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {formatDate(product.crawled_time)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              {product.price}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Product;
