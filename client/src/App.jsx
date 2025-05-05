import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Seller from './pages/Seller'
import CategoryProduct from './pages/CategoryProduct'
import ProductDetail from './pages/ProductDetail'
import MyOrder from './pages/MyOrder'
import { PrivateRoutes } from './routing/PrivateRoutes'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import MyProducts from './pages/MyProducts'

function App() {

  return (
    <BrowserRouter>
      <div className=" ">
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path='/dang-ky' element={<Signup />} />
              <Route path='/dang-nhap' element={<Login />} />
              <Route path='/dang-ban' element={<Seller />} />
              <Route path='/:slug' element={<CategoryProduct />} />
              <Route path='/oreka/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/my-products' element={<PrivateRoutes><MyProducts/></PrivateRoutes>}/>
              <Route path='/my-order' element={<PrivateRoutes><MyOrder/></PrivateRoutes>}/>
              <Route path='/checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
              <Route path='checkout-success' element={<PrivateRoutes><CheckoutSuccess/></PrivateRoutes>}/>
            </Route>
          </Routes>
      </div>
  </BrowserRouter>
  )
}

export default App
