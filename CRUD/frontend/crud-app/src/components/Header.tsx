interface Props {
    text: string
}

export const Header: React.FC<Props> = ({text}) => {
    return (
        <header className="m-3 d-flex justify-content-center align-items-center">
            <h3>{text}</h3>
        </header>
    )
}