//Functionality
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Styling
import "./css/App.css";
//Components
import { VeganContextProvider } from "./context/VeganContext";
import NavigationBar from "./components/NavigationBar";
//Routes
import Alternatives from "./routes/Alternatives";
import Swap from "./routes/Swap";
import IngredientsProfile from "./routes/IngredientsProfile";
import FoodProductProfile from "./routes/FoodProductProfile";
import RecipeProfile from "./routes/RecipeProfile";
import Add from "./routes/Add";
import Test from "./routes/Test";

const App = () => {
  return (
    <VeganContextProvider>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Swap}></Route>
          <Route
            exact
            path="/alternatives/:type/:id"
            component={Alternatives}
          ></Route>
          <Route
            exact
            path="/ingredients/profile/:id"
            component={IngredientsProfile}
          ></Route>
          <Route
            exact
            path="/foodProducts/profile/:id"
            component={FoodProductProfile}
          ></Route>
          <Route
            exact
            path="/recipes/profile/:id"
            component={RecipeProfile}
          ></Route>
          <Route exact path="/test" component={Test}></Route>
          <Route exact path="/add" component={Add}></Route>
        </Switch>
      </Router>
    </VeganContextProvider>
  );
};

export default App;
