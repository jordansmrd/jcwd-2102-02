import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartList } from '../src/Cart/CartList';
import { CartSummary } from '../src/Cart/CartSummary';
import { Layout } from '../src/layout';
import { axiosInstance } from '../src/Lib/api';

const cart = () => {
  const [cartData, setCartData] = useState([]);
  const cartSelector = useSelector((state) => state.cartReducer);
  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`/cart/user/3`);
      const data = res.data.result;
      console.log(data);
      setCartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [cartSelector.render]);
  return (
    <Layout>
      <Box align="center" bg="gray.100">
        <Box w="1440px" px="2rem">
          <Heading textAlign={'start'} pt="2rem" pb="1rem" fontSize={'32px'}>
            Shopping Cart
          </Heading>
          <Grid
            w="100%"
            minH="100vh"
            templateColumns="repeat(7, 1fr)"
            gap={4}
            pb="2rem"
          >
            <GridItem colSpan={5} textAlign={'start'} rounded="lg">
              <CartList cartData={cartData} />
            </GridItem>
            <GridItem colSpan={2}>
              <CartSummary cartData={cartData} />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default cart;