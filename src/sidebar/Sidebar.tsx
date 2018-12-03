import * as React from 'react';
import { ISelectedUser } from '../user-list/model/Userlist';

export interface ISidebarProps {
    sidebarItems: Array<ISelectedUser>
    selectedItem: Function;
    sidebarTitle: string;
    isOpen: boolean;
    active?: number;
}

export interface ISidebarState {
    active: number;
}
 
export default class Sidebar extends React.Component<ISidebarProps, any> {
    public static defaultProps = {
        active: 1
    };

    constructor(props) {
        super(props);

        this.state = {
            active: this.props.active
        }
    }

    private toggleSelected(selected: ISelectedUser): void {
        if (selected.id !== this.state.active) {
            this.setState({ active: selected.id });
            this.props.selectedItem(selected);
        }
    }

    public render(): React.ReactElement<HTMLElement> { 
        return <nav className={this.props.isOpen ? "sidebar-container open" : "sidebar-container"}>
            <div className="sidebar-title">
                {this.props.sidebarTitle}
            </div>
            <ul>
                {
                    this.props.sidebarItems.map((item:ISelectedUser) => {
                        return <li 
                                key={item.value}
                                className={item.id === this.state.active ? "sidebar-item-container active" : "sidebar-item-container"} 
                                onClick={() => this.toggleSelected(item)}>
                            <span className={`${item.iconClass} sidebar-item-icon`}></span>
                            <span className="sidebar-item-text">{item.label}</span>
                        </li>
                    })
                }
            </ul>
        </nav>;
    }
}