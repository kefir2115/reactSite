import "./Navigator.scss";

export default function Navigator() {
    return (
        <nav className="nav">
            <a href="#box1" className="nav-link">
                <div className="img" style={{backgroundImage: "url('/icons/home.svg')"}}></div>
                <p>Home</p>
            </a>
            <a href="#about" className="nav-link">
                <div className="img" style={{backgroundImage: "url('/icons/question.svg')"}}></div>
                <p>About</p>
            </a>
            <a href="#contact" className="nav-link">
                <div className="img" style={{backgroundImage: "url('/icons/call.svg')"}}></div>
                <p>Contact</p>
            </a>
            <a href="./login" className="nav-link">
                <div className="img" style={{backgroundImage: "url('/icons/user.svg')"}}></div>
                <p>Account</p>
            </a>
        </nav>
    );
}