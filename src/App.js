import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home/HomePage';
import DonatePage from './Donate/DonatePage';
import Bottom from './BottomBar/Bottom';
import ItemDetailPage from './Item/ItemInfo';
import Chats from './Message/Chats'; // Import the Chats component
import Cart from './Cart/Cart';
import ListItems from './ListItems/ListItems';
import ModelViewPage from './Home/ModelViewPage';
import Profile from './Home/profile';
import LoginPage from './LoginScreen/LoginPage';

const App = () => {
  const [isBottomHidden, setIsBottomHidden] = useState(false);

  const hideBottom = (hide) => {
    setIsBottomHidden(hide);
  };

  return (
    <Router>
      <div>
        <Routes>
<Route path="/" element={<LoginPage hideBottom={hideBottom} />} />       
   <Route path="/donate" element={<DonatePage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} /> {/* Ensure this route is correct */}
          <Route path="/chat" element={<Chats hideBottom={hideBottom} />} /> {/* Ensure this route exists */}
          <Route path="/profile" element={<Profile/>} /> {/* Add the Profile route */}
          <Route path="/Cart" element={<Cart/>} /> {/* Add the Profile route */}
          <Route path="/ListItems/:name" element={<ListItems />} />
          <Route path="/Home" element={<HomePage />} />
        <Route path="/view/:modelName" element={<ModelViewPage/>} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
        </Routes>
        {!isBottomHidden && <Bottom />}
      </div>
    </Router>
  );
};

export default App;
