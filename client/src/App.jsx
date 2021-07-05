//Functionality
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//Styling
import './css/App.css';
//Components
import { VeganContextProvider } from './context/VeganContext';
import NavigationBar from './components/NavigationBar';
//Routes
import Alternatives from './routes/Alternatives';
import Swap from './routes/Swap';
import IngredientsProfile from './routes/IngredientsProfile';
import BrandProfile from './routes/BrandProfile';
import RecipeProfile from './routes/RecipeProfile';


const App = () => {
    return (
        <VeganContextProvider>
                    <Router>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path ="/" component={Swap}></Route>
                            <Route exact path ="/alternatives/:id" component={Alternatives}></Route>
                            <Route exact path ="/ingredients/profile/:id" component={IngredientsProfile}></Route>
                            <Route exact path ="/brands/profile/:id" component={BrandProfile}></Route>
                            <Route exact path ="/recipes/profile/:id" component={RecipeProfile}></Route>
                        </Switch>
                    </Router>
        </VeganContextProvider>
    )
}

export default App;

//