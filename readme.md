# Automatrix: a 3D React app featuring Three.js</span>

**[Click me! (link to the live app)](https://3782291211.github.io/3D-geometric-sim/)** 

Welcome to Automatrix, a 3D experience built around a highly interactable, multi-view geometric simulation.

## Quick start guide
1. Once you've launched the app, use the navigation bar at the top to choose between the 3D and 2D views.
    - You can fully control the 3D camera (zoom + position).
    - Check the "Tips" section for an explanation of the game's controls.
2. To load up an existing pattern, head over to the "All patterns" section and choose to go 3D or 2D.
3. To add a new pattern, pause the game, click on the board to highlight any number of cells, then hit save (you will be prompted to create an account if you are a new user).
4. Use the "Featured patterns" dropdown menu to load patterns onto the 3D board.
    - Tip: you can freely and seamlessly switch between the 3D and 2D views without disrupting your pattern. Give it a try!
5. You can see all registered users on the "Users" page.
6. Head over to the "Social" page to view and post comments.

## What is it?
This React app is home to a cellular automaton simulator and the latest interpretation of John Conway's Game Of Life. The objective is to create a grid pattern that evolves in interesting, visually-striking ways, driven by the beauty of iterative mathematics. Some patterns oscillate, some can run infinitely, and others can spawn independent child patterns which have their own unique behaviour. The possibilities are endless!

Each round is fully automated, meaning that you need only to decide on a starting pattern and all subsequent computations are performed automatically by the program.

## What does it look like?
Visit the live website at **[this link](https://3782291211.github.io/3D-geometric-sim/)** to experience this app in all of its glory! And while you're there, why not also sign up for an account, create some patterns and add them to your account, and join the conversation by leaving a comment or two in the social area? There's a lot to do!

### 3D view
<img width=600 src="https://github.com/3782291211/3D-geometric-sim/blob/main/3d.gif?raw=true">

### 2D view

<img width=600 src="https://github.com/3782291211/3D-geometric-sim/blob/main/2d.gif?raw=true">

## Key product features
- 3D models created dynamically using centralised states synchronised across different views.
- Intearctive gameboard UI that provides the user with many ways to interact with the game and modify the visual display.
- CRUD functionality: a user can create a new account, update their account details, save/delete patterns and post/delete comments.
- User authorisation provided by a Django/Python API, using JSON Web Tokens.
- Login form validation.
- Plentiful feedback regarding errors and loading states.
- Optimistic rendering.

## Libraries
- Framework: **React**
- 3D modelling: **Three.js** (via multiple React-specific declarative rendering packages)
- Styling: **Bootsrap**
- Game controls interface: **Leva** (authored by dbismut)

## Credits and contributions
- 3D board mesh configuration, 3D mapping system and the 2D grid layout were created and written by **SamPetcher** (https://github.com/SamPetcher) as part of a collaborative development project.
- The stars animation used in the home page was created by **Paul Henschel** (https://codesandbox.io/u/drcmda).


