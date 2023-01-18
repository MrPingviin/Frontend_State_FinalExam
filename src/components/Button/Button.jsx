const Button = ({isDisabled, children, onClickFunction}) => {

 if (isDisabled) {
    return <button disabled>{children}</button>
 } else {
    return <button onClick={onClickFunction}>{children}</button>
 }
};

export default Button;