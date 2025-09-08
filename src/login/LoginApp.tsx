import '../app/App.scss';
import './LoginApp.scss';
import LoginBox, { LoginBoxProps } from './LoginBox/LoginBox';

export default function LoginApp({ recovery }: LoginBoxProps) {
    return <div className="main">
        <LoginBox recovery={recovery} />
    </div>;
}