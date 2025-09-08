import { useState } from 'react';
import './LoginBox.scss';
import Button from '../../app/Button/Button';

export interface LoginBoxProps {
    recovery: boolean;
}

export default function LoginBox({ recovery }: LoginBoxProps) {
    const [selected, setSelected] = useState(0);
    const [show, setShown] = useState(false);

    function next() {
        setSelected(s => s + 1);
    }
    function goToLogin() {
        window.location.href = "/login";
    }
    function codeChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(Number.isNaN(Number(e.target.value))) {
            e.target.value = "";
            return;
        }
        if (e.target.value.length === 1) {
            const next = e.target.nextElementSibling as HTMLInputElement | null;
            if (next) next.focus();
        }
    }
    function handleDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && e.currentTarget.value.length === 0) {
            const prev = e.currentTarget.previousElementSibling as HTMLInputElement | null;
            if (prev) prev.focus();
        }
    }
    return <div className="box">
        {!recovery && <div className="switcher">
            <div className={`option ${selected === 0 ? `selected` : ``}`} onClick={() => setSelected(0)}>Sign in</div>
            <div className={`option ${selected === 1 ? `selected` : ``}`} onClick={() => setSelected(1)}>Sign up</div>
        </div>}
        <div className="tabs" style={{transform: `translateX(-${selected * 100}%)`}}>
            {!recovery && <>
                <div className="content">
                    <h1>Sign in</h1>
                    <div className="label">Username</div>
                    <input type="text" placeholder="Username" />
                    <div className="label">Password</div>
                    <div className="pass">
                        <input type={show ? "text" : "password"} placeholder="Password" />
                        <div className={`eye ${show ? `show` : ``}`} onClick={() => setShown(!show)}></div>
                    </div>
                    <a href="/recovery" className='forgot-pass'>Forgot password?</a>
                    <Button>Lock In</Button>
                </div>
                <div className="content">
                    <h1>Sign up</h1>
                    <div className="label">Username</div>
                    <input type="text" placeholder="Username" />
                    <div className="label">Email</div>
                    <input type="text" placeholder="Email" />
                    <div className="label">Password</div>
                    <div className="pass">
                        <input type={show ? "text" : "password"} placeholder="Password" />
                        <div className={`eye ${show ? `show` : ``}`} onClick={() => setShown(!show)}></div>
                    </div>
                    <Button>Register</Button>
                </div>
            </>}
            {recovery && <>
                <div className="content">
                    <h1>Password reset</h1>
                    <div className="label">Username or Email</div>
                    <input type="text" placeholder="Username / Email" />
                    <Button onClick={next}>Continue</Button>
                </div>
                <div className="content">
                    <h1>Message sent!</h1>
                    <h3>We've sent you an email with code.</h3>
                    <h3>Please enter it to reset your password.</h3>
                    <div className="code">
                        {[0, 1, 2, 3, 4, 5].map(i => <input key={i} type="text" maxLength={1} onChange={codeChange} onKeyDown={handleDown} />)}
                    </div>
                    <div className="label">Password</div>
                    <div className="pass">
                        <input type={show ? "text" : "password"} placeholder="Password" />
                        <div className={`eye ${show ? `show` : ``}`} onClick={() => setShown(!show)}></div>
                    </div>
                    <Button onClick={next}>Reset password</Button>
                </div>
                <div className="content">
                    <h1>Password reset!</h1>
                    <h3>Your password has been successfully reset.</h3>
                    <h3>You can now log in with your new password.</h3>
                    <Button onClick={goToLogin}>Sign in</Button>
                </div>
            </>}
        </div>
    </div>;
}