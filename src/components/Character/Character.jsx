import "./Character.css";

const Character = ({name, charType, chance}) => {
    return(
        <>
        <div className="Character">
            <span>Name: {name}</span>
            <span>Type: {charType}</span>
            <span>Chance: {chance}</span>
        </div>
        </>
    )
}

export default Character;