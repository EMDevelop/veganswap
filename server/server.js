require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

//change
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up mate on port ${port}`);
});

app.use(cors());
app.use(express.json());

// GET section---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

// GET Non-Vegan Recipe and Ingredient
app.get("/api/v1/swapList", async (req, res) => {
  try {
    const ingredient = await db.query(
      `SELECT id,name, isvegan FROM ingredient WHERE isVegan = 'n';`
    );
    const recipe = await db.query(
      `SELECT id, isvegan, title FROM recipe WHERE isVegan = 'n';`
    );

    res.status(200).json({
      status: "success",
      data: {
        ingredients: ingredient.rows,
        recipes: recipe.rows,
      },
    });
  } catch (error) {
    console.log("error");
  }
});

// GET Non-Vegan Recipe
app.get("/api/v1/ingredients", async (req, res) => {
  try {
    const ingredient = await db.query(
      `SELECT id,name, isvegan FROM ingredient WHERE isVegan = 'n';`
    );
    res.status(200).json({
      status: "success",
      data: {
        ingredients: ingredient.rows,
      },
    });
  } catch (err) {
    res.json({
      status: "failure",
      error: err,
    });
  }
});

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
      [req.params.id]
    );
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
      [req.params.id]
    );
    //fetchSelected item
    const selected = await db.query(
      `
            SELECT name
            FROM ingredient
            WHERE id = $1 ;`,
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        Ingredients: ingredients.rows,
        Recipes: recipes.rows,
        Selected: selected.rows[0],
      },
    });
  } catch (error) {
    console.log("error");
  }
});

//
// Recipe Alternatives
//

app.get("/api/v1/alternatives/recipe/:id", async (req, res) => {
  try {
    //Fetch Ingredients as Ingredient Alternative
    const recipes = await db.query(
      `
                SELECT r.id, r.title, r.image, r.credit
                FROM recipe r
                WHERE r.isVegan = 'y'
                AND r.id IN (
                        SELECT alternative_id
                        FROM recipeAlternative
                        WHERE swap_id = $1
                );`,
      [req.params.id]
    );
    //Fetch foodproducts as Recipe Alternative
    const foodProducts = await db.query(
      `
            SELECT f.id, f.productname, f.brandname, f.image
            FROM foodProduct f
            WHERE f.id IN (
                    SELECT foodProduct_id
                    FROM recipeProduct
                    WHERE recipe_id = $1
            );
            `,
      [req.params.id]
    );
    //fetchSelected item
    const selected = await db.query(
      `SELECT title
        FROM recipe
        WHERE id = $1
        `,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        Recipes: recipes.rows,
        FoodProducts: foodProducts.rows,
        Selected: selected.rows[0],
      },
    });
  } catch (error) {
    console.log("error");
  }
});

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
      [req.params.id]
    );

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
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        Ingredients: ingredient.rows[0],
        foodProducts: brands.rows,
      },
    });
  } catch (error) {
    console.log("error");
  }
});

// Get foodProducts associated to a food product ID
app.get("/api/v1/foodproducts/profile/:id", async (req, res) => {
  try {
    const response = await db.query(
      `
            SELECT f.ID, f.brandname, f.productname, f.image, f.description, f.createdate, u.username
            FROM foodProduct f
            Join users u on u.id = f.createuser
            WHERE f.id = $1
            `,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: { FoodProduct: response.rows[0] },
    });
  } catch (error) {
    console.log("error");
  }
});

// Get Recipe Profile
app.get("/api/v1/recipes/profile/:id", async (req, res) => {
  try {
    const profile = await db.query(
      `
            SELECT r.title, r.description, r.image, r.credit, r.createdate, u.username
            FROM recipe r
            Join Users u on u.id = r.createuser
            WHERE r.ID = $1;
            `,
      [req.params.id]
    );

    const profileIngredients = await db.query(
      `
            SELECT ID, SEQ, quantity,measure,name,note
            FROM RecipeIngredient
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `,
      [req.params.id]
    );

    const profileSteps = await db.query(
      `
            SELECT ID, SEQ, Description, Image
            FROM recipestep
            WHERE Recipes_ID = $1
            ORDER BY seq ASC;
            `,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        Profile: profile.rows[0],
        Ingredients: profileIngredients.rows,
        Steps: profileSteps.rows,
      },
    });
  } catch (error) {
    console.log("error");
  }
});

// POST SECTION ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

//Create a Non-Vegan Ingredient
app.post("/api/v1/nvIngredient", async (req, res) => {
  try {
    const response = await db.query(
      "INSERT INTO ingredient (name,variety,isVegan, createuser) VALUES ($1,$2,'n',1) RETURNING *",
      [req.body.name, req.body.variety]
    );

    res.status(200).json({
      status: "success",
      data: {
        nvIngredient: response.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});