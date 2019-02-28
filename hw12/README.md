What is object oriented programming, and why would you use it? As you may already know, many javascript projects are written using a functional, or event-driven design pattern. In which cases would an OOP pattern be a better choice?

For this task, write a few paragraphs describing a project that would benefit greatly from an OOP structure. (This could be any kind of application, running on any type of system). Describe the application flow from the user's point of view (user stories). What is the application's purpose, and how would people use it? What information would they enter, and what would be received? Try to mention all the "stories" in which the user performs any kind of CRUD operation.

Next, using pseudocode (or any other notation-technique or diagramming tool you wish), map out what the main objects of the system would look like, how they would be constructed, and how they would relate to each other. 

Save your writeup in a Readme.md file, and push it to Github.


# A project that would benefit from OOP
Online store - would benefit greatly from objects since all the entities about the store - users, products, categories, orders have multiple fields which are bound to a specific property.

User stories:
- User can login and logout of the system
- Upon logging in the user will see a list of categories in a menu on the side and the products of a specific category loaded. The products will display not only name, but price and categories of the product.
- The user can switch the category, the products will be changed to the products of that category, but the categories section will remain the same.
- Upon selecting a product the user can add it to his/her order.
- Upon adding one or more orders the user can click a button below the category menu (which will appear only when there is at least one product for the order)
- Upon order finalization the user will get a message on the UI displaying that the order has been sent for processing

# Main Objects
- Users
    - Fields
        - username
        - email
        - password
        - address

    - Methods
        - login
        - logout
        - update
        - place order 
- Products
    - Fields
        - name
        - price
        - categories
        - description

    - Methods
        - update 

- Categories
    - Fields
        - name
        - description

    - Methods
        - update

- Orders
    - Fields
        - products
        - total price
        - owner (type user)

    - Methods
        - finish order
        - cancel order

