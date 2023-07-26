# Lab : Gotta catch them all!

#  Introduction

Welcome to the Pokedex!

This handy web application allows you to view information about all the pokemons currently known in the world.

Let's add some tests to catch them all!

In this lab, we're going to write automate tests for this application:

-   Chapter 1: Unit testing with [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com/)
-   Chapter 2: API testing with [Chai-http](http://dareid.github.io/chakram/)
-   Chapter 3: End-to-end acceptance testing with [UI-licious](https://snippet.uilicious.com)

#  Setup

##  Setting up the project

👉 Fork this repository (https://github.com/shiling/testing-zero-to-hero) and clone it to your fork of the repository

👉 Run `npm install` to to install the project dependencies.

###  What is Mocha?

We are going to use Mocha as the framework for testing.

[Mocha](https://mochajs.org) is a javascript testing framework, it helps you to manage the setup, execution, teardown, and reporting of your tests.

#  Chapter 1 : Unit Testing

Let's start with something simple - unit tests.

##  What is unit testing?

Unit tests are the smallest kinds of functional tests, and are designed to test a single method.

A unit test should test if the method produces the correct output given certain inputs.

###  💎 Execise 1.1: Hello Pikachu

In this exercise, we're going to try writing our first unit test for the `Pokemon` class in `models/Pokemon.js`. Let's test the `setName` method.

👉 Open the file `1_pokemon.test.js` in the `/tests/1_unit_tests/` folder.

👉 Import the Pokemon class:

```javascript
import Pokemon from "../../src/models/Pokemon.js";
```

👉 Use `describe` to create a test suite for the `Pokemon` class and for the `setName` method, to group related tests:

```javascript
describe("Pokemon", function() {
    describe("#setName()", function() {
        // We'll write our test cases here
    })
})
```

👉 Use `it` to define the test `should set name when passed non-empty string`:

```javascript
describe("Pokemon", function() {
    describe("#setName()", function() {
        // Test Case 1
        it("should set name when passed non-empty string", function() {
            // Steps to perform your test here:
        })
    })
})
```

💡Tip: Just a like any other scientific test, a good test validates only one hypothesis at a time. A good software test should test **exactly one** requirement and validate the expected behavior(s) of the application.

👉 Write the steps to perform `setName` method given a non-empty string:

```javascript
it("should set name when passed non-empty string", function() {
    // Steps to perform your test here:

    // Create a pokemon, and set the name
    let pokemon = new Pokemon()
    pokemon.setName("Pikachu")
})
```

The test is not complete without assertions to validate the output.

NodeJS comes with an assertion library built-in - ["assert"](https://nodejs.org/api/assert.html).

👉 Import the "assert" module

```javascript
import assert from "assert"
```

👉 Now, let's add an assertion to make sure that the name of the pokemon is equal to the value we just set:

```javascript
// Test Case 1
it("should set name when passed non-empty string", function() {
    // Steps to perform your test here:

    // Create a pokemon, and set the name
    let pokemon = new Pokemon()
    pokemon.setName("Pikachu")

    // After setting the name, we must make sure that the name is "Pikachu"
    assert.equal(pokemon.name, "Pikachu")
})
```

👉 When you are done, run `npm run test:unit` in your console to run your tests.

![Screenshot of test run](#)

##  Using the Chai assertion library

The build-in "assert" library that comes with NodeJS provides you a basic assertion commands and doesn't provide very helpful error messages when assertions fail.

Mocha works with assertion libraries such as [Chai](https://www.chaijs.com/) which provides the syntax for writing the tests.

Chai is an assertion library on steroids, that lets you provides BDD-style `should` and `expect` syntax, as well as a more powerful `assert` library.

Chai also supports a lot of [plugins](https://www.chaijs.com/plugins/) to help you perform other useful assertions:

-   [chai-http](https://www.chaijs.com/plugins/chai-http/) for testing http apis (we'll come to this later)
-   [chai-json-schema](https://www.chaijs.com/plugins/chai-json-schema/) for testing json objects against a schema
-   [chai-dom](https://www.chaijs.com/plugins/chai-dom/) for testing DOM elements
-   [chai-url](https://www.chaijs.com/plugins/chai-dom/) for testing URLs
-   [chai-file](https://www.chaijs.com/plugins/chai-files/) for testing files
-   [chai-doge](https://www.chaijs.com/plugins/chai-doge/) wow, very doge-style language chains for Chai, much silly

###  💎 Execise 1.2: Using `expect` syntax

In this exercise, let's try out Chai's `expect` syntax.

Import Chai's `expect` library:

```javascript
import {expect} from "chai";
```

`expect` allows you to write assertions like this:

-   Type assertions : `expect(pokemon.name).to.be.a("string")`
-   Value assertions : `expect(pokemon.name).to.be.equal("Pikachu")`
-   Length assertions : `expect(pokemon.types).to.have.lengthOf(2)`
-   and [more...](https://www.chaijs.com/api/bdd/)

👉 Write the previous test using the `expect` syntax.

##  Negative testing

It's important to also test negative scenarios, as user can make mistakes, and the application is expect to gracefully handle these accidents by showing appropriate errors to help users identify the problem and correct themselves.

###  💎 Execise 1.3: Using `to.throw` to test exceptions

👉 Using Chai's `expect(badFn).to.throw(error)`, test if an appropriate error is thrown when an empty string is passed to the `setName` method.

#  Chapter 2 : API Testing

Now, let's move one layer up and work on testing out APIs.

##  Setup

👉 Start the server:

```bash
npm start
```

The application will be loaded at [http://localhost:3000](http://localhost:3000)

##  Writing API tests

Let's test the `GET /api/pokedex/list` API which lists the pokemons in the database, and allows you to search for pokemons by attributes.

###  💎 Execise 2.1: Writing an API test

We're going to use the [`chai-http`](https://www.chaijs.com/plugins/chai-http/) plugin which allows us to test http requests.

👉 Open the file `2_pokedex_api.test.js` in the `/tests/2_api_tests/` folder.

👉 Import and register the `chai-http` plugin

```javascript
import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp)
import { expect } from "chai"

```

👉 Write a test to retrieve all the pokemons using the `GET /api/pokedex/list` API, with the following assertions:

```javascript
// here's a template to help you get started
describe("/api/pokedex", function(){

	it("should return a list of pokemon as a json array using /list", async function(){

        // set a GET request to /list endpoint
		let res = await chai.request("localhost:3000").get("/api/pokedex/list").send()

        // you may print the response to the console to see its contents and debug
		console.log("response is: ", res)

		// 1: check status code is 200
		

		// 2: check that response content is a json array
		

		// 3: check that first item in the array is "Bulbasaur"
		

	})
})
```

-   Assert that the response has a status of 200
-   Assert that the response has a "content-type" header of "application/json; charset=utf-8"
-   Assert that the response body is a json
-   Assert that the response body is an array
-   Assert that the response body is an array with 166 pokemons
-   Assert that the name of the first pokemon is "Bulbasaur"
    💡 Hint: You'll need [📖 this](https://www.chaijs.com/plugins/chai-http/)

👉 Write a test to add a pokemon using the `POST /api/pokedex/list` API.

#  Chapter 3 : End-to-end Acceptance Testing

##  What is acceptance testing?

A formal way of defining acceptance testing is to say that verifying that a software met business requirements.

I think a better way and more **relatable** way to describe acceptance testing is that:

Acceptance testing is verify that the application works for the **user**.

To perform acceptance testing, we need to simulate user stories, which should include:

-   An **objective** that a user wants to achieve with the application,
-   A series of actions that the user performs, which can be:
    -   And a **happy** flow where a user performs valid actions
        -   with assertions to validate that the application state and view is updated correctly
    -   Or a **negative** flow where a user makes mistake (it's very human to do so!)
        -   with assertions to validate that appropriate messages are shown to help the user recover from the error

##  UI-licious

###  💎 Execise 3.1: Testing with UI-licious

We can use GUI automation tools to automate acceptance testing.

The easiest way to test your web application is with [UI-licious Snippet](https://snippet.uilicious.com). ;)

👉 Go to https://snippets.uilicious.com/ to access the free edition of UI-licious. It's like CodePen, but for testing.

👉 Write a test to:

-  Go to https://pokedex.uilicious.com
-  Add a pokemon
-  Go back to the pokedex
-  Search for the pokemon that you've just added
