<style type="text/css" rel="stylesheet">
* { color: whitesmoke; }

h1 {
    color: rgb(207, 143, 255);
    font-size: 35px
}

img {
    width: 600px;
    border-radius: 10px;
    border: 1px solid rgb(120, 120, 120);
    box-shadow: 0 0 20px 3px rgb(238, 130, 238);
    margin: 20px 0
}

span {
    font-size: 22px;
    line-height: 30px;
    font-style: italic
}

h3 {
    color: #DAA520
}

p {
    margin-bottom: 20px
}
</style>

# Automatrix: a 3D React app <br/> <span>Built with Three.js, featuring a highly interactable, multi-view geometric simulation.</span>

<p>Welcome to Automatrix!</p>

## What is it?
This React app is home to a cellular automaton simulator and the latest interpretation of John Conway's Game Of Life. The objective is to create a grid pattern that evolves in interesting, visually-striking ways, driven by the beauty of iterative mathematics. Each round is fully automated, meaning that the player only has to decide on a starting pattern and all subsequent computations are performed automatically by the program contained within.

## What does it look like?
Visit the live website at [placeholder] to experience this app in all of its glory! And while you're there, why not also sign up for an account, create some patterns and add them to your account, and join the conversation by leaving a comment or two in the social area? There's a lot to do!

### 3D view
<img src="https://github.com/3782291211/3D-geometric-sim/blob/main/3d.gif?raw=true">

<br/>

### 2D view

<img src="https://github.com/3782291211/3D-geometric-sim/blob/main/2d.gif?raw=true">

<br/>

## Key product features
- Intearctive gameboard UI that provides the user with the ability to control grid size, game speed, game conditions, environmental effects, camera angles, zoom levels, and board configuration.
- CRUD functionality - a user can create a new account, update their account details, save/delete patterns and post/delete comments.
- User authorisation provided by a Django/Python API, using JSON Web Tokens.
- Login form validation
- Plentiful feedback regarding errors and loading states.
- Optimistic rendering.

## Credits and contributions
- 3D board mesh configuration, 3D mapping system and the 2D grid layout were created and written by **SamPetcher** (https://github.com/SamPetcher) as part of a collaborative development project.
- The user interface for the game controls comes from Leva, a library authored by **dbismut** (https://github.com/dbismut).
- The stars animation used in the home page was created by **Paul Henschel** (https://codesandbox.io/u/drcmda).


