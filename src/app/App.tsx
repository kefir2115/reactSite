import './App.scss';
import Footer from './Footer/Footer';
import Header from './header/Header';
import Main from './main/Main';

export default function App() {
    return (
        <div className="main">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
