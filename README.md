#Project settings 
Node version: v20.10.0
Database manager: Postgresql
Database manager version: 15.7



#Backend
Running port:3000
Should create .env file with DATABASE_URL variable set to run propertly 

    #Category Entity
    expect to have the following sturcture
    {
      id:string
      name: string
    }

    #Note entity
    expect to have the following structure
    {
		"id": string,
		"title": string,
		"content": string
		"createdAt": date string,
		"updatedAt": date string,
		"archived": boolean,
		"status": string (ACTIVE | INACTIVE)
    "categories" Category[]
	},

         GET http://localhost:3000/notes/all?status=ACTIVE&archived=true
        returns all notes created, it accepts optional queries like: status (ACTIVE or INACTIVE) and archived (boolean)

        GET localhost:3000/notes/:id
        returns specified note

        POST localhost:3000/notes/
        creates a note using the following structure
        {
	     "title": string
	     "content": string,
	     "archived": boolean? default false,
	     "status": string? default ACTIVE
       "categories": Category[]
        }

        PATCH localhost:3000/notes/:id
        updates a note using the following structure
        {
	     "title": string?
	     "content": string?,
	     "archived": boolean? 
	     "status": string? 
        }

        DELETE localhost:3000/notes/:id
        deletes a note record with the specified id 

        PUT localhost:3000/notes/categories/:id
        add categories to note with the specified id using the following structure
        {
          "categories": string[]
        }

        response is a note entity
        PATCH localhost:3000/notes/categories/:id
        remove categories to note with the specified id using the following structure
        {
          "categories": string[]
        }
           response is a note entity

#frontend
running port:4000
frontend created in react with typescript
folder structure is as following 
  -frontend
   -index.tsx
   -App.tsx
   -Components 
   -pages
   -states  (global states)
   -interfaces 