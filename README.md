# HackSwift2024 - Grocery Finder
Creating a website to display groceries stores near you!

## Inspiration
Our inspiration came from challenges in finding cheap groceries for people who may not have as much money or were budgeting. We wanted to build an application that could locate the nearest grocery stores within a specified radius and search for the cheapest grocery options available. This could include a specific food item such as "Chocolate Milk" or "Fish Fillets". However, due to time constraints, we were not able to implement price comparisons.

## What it does
Users can type in a location where they want to find grocery stores nearest to them. They can specify the location in which they want to search using autocomplete as well. The map will generate little grocery store icons with clickable info windows that display the name, location and a link to Google Maps for directions. Users can also click on different stores, zooming in and out, as well as using the street view to explore provided by Maps API.

## How we built it
We utilized Next.js, React, TypeScript, TailwindCSS along with GoogleMaps API to build our web application

## Challenges we ran into
- Understanding how APIs work and how to call them!
- Displaying multiple markers on the map
- Linking Google maps to the info window 
- Designing the search box and container

## Accomplishments that we're proud of
We were proud of integrating Google Maps API into our application as this is our first time working with an API in React. We were glad to make a functioning app that delivered results similar to Google Maps and could foreseeably be scaled in the future.

## What we learned
The power of API calls and customization flexibility it brings.
Adding markers to Google Maps and customizing them
Customizing InfoWindows and linking to Google Maps
Web Development experience (how to set up websites!)
The amount of grocery stores near us

## What's next for GroceryFinder
Further implementation could include comparing prices to search for the cheapest groceries from the results. We are amazed at the power of APIs and excited to continue developing our application further to specify a user-defined radius as well.

## Important Information!!
You will need to declare a .env.local file with the constant NEXT_PUBLIC_GOOGLE_MAPS_API_KEY='' and insert your Google Maps API key.