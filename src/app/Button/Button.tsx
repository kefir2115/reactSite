import './Button.scss';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button className="btn" onClick={onClick}>
            <span className="btn-text">
                {children}
            </span>
        </button>
    );
}