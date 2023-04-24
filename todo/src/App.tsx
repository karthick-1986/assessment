
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from './components/details/details';
import { Layout } from './components/layout/layout';
import List from './components/list/list';
import store from './shared/store';
import { Provider } from 'react-redux'



class App extends React.Component<any,any> {
  
  render() {
    return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    )
  
  }
}

export default App;
