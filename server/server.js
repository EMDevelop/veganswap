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

// Get list of Items To Swap
app.get("/api/v1/swapList", async (req, res) => {

    try {
        const ingredient = await db.query(`SELECT id,name, isvegan, description FROM ingredient WHERE isVegan = 'n';`)
        const recipe = await db.query(`SELECT id, isvegan, title FROM recipe WHERE isVegan = 'n';`)

        res.status(200).json({
            status: "success",
            data: {
                ingredients: ingredient.rows,
                recipes: recipe.rows
            }
        })
    } catch (error) {
        console.log("error")
    }

})

// ---------------------  Get Alternatives  ----------------------

//
// Ingredient Alternatives
// 

app.get("/api/v1/alternatives/ingredient/:id", async (req, res) => {

    try {

        //Fetch Ingredients as Ingredient Alternative
        const ingredients = await db.query(
                `SELECT i.ID, i.name, i.description, i.image, i.createdate, u.username
                FROM Ingredient i
                Join Users u on u.id = i.createuser
                WHERE i.ID IN 
                    (SELECT alternative_id
                    FROM ingredientAlternative
                    WHERE swap_id = $1
                    AND type = 'ingredient')
                ;`,
            [req.params.id])
        //Fetch Recipes as Recipe Alternative
        const recipes = await db.query(
            `SELECT r.ID, r.title, r.description, r.image, r.createdate, u.username
            FROM recipe r
            Join users u on u.id = r.createuser
            WHERE r.ID IN 
                (SELECT alternative_id
                FROM ingredientAlternative
                WHERE swap_id = $1
                AND type = 'recipe')
            ;`,
            [req.params.id])
        //fetchSelected item
        const selected = await db.query(`
            SELECT name
            FROM ingredient
            WHERE id = $1 ;`,
            [req.params.id])
        res.status(200).json({
            status: "success",
            data: { Ingredients: ingredients.rows, Recipes: recipes.rows, Selected: selected.rows[0] }
        })
    } catch (error) {
        console.log("error")
    }
})


//
// Recipe Alternatives
// 

// app.get("/api/v1/alternatives/recipe/:id", async (req, res) => {

//     try {

//         //Fetch Ingredients as Ingredient Alternative
//         const recipes = await db.query(
//             ``,
//             [req.params.id])
//         //Fetch Recipes as Recipe Alternative
//         const foodProducts = await db.query(
//             ``,
//             [req.params.id])
//         //fetchSelected item
//         const selected = await db.query(
//         `select *`,
//             [req.params.id])


//         res.status(200).json({
//             status: "success",
//             data: { 
//                 Recipes: ingredients.rows, 
//                 FoodProducts: recipes.rows, 
//                 Selected: selected.rows[0] 
//             }
//         })
//     } catch (error) {
//         console.log("error")
//     }
// })






// Get Ingredient Profile + List of Ingredient foodProducts  
app.get("/api/v1/ingredients/profile/:id", async (req, res) => {

    try {

        const ingredient = await db.query(
            `
            SELECT i.ID, i.name, i.description, i.image, i.createdate, u.username
            FROM Ingredient i
            Join users u on u.id = i.createuser
            WHERE i.ID = $1;
            `,
            [req.params.id])

        const brands = await db.query(
            `
            SELECT f.ID, f.brandname, f.productname, f.image, f.createdate,   u.username
            FROM foodProduct f
            Join Users u on u.id = f.createuser
            WHERE f.id in (
                    SELECT foodProduct_ID
                    FROM ingredientProduct
                    WHERE ingredient_id = $1
                );
            `,
            [req.params.id])

        res.status(200).json({
            status: "success",
            data: { 
                    Ingredients: ingredient.rows[0], 
                    foodProducts: brands.rows 
            }
        })
    } catch (error) {
        console.log("error")
    }

})

// Get foodProducts associated to a food product ID
app.get("/api/v1/foodproducts/profile/:id", async (req, res) => {

    try {
        const response = await db.query(
            `
            SELECT f.ID, f.brandname, f.productname, f.image, f.description, f.createdate, u.username
            FROM foodProduct f
            Join users u on u.id = f.createuser
            WHERE f.id = $1
            `, [req.params.id])

        res.status(200).json({
            status: "success",
            data: { FoodProduct: response.rows[0] }
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
            FROM recipe r
            Join Users u on u.id = r.createuser
            WHERE r.ID = $1;
            `, [req.params.id])

        const profileIngredients = await db.query(`
            SELECT ID, SEQ, quantity,measure,name,note
            FROM RecipeIngredient
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `, [req.params.id])


        const profileSteps = await db.query(`
            SELECT ID, SEQ, Description, Image
            FROM recipestep
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `, [req.params.id])

        res.status(200).json({
            status: "success",
            data: {
                Profile: profile.rows[0]
                ,
                Ingredients: profileIngredients.rows,
                Steps: profileSteps.rows
            }
        })
    } catch (error) {
        console.log("error")
    }

})