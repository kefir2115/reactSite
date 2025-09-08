import './Footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <ul>
                <li className="link">
                    <div className="img" style={{ backgroundImage: 'url(/icons/mail.svg)' }}></div>
                    <a href="mailto:mail@example.com">mail@example.com</a>
                </li>
                <li className="link">
                    <div className="img" style={{ backgroundImage: 'url(/icons/call.svg)' }}></div>
                    <a href="tel:123456789">123456789</a>
                </li>
            </ul>
            <p className='copy'>© 2025 AppName. All rights reserved.</p>
        </footer>
    );
}