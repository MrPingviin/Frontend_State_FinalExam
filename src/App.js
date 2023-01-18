import React, { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import Character from "./components/Character/Character";

let downloadedDataContainer = [];

const App = () => {
  const [isDisabled, setDisableState] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSide, setSelectedSide] = useState("Sith");
  const [isLiving, setIsLivingState] = useState("asd");
  const [loadingState, setLoadingState] = useState(false);
  const [isFormSent, setFormSentState] = useState(false);

  useEffect(() => {
    enteredEmail.includes(".") &&
    enteredEmail.includes("@") &&
    enteredEmail.length > 10 &&
    (isLiving === true || isLiving === false)
      ? setDisableState(false)
      : setDisableState(true);
  }, [isLiving]);

  const postData = () => {
    setLoadingState(true);

    const dataToSend = {
      lightsabre: `${selectedColor}`,
      type: `${selectedSide}`,
      isLiving: `${isLiving}`,
      email: `${enteredEmail}`,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://demoapi.com/api/calculate", options)
      .then((response) => response.json())
      .then((data) => {
        downloadedDataContainer.push(data);
        return setLoadingState(false), setFormSentState(true);
      });

    //console.log(dataToSend)
  };

  if (isFormSent) {
    return (
      <div>
        {downloadedDataContainer[0].map((item) => {
          return (
            <Character
              name={item.name}
              charType={item.type}
              chance={item.chance}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <main>
        <section>
          <h1>Which Star Wars character are you?</h1>
          <form id="formSection">
            <label>Select a lightsaber color:</label>
            {loadingState ? (
              <p>...</p>
            ) : (
              <select
                onChange={(event) => setSelectedColor(event.target.value)}
              >
                <option value="Blue">Blue</option>,
                <option value="Green">Green</option>,
                <option value="Red">Red</option>
              </select>
            )}

            <label>Select your side:</label>
            {loadingState ? (
              <p>...</p>
            ) : (
              <select onChange={(event) => setSelectedSide(event.target.value)}>
                <option value="Sith">Sith</option>
                <option value="Jedi">Jedi</option>
              </select>
            )}

            <label>Enter your E-mail address:</label>
            {loadingState ? (
              <p>...</p>
            ) : (
              <input
                type="email"
                onChange={(event) => setEnteredEmail(event.target.value)}
                placeholder="Write your e-mail here."
              ></input>
            )}
          </form>
        </section>

        <section>
          <label>Do you prefer robots or living beings?</label>

          {loadingState ? (
            <p>...</p>
          ) : (
            <>
              <div>
                <label>Living Beings</label>
                <input
                  type="radio"
                  name="racePreference"
                  value="Living Beings"
                  onChange={() => setIsLivingState(true)}
                ></input>
              </div>
              <div>
                <label>Robots</label>
                <input
                  type="radio"
                  name="racePreference"
                  value="Robots"
                  onChange={() => setIsLivingState(false)}
                ></input>
              </div>
            </>
          )}
        </section>

        <Button isDisabled={isDisabled} onClickFunction={postData}>
          Submit
        </Button>
      </main>
    );
  }
};

export default App;
