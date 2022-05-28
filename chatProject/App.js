import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import store from './redux/store';
import Index from "./Index"




export default function App() {
  
  return (
    <StoreProvider store={store}>
      <Index />
    </StoreProvider >
  );
}
