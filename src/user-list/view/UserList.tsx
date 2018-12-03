import * as React from 'react';
import DateTimeUtil from '../../util/DateTimeUtil';
import { IUserlist } from '../model/Userlist';

export interface IUserListProps {
    data: Array<IUserlist>
    onSearchStringChange: Function;
    selectedUser: string;
    onSortChange:Function;
}
 
export interface IUserListState {
    value: string;
    showActionMenu: boolean;
}
 
class UserList extends React.Component<IUserListProps, IUserListState> {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            showActionMenu: false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.onActionMenuClick= this.onActionMenuClick.bind(this);
    }

    private onInputChange(e: any): void {
        this.setState({
            value: e.target.value,
        }, () => {
            this.props.onSearchStringChange(this.state.value);
        });
    }

    private clearSearch(): void {
        if (this.state.value.length > 0) {
            this.setState({ value: "" }, () => {
                this.props.onSearchStringChange(this.state.value);
            });
        }
    }

    private onActionMenuClick(): void {
        this.setState({ showActionMenu: !this.state.showActionMenu });
    }

    private onActionMenuItemClick(type: string): void {
        this.setState({ showActionMenu: false });
        this.props.onSortChange(type);
    }
    
    public render(): React.ReactElement<HTMLElement> {
        /* virtualisation can be used if the data set is huge */
        return <div>
            <div className="content-header">
                <span className="content-header-title"> { this.props.selectedUser } </span>
                <div className="icons-wrapper">
                    <span className="fa fa-cog"></span>
                    <span className="fa fa-ellipsis-v" onClick={this.onActionMenuClick}></span>
                    {
                        this.state.showActionMenu ? 
                            <ul className="action-menu-container">
                                <li onClick={() => this.onActionMenuItemClick("firstName")}>Sort by Name</li>
                                <li onClick={() => this.onActionMenuItemClick("lastLogin")}>Sort by Last Login</li> 
                            </ul>  : null  
                    }
                </div>
            </div>
            <div className="content-container">
                <div className="search-container">
                    <span className="fa fa-search"></span>
                    <input type="text" value={this.state.value} placeholder="Search" onChange={this.onInputChange}/>
                    <span className="fa fa-times" onClick={this.clearSearch}></span>
                    
                </div>
                <div className="users-list">
                    {
                        this.props.data.map(item => {
                            return <div className="list-item" key={item.id}>
                                <span className="fa fa-user"></span>
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <div className="personal-details">
                                            <div className="name">{`${item.firstName} ${item.lastName}`}</div>
                                            <div>{item.email}</div>
                                        </div>
                                        <div className="last-login">
                                            {DateTimeUtil.formatAsMMMDYYYY(item.lastLogin)}
                                        </div>
                                        <div className="last-login-from-now">
                                            {DateTimeUtil.getTimeFromNow(item.lastLogin)}
                                        </div>
                                    </div>
                                    <span className="fa fa-ellipsis-v"></span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>;
    }
}
 
export default UserList;