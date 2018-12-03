import * as React from 'react';

export interface IHeaderProps {
    hamburgerClick: Function;
    title: string;
    isSidebarOpen: boolean;
}
 
class Header extends React.Component<IHeaderProps, any> {
    constructor(props: IHeaderProps) {
        super(props);
        this.onHamburgerClick = this.onHamburgerClick.bind(this); 
    }

    private onHamburgerClick() {
        this.props.hamburgerClick();
    }

    public render(): React.ReactElement<HTMLElement> { 
        return <header className="header">
            <div className={this.props.isSidebarOpen ? "hamburger-container open" : "hamburger-container" } onClick={this.onHamburgerClick}>
                <span className = "hamburger-span"></span>
                <span className = "hamburger-span"></span>
                <span className = "hamburger-span"></span>
            </div>
            <div className="header-title">{this.props.title}</div>
        </header>;
    }
}
 
export default Header;