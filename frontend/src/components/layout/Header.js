import React, { Fragment } from 'react'
import Search from './Search';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/useActions';

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    
    const logoutHandler =()=>{
        dispatch(logout());
        alert.success("logged out successfully")
    }

    
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to={'/'} ><img alt="" src='../../images/logo.png' /></Link>

                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">

                    <Search  />

                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to='/cart' style={{ textDecoration: "none" }}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    {user ? (
                        <div className='ml-4 dropdown d-inline'>
                            <Link to='#!' className='btn dropdown-toggle text-white mr-4'
                                type='button' id='dropDownMenuButton' data-toggle="dropdown"
                                aria-haspopup='true' aria-expanded='false'>
                                <figure className='avatar avatar-nav'>
                                    <img src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className='rounded-circle'
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className=' dropdown-menu' aria-labelledby='dropDownMenuButton'>
                                {user && user.role ==='admin'&&(
                                    <Link className='dropdown-item' to='dashboard'>Dashboard</Link>
                                )}
                                <Link className='dropdown-item' to='orders/me'>Orders</Link>
                                <Link className='dropdown-item' to='/me'>Profile</Link>
                                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler}>
                                Logout
                                </Link>

                            </div>
                        </div>
                    ) : (!loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>)}


                </div>
            </nav>
        </Fragment>
    )
}

export default Header;
