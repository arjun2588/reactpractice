export default function Button({changeColor,children}){
    return <button onClick={changeColor}>{children}</button>;
}