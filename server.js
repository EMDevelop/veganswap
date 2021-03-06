require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// setup path for build
const path = require('path');
const db = require('./db');

// An alternative library for Connecting to Postgres
// Connect to Postgres
const pgConnectionDetails = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
};
const pgp = require('pg-promise')({
  capSQL: true,
});
const dbMulti = pgp(pgConnectionDetails);

const { cloudinary } = require('./utils/cloudinary');

app.use(express.static(path.join(__dirname, 'client/build')));

// Set up Heroku
if (process.env.NODE_ENV === 'production') {
  // we'll serve the static files from `npm run build`, or more the index.html
  // we will serve static files from this location using
  app.use(express.static(path.join(__dirname, 'client/build')));
  // ensure there is a higher limit for image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));
}

// app.use(express.static(path.join(__dirname, 'client/build')));

// Setup Express
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up mate on port ${port}`);
});
app.use(cors());
app.use(express.json());

//
const _post = require('./requests/postRequests');

// ----------- GET
// hoping to move to: requests/getRequests.js
const getNonVeganIngredientAndRecipe = async (req, res) => {
  try {
    const response = await db.query(
      `SELECT id, isvegan,CASE WHEN (variety IS NULL ) THEN name WHEN (variety ='' ) THEN name ELSE name || ', ' || variety END AS name, 'ingredient' AS type FROM ingredient  WHERE isVegan = 'n'
      UNION
      SELECT id, isvegan, title as name, 'recipe' AS type FROM recipe WHERE isVegan = 'n'
      ORDER BY name DESC;
      `
    );
    res.status(200).json({
      status: 'success',
      data: {
        swapList: response.rows,
      },
    });
  } catch (err) {
    res.json({
      status: 'failure',
      error: err,
    });
  }
};

// defined above, hoping to re-factor into another file - currently not working on module export though.
app.get('/api/v1/swapList', (req, res) => {
  getNonVeganIngredientAndRecipe(req, res);
});

const bla = require('./requests/getRequests');

// GET Non-Vegan Recipe and Ingredient
app.get('/api/v1/swapListVegan', async (req, res) => {
  try {
    const ingredient = await db.query(
      `SELECT id,name, variety, isvegan FROM ingredient WHERE isVegan = 'y' order by name, variety asc;`
    );
    const recipe = await db.query(
      `SELECT id, isvegan, title FROM recipe WHERE isVegan = 'n' order by title asc;`
    );

    res.status(200).json({
      status: 'success',
      data: {
        ingredients: ingredient.rows,
        recipes: recipe.rows,
      },
    });
  } catch (err) {
    res.json({
      status: 'failure',
      error: err,
    });
  }
});

// GET Non-Vegan ingredients
app.get('/api/v1/nvIngredients', async (req, res) => {
  try {
    const ingredient = await db.query(
      `SELECT id,name,variety,isvegan FROM ingredient WHERE isVegan = 'n' order by name, variety asc;`
    );
    res.status(200).json({
      status: 'success',
      data: {
        ingredients: ingredient.rows,
      },
    });
  } catch (err) {
    res.json({
      status: 'failure',
      error: err,
    });
  }
});

//GET Non-Vegan recipe

app.get('/api/v1/nvRecipes', async (req, res) => {
  try {
    const recipe = await db.query(
      `SELECT id, title FROM recipe WHERE isVegan = 'n' order by title asc;`
    );
    res.status(200).json({
      status: 'success',
      data: {
        Recipes: recipe.rows,
      },
    });
  } catch (err) {
    res.json({
      status: 'failure',
      error: err,
    });
  }
});

// ---------------------  Get Alternatives  ----------------------

//
// Ingredient Alternatives
//

app.get('/api/v1/alternatives/ingredient/:id', async (req, res) => {
  try {
    //Fetch Ingredients as Ingredient Alternative
    const ingredients = await db.query(
      `SELECT i.ID, i.name,  i.description, i.image, i.createdate, u.username
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
            SELECT name, variety
            FROM ingredient
            WHERE id = $1 ;`,
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      data: {
        Ingredients: ingredients.rows,
        Recipes: recipes.rows,
        Selected: selected.rows[0],
      },
    });
  } catch (error) {
    console.log('error');
  }
});

//
// Recipe Alternatives
//

app.get('/api/v1/alternatives/recipe/:id', async (req, res) => {
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
      status: 'success',
      data: {
        Recipes: recipes.rows,
        FoodProducts: foodProducts.rows,
        Selected: selected.rows[0],
      },
    });
  } catch (error) {
    console.log('error');
  }
});

// Get Ingredient Profile + List of Ingredient foodProducts
app.get('/api/v1/ingredients/profile/:id', async (req, res) => {
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
      status: 'success',
      data: {
        Ingredients: ingredient.rows[0],
        foodProducts: brands.rows,
      },
    });
  } catch (error) {
    console.log('error');
  }
});

// Get foodProducts associated to a food product ID
app.get('/api/v1/foodproducts/profile/:id', async (req, res) => {
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
      status: 'success',
      data: { FoodProduct: response.rows[0] },
    });
  } catch (error) {
    console.log('error');
  }
});

// Get Recipe Profile
app.get('/api/v1/recipes/profile/:id', async (req, res) => {
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
      status: 'success',
      data: {
        Profile: profile.rows[0],
        Ingredients: profileIngredients.rows,
        Steps: profileSteps.rows,
      },
    });
  } catch (error) {
    console.log('error');
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
app.post('/api/v1/nvIngredient', async (req, res) => {
  try {
    const response = await db.query(
      "INSERT INTO ingredient (isVegan, name,variety,createuser) VALUES ('n',$1,$2, 1) RETURNING *",
      [req.body.name, req.body.variety],
      req.body.publicID
    );

    res.status(200).json({
      status: 'success',
      data: {
        nvIngredient: response.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a Vegan Ingredient + Link to a Non Vegan Ingredient
app.post('/api/v1/vIngredient', async (req, res) => {
  try {
    const addIngredient = await db.query(
      "INSERT INTO ingredient (isVegan, name,variety, description, image, createuser) VALUES  ('y',$1,$2,$3, $4, 1) RETURNING *",
      [req.body.name, req.body.variety, req.body.description, req.body.publicID]
    );

    const ingredientID = addIngredient.rows[0].id;

    const addIngredientLink = await db.query(
      "INSERT INTO ingredientAlternative (swap_ID,alternative_ID, type, createuser ) VALUES($1,$2,'ingredient',1) RETURNING *",
      [req.body.selectedIngredient, ingredientID]
    );

    res.status(200).json({
      status: 'success',
      data: {
        vIngredient: addIngredient.rows[0],
        addIngredientLink: addIngredientLink.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a non-vegan recipe
app.post('/api/v1/nvRecipe', async (req, res) => {
  try {
    const response = await db.query(
      "INSERT INTO recipe (isVegan, title, createuser) VALUES ('n',$1,1) RETURNING *",
      [req.body.title]
    );

    res.status(200).json({
      status: 'success',
      data: {
        nvRecipe: response.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: 'failure',
      error: err,
    });
  }
});

// ----------
// ----------
// ----------
// ----------
// ----------

//Create a vegan recipe + link to an Ingredient
app.post('/api/v1/vRecipe/Ingredient', async (req, res) => {
  try {
    //
    const recipe = await db.query(
      "INSERT INTO recipe ( isvegan, title, description, credit, url, image, createuser) VALUES ('y',$1,$2,$3,$4,$5,1) RETURNING *",
      [
        req.body.title,
        req.body.description,
        req.body.credit,
        req.body.setCreditURL,
        req.body.publicID,
      ]
    );

    const recipeID = recipe.rows[0].id;

    const ingredientLink = await db.query(
      "INSERT INTO ingredientAlternative (swap_id, alternative_id, type, createuser) Values ($1,$2,'recipe',1) RETURNING *",
      [req.body.selectedLink, recipeID]
    );

    // Multi Form Ingredients

    const multiIngredientsColumns = new pgp.helpers.ColumnSet(
      [
        'recipes_id',
        'seq',
        'quantity',
        'measure',
        'name',
        'note',
        'createuser',
      ],
      { table: 'recipeingredient' }
    );

    req.body.childToParentIngredients.map((row) => {
      row['recipes_id'] = recipeID;
    });

    const multiIngredientsQuery = pgp.helpers.insert(
      req.body.childToParentIngredients,
      multiIngredientsColumns
    );
    const multiIngredients = await dbMulti.none(multiIngredientsQuery);

    // Multi Form steps

    const multiStepsColumns = new pgp.helpers.ColumnSet(
      ['recipes_id', 'seq', 'description', 'createuser'],
      { table: 'recipestep' }
    );
    req.body.childToParentSteps.map((row) => {
      row['recipes_id'] = recipeID;
    });

    const multiStepsQuery = pgp.helpers.insert(
      req.body.childToParentSteps,
      multiStepsColumns
    );
    const multiSteps = await dbMulti.none(multiStepsQuery); // no return value for some reason
    console.log(multiSteps);

    res.status(200).json({
      status: 'success',
      data: {
        vRecipe: recipe.rows[0],
        IngredientLink: ingredientLink.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'failure', error: err });
  }
});
// ----------
// ----------
// ----------
// ----------
// ----------

//Create a vegan recipe + link to a Recipe
app.post('/api/v1/vRecipe/Recipe', async (req, res) => {
  try {
    const recipe = await db.query(
      "INSERT INTO recipe ( isvegan, title, description, credit, url, image,createuser) VALUES ('y',$1,$2,$3,$4,$5,1) RETURNING *",
      [
        req.body.title,
        req.body.description,
        req.body.credit,
        req.body.setCreditURL,
        req.body.publicID,
      ]
    );

    const recipeID = recipe.rows[0].id;

    const recipeLink = await db.query(
      "INSERT INTO recipeAlternative (swap_id, alternative_id, type, createuser) Values ($1,$2,'recipe',1) RETURNING *",
      [req.body.selectedLink, recipeID]
    );

    res.status(200).json({
      status: 'success',
      data: {
        vRecipe: recipe.rows[0],
        RecipeLink: recipeLink.rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'failure', error: err });
  }
});

//Create a food product + link to a Recipe
//Add Food Product
// INSERT INTO foodProduct (BrandName, ProductName, Description, createUser) Values ()
//Link Food Recipe
// INSERT INTO recipeProduct (recipe_id, foodproduct_id, createuser) VALUES (6, 8, 1) ;

app.post('/api/v1/FoodProduct/Recipe', async (req, res) => {
  try {
    const foodProduct = await db.query(
      'INSERT INTO foodProduct (BrandName, ProductName, Description, image, createUser) Values($1,$2,$3,$4,1) RETURNING *',
      [
        req.body.brandName,
        req.body.productName,
        req.body.description,
        req.body.publicID,
      ]
    );
    const foodProductID = foodProduct.rows[0].id;
    const recipeLink = await db.query(
      'INSERT INTO recipeProduct (recipe_id, foodproduct_id, createuser) VALUES  ($1,$2,1) RETURNING *',
      [req.body.selectedLink, foodProductID]
    );
    res.status(200).json({
      status: 'success',
      data: {
        FoodProduct: foodProduct.rows[0],
        RecipeLink: recipeLink.rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'failure', error: err });
  }
});

// {"status":"failure","error":{"length":217,"name":"error","severity":"ERROR","code":"23505","detail":"Key (id)=(14) already exists.","schema":"public","table":"ingredientproduct","constraint":"ingredientproduct_pkey","file":"nbtinsert.c","line":"649","routine":"_bt_check_unique"}}

// http://www.veganswap.co.uk/api/v1/FoodProduct/Ingredient

app.post('/api/v1/FoodProduct/Ingredient', async (req, res) => {
  try {
    const foodProduct = await db.query(
      'INSERT INTO foodProduct (BrandName, ProductName, Description, Image, createUser) Values($1,$2,$3,$4,1) RETURNING *',
      [
        req.body.brandName,
        req.body.productName,
        req.body.description,
        req.body.publicID,
      ]
    );

    const foodProductID = foodProduct.rows[0].id;

    const ingredientLink = await db.query(
      'INSERT INTO ingredientProduct (ingredient_id, foodProduct_id,CreateUser ) VALUES  ($1,$2,1) RETURNING *',
      [req.body.selectedLink, foodProductID]
    );

    res.status(200).json({
      status: 'success',
      data: {
        FoodProduct: foodProduct.rows[0],
        RecipeLink: ingredientLink.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'failure', error: err });
  }
});

//----------------------------------------------------------Image

// Upload
app.post('/api/v1/imageUpload', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
    res.json({ status: 'success', response: uploadResponse });
  } catch (err) {
    res.status(500).json({ status: 'failure', error: err });
  }
});

// Catch all
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// direct to my client index for all other requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
