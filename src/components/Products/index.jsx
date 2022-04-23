import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Loading from "../Loading";
import Product from "../Product";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    overflow: "auto",
    height: `calc(100% - ${theme.spacing(6)}px)`,
  },
  content: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  card: {
    height: "100%",
    cursor: "pointer",
    "& > :hover": {
      boxShadow: "0 0 10px 0",
    },
  },
  end: {
    margin: "50px auto",
  },
}));

const Products = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [finished, setFinished] = useState(false);

  // eslint-disable-next-line
  useEffect(() => FetchData(), []);

  const handleScroll = ({ target }) => {
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      FetchData();
    }
  };

  const FetchData = async () => {
    try {
      if (!loading && !finished) {
        setLoading(true);
        const getProducts = await fetch(
          `https://xoosha.com/ws/1/test.php?offset=${products.length}`
        ).then((res) => res.json());
        if (getProducts.length) {
          setProducts((state) => [...state, ...getProducts]);
        } else {
          setFinished(true);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const useMedia = () => {
    const data = products.filter((item) =>
      item.description.toLowerCase().includes(q.toLowerCase())
    );
    let col = 1;
    if (useMediaQuery(theme.breakpoints.up("sm"))) col = 2;
    if (useMediaQuery(theme.breakpoints.up("md"))) col = 3;
    if (useMediaQuery(theme.breakpoints.up("lg"))) col = 4;
    const array = Array(col)
      .fill()
      .map(() => []);
    data.forEach((item, i) => {
      array[i % col].push(item);
    });
    return array;
  };

  return (
    <div onScroll={handleScroll} className={classes.root}>
      <header>
        <Typography variant="h1">Photo Gallery</Typography>
        <Typography>
          Build by{" "}
          <Link href="mailto:mohammad.ghaedi.69@gmail.com" target="_blank">
            Mohammad Ghaedi
          </Link>
        </Typography>
      </header>
      <div className={classes.content}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="select-label">Search</InputLabel>
          <Input
            value={q}
            onChange={({ target }) => {
              setQ(target.value);
            }}
          />
        </FormControl>
        <Grid container spacing={3}>
          {useMedia().map((products, i) => (
            <Grid
              key={i}
              className={classes.card}
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
            >
              {products.map((product, i) => (
                <Product key={i} product={product} />
              ))}
            </Grid>
          ))}
        </Grid>
        {finished && (
          <Typography align="center" className={classes.end}>
            ~ end of catalogue ~
          </Typography>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Products;
