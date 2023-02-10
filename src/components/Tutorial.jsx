function Tutorial() {
  return (
    <main className="tutorial">
      <h1 className="tutorial_h1">Tutorial</h1>
      <p className="tutorial_intro">This game is based on a few key rules that determine the fate of a cell. Your starting pattern is entirely responsible for determining the course and outcome of the game. With that in mind, familiarise yourself with these diagrams before returning to the action.</p>
      <h2>Loneliness: A cell with less than 2 adjoining neighbors dies.</h2>
      <img className="tutorial_img" src="/ruleOne.png" alt="rule one" />
      <h2>OverCrowding: A cell with more than three adjoining cells dies.</h2>
      <img className="tutorial_img" src="/ruleTwo.png" alt="rule two" />
      <h2>Reproduction: An empty cell with more than three adjoining cells comes alive.</h2>
      <img className="tutorial_img" src="/ruleThree.png" alt="rule three" />
      <h2>Stasis: A cell with exactly two adjoining cells remains the same</h2>
      <img className="tutorial_img" src="/ruleFour.png" alt="rule four" />
    </main>
  );
}

export default Tutorial;
