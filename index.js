const express = require("express")

const app  =express()

app.use(require("cors")())

const bodyParser = require('body-parser')

app.use(bodyParser.json())
const { Pool} = require('pg')

const pool = new Pool({
  user: 'library_admin',
  database: 'lightlib_dev',
  password: 'library_admin',
  port: 5432,
  host: 'localhost',
})

pool.connect()

app.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await pool.query(
        `Delete from Patrons where "Id" = $1`,[req.params.id]
      );
    console.log(result);
    res.json({success: true})
})

app.post("/add", async(req, res) => {

    console.log(req.body)

    const {firstName, lastName, address, dob, email, telephone, libraryCardId, homeLibraryBranchId} = req.body
    
   const result = await pool.query(
        `INSERT INTO patrons ("CreatedOn", "UpdatedOn", "FirstName", "LastName", "Address", "DateOfBirth", "Email", "Telephone", "LibraryCardId", "HomeLibraryBranchId")
        VALUES
        (NOW(), NOW(), $1, $2, $3, $4, $5, $6, $7, $8)`, [firstName, lastName, address, dob, email, telephone, parseInt(libraryCardId), parseInt(homeLibraryBranchId)]  
    )

    console.log(result)

    res.json({success: true})
})


app.post("/update/:id", async(req, res) => {

    console.log(req.body)

    const id = req.params.id
    const {firstName, lastName, email} = req.body
    
   const result = await pool.query(
        `UPDATE patrons SET "FirstName" = $1, "LastName" = $2, "Email" = $3 WHERE "Id" = $4`, [firstName, lastName, email, parseInt(id)]
    )

    console.log(result)

    res.json({success: true})
})

const PORT = 3000

app.listen(PORT, () => console.log("Server is running in port: " + PORT))

