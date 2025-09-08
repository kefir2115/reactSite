import { useState } from 'react';
import './LoginBox.scss';
import Button from '../../app/Button/Button';

export interface LoginBoxProps {
    recovery: boolean;
}

const MAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z0-9]+$/;

export default function LoginBox({ recovery }: LoginBoxProps) {
    const [selected, setSelected] = useState(0);
    const [show, setShown] = useState(false);
    const [msg, setMessage] = useState("");
    const [msgAt, setMsgAt] = useState(-1);

    function next() {
        if(!validate()) {
            return;
        }
        setSelected(s => s + 1);
    }
    function goToLogin() {
        if(!validate()) {
            return;
        }
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

    function message(msg: string) {
        setMessage(msg);
        setMsgAt(Date.now());
        setTimeout(() => {
            if(msgAt !== -1 || Date.now() - msgAt < 4500) return;
            setMsgAt(t => -1);
            setMessage("");
        }, 5000);
    }

    function logIn() {
        if(!validate()) {
            return;
        }
        //login logic
    }
    function register() {
        if(!validate()) {
            return;
        }
        //register logic
    }

    function validate() {
        const inputs = Array.from(document.querySelectorAll(`.lbox .content:nth-child(${selected + 1}) input`)).map(e => (e as HTMLInputElement).value);
        if(!recovery && selected === 0) {
            if(inputs[0].length > 16 || inputs[0].length < 3) {
                message("Username must be between 3 and 16 characters long.");
                return false;
            }
            if(!inputs[0].match(NAME_REGEX)) {
                message("Username must be alphanumeric.");
                return false;
            }

            if(inputs[1].length <= 5) {
                message("Password must be at least 6 characters long.");
                return false;
            }
        } else if(!recovery && selected === 1) {
            if(inputs[0].length > 16 || inputs[0].length < 3) {
                message("Username must be between 3 and 16 characters long.");
                return false;
            }
            if(!inputs[0].match(NAME_REGEX)) {
                message("Username must be alphanumeric.");
                return false;
            }

            if(!inputs[1].match(MAIL_REGEX)) {
                message("Please enter a valid email address.");
                return false;
            }

            if(inputs[2].length <= 5) {
                message("Password must be at least 6 characters long.");
                return false;
            }
        } else if(recovery && selected === 0) {
            if(inputs[0].match(MAIL_REGEX)) {
                return true;
            } else if(inputs[0].length <= 16 && inputs[0].length >= 3 && inputs[0].match(NAME_REGEX)) {
                return true;
            } else {
                message("Username must be between 3 and 16 characters long.");
                return false;
            }
        } else if(recovery && selected === 1) {
            for(let i = 0; i < 6; i++) {
                if(inputs[i].length === 0) {
                    message("Please fill in all fields.");
                    return false;
                }
            }
            if(inputs[6].length <= 5) {
                message("Password must be at least 6 characters long.");
                return false;
            }
        }
        return true;
    }
    return <div className="lbox">
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
                    <Button onClick={logIn}>Lock In</Button>
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
                    <Button onClick={register}>Register</Button>
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
        {msg.length > 0 && <div className="message">{msg}</div>}
    </div>;
}