import * as React from 'react';
import { connect } from 'react-redux';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { getUserList, setSelectedUser, setSearchString, changeSort } from './user-list/actions/UserListActions';
import UserList from './user-list/view/UserList';
import { IUserlist, ISelectedUser } from './user-list/model/Userlist';

const mapStateToProps = (state: any) => ({
  data: state.userListContext.data,
  filteredList: state.userListContext.filteredList,
  selectedUser: state.userListContext.selectedUser
});

const mapDispatchToProps = {
  getUserList,
  setSelectedUser,
  setSearchString,
  changeSort
}

export interface IAppProps {
  data: Array<IUserlist>;
  getUserList: Function;
  filteredList: Array<IUserlist>;
  setSelectedUser: Function;
  setSearchString: Function
  selectedUser: ISelectedUser;
  changeSort: Function
}

export interface IAppState {
  showSideBar: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  private readonly sidebarItems = [
    {
      label: "All Users",
      value: "all",
      iconClass: "fa fa-user",
      id: 1
    },
    {
      label: "Favorites",
      value: "fav",
      iconClass: "fa fa-star",
      id: 2
    },
    {
      label: "Administrators",
      value: "admin",
      iconClass: "fa fa-shield-alt",
      id: 3
    },
    {
      label: "Non-Admin",
      value: "nonAdmin",
      iconClass: "fa fa-users",
      id: 4
    },
    {
      label: "Archieved",
      value: "archieved",
      iconClass: "fa fa-hdd",
      id: 5
    }
  ];

  constructor(props, context) {
    super(props, context);
    this.state = {
      showSideBar: true
    }

    this.onHamburgerClick = this.onHamburgerClick.bind(this);
    this.getSelectedItem = this.getSelectedItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onSortChange = this.onSortChange.bind(this);

  }

  public componentDidMount(): void {
    this.props.getUserList();
    window.addEventListener('resize', this.onResize);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }

  private onHamburgerClick(): void {
    this.setState({
      showSideBar: !this.state.showSideBar
    });
  }

  private onChange(input: string): void {
    this.props.setSearchString(input);
  }

  private getSelectedItem(item: any): void {
    this.props.setSelectedUser(item);
  }

  private onResize(): void {
    if (window.innerWidth < 769) {
      this.setState({
        showSideBar: false
      });
    } else {
      this.setState({ showSideBar: true });
    }
  }

  private onSortChange(type: string) {
      this.props.changeSort(type);
  }
  
  public render(): React.ReactElement<HTMLElement> {
    return (
      <div className="">
          <Header
            hamburgerClick={this.onHamburgerClick}
            title={"Product Name"}
            isSidebarOpen = {this.state.showSideBar}
          />
          <main>
            <Sidebar
              sidebarItems={this.sidebarItems}
              selectedItem={this.getSelectedItem}
              sidebarTitle={"Users"}
              isOpen = {this.state.showSideBar}
            />
            <section className={this.state.showSideBar ? "sidebar-open content" : "content"}>
              <UserList
                data={this.props.filteredList}
                onSearchStringChange={this.onChange}
                selectedUser={this.props.selectedUser.label}
                onSortChange={this.onSortChange}
              />
            </section>
            <div className="fa fa-plus add"></div>
          </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
