import Navigator from '../Navigator/Navigator';
import './Header.scss';

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <div className="img" style={{ backgroundImage: 'url(/logo512.png)' }}></div>
                <h1 className="header-title">AppName</h1>
            </div>
            <Navigator />
        </header>
    );
}