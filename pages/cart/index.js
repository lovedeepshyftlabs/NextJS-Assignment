import ResponsiveAppBar from "@/components/Navbar"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/cartSlice';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function page() {
  const [UI, setUI] = React.useState(false);
  React.useEffect(() => {
    setUI(true);
  }, []);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  return (
    <>
      <ResponsiveAppBar />
      {UI && products.map((item, index) => (
        <Paper key={index}
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 800,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={item.images[0]} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {item.id}
                  </Typography>
                </Grid>
                <Grid item>
                  <button
                    className="btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  )
}

export default page