require("dotenv").config();
const express = require("express")
const app = express()
const morgan = require("morgan");
const db = require('./db')
const cors = require("cors");

//change
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is up mate on port ${port}`);
})

app.use(cors());
app.use(express.json())

// Get list of non-vegan items
app.get("/api/v1/nonvegan", async (req, res) => {

    try {
        const response = await db.query(`
            SELECT DISTINCT ID, name FROM NotVegan ORDER BY name ASC;
            `)

        res.status(200).json({
            status: "success",
            data: { NotVeganList: response.rows }
        })
    } catch (error) {
        console.log("error")
    }

})

// Get Alternatives
app.get("/api/v1/alternatives/:id", async (req, res) => {

    try {

        //Fetch Ingredients
        const ingredients = await db.query(`
        SELECT i.ID, i.name, i.description, i.image, i.createdate, u.username
        FROM Ingredients i
        Join Users u on u.id = i.createuser
        WHERE i.ID IN 
            (SELECT Vegan_ID
            FROM swaps
            WHERE notVegan_ID = $1
            AND type = 'ingredient')
        ;`,
            [req.params.id])

        //Fetch Ingredients
        const recipes = await db.query(`
        SELECT r.ID, r.title, r.description, r.image, r.createdate, u.username
        FROM recipes r
        Join Users u on u.id = r.createuser
        WHERE r.ID IN 
            (SELECT Vegan_ID
            FROM swaps
            WHERE notVegan_ID = $1 
            AND type = 'recipe')
        ;`,
            [req.params.id])
        
            //fetchSelected item
        const selected = await db.query(`
                SELECT name FROM notVegan
                WHERE ID = $1 ;`,
                [req.params.id])

        res.status(200).json({
            status: "success",
            boh: { Ingredients: ingredients.rows, Recipes: recipes.rows, Selected : selected.rows[0]}
        })
    } catch (error) {
        console.log("error")
    }

})

// Get Ingredient + List of brands associated 
app.get("/api/v1/ingredients/profile/:id", async (req, res) => {

    try {
        
        const ingredient = await db.query(`
        SELECT i.ID, i.name, i.description, i.image, i.createdate, u.username
        FROM Ingredients i
        Join Users u on u.id = i.createuser
        WHERE i.ID = $1;`,
            [req.params.id])
        
        const brands = await db.query(`
            SELECT b.ID, b.brandname, b.productname, b.image, b.createdate,   u.username
            FROM brands b
            Join Users u on u.id = b.createuser
            WHERE b.ingredients_id = $1
            `, [req.params.id])

        res.status(200).json({
            status: "success",
            data: { Ingredients: ingredient.rows[0],BrandList: brands.rows }
        })
    } catch (error) {
        console.log("error")
    }

})

// Get Brand Profile
app.get("/api/v1/brands/profile/:id", async (req, res) => {

    try {
        const response = await db.query(`
            SELECT b.ID, b.brandname, b.productname, b.image, b.description, b.createdate,   u.username
            FROM brands b
            Join Users u on u.id = b.createuser
            WHERE b.ID = $1
            `, [req.params.id])

        res.status(200).json({
            status: "success",
            data: { Brand: response.rows[0] }
        })
    } catch (error) {
        console.log("error")
    }

})


// Get Recipe Profile
app.get("/api/v1/recipes/profile/:id", async (req, res) => {

    try {
        const profile = await db.query(`
            SELECT r.title, r.description, r.image, r.credit, r.createdate, u.username
            FROM recipes r
            Join Users u on u.id = r.createuser
            WHERE r.ID = $1;
            `, [req.params.id])

        const profileIngredients = await db.query(`
            SELECT ID, SEQ, Description 
            FROM RecipeIngredients 
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `, [req.params.id])
        
        
        const profileSteps = await db.query(`
            SELECT ID, SEQ, Description, Image
            FROM recipesteps
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `, [req.params.id])

        res.status(200).json({
            status: "success",
            data: { 
                Profile: profile.rows[0]
                , 
                Ingredients: profileIngredients.rows, 
                Steps:  profileSteps.rows 
            }
        })
    } catch (error) {
        console.log("error")
    }

})