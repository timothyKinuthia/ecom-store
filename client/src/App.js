import React, { useEffect, lazy, Suspense } from "react";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import "fontsource-roboto";
import { Switch, Route, useHistory } from "react-router-dom";
import { currentUser } from "./functions/auth";
import "./App.less";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//USING REACT LAZY

import SideDrawer from "./components/drawer/SideDrawer";
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoutes = lazy(() => import("./components/routes/UserRoutes"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const Password = lazy(() => import("./pages/user/Password"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("./pages/Payment"));

//import { useHistory } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        //console.log(idTokenResult.token)

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.user.email,
                token: idTokenResult.token,
                role: res.data.user.role,
                _id: res.data.user._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  

  return (
    <Suspense fallback={
      <div>Loading products</div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoutes exact path="/user/history" component={History} />
        <UserRoutes exact path="/user/password" component={Password} />
        <UserRoutes exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />

        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoutes exact path="/checkout" component={Checkout} />
        <UserRoutes exact path="/payment" component={Payment} />

        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
      </Switch>
    </Suspense>
  );
};

export default App;
