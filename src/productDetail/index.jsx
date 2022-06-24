import React from 'react'
import Navbar from '../components/navbar'
import './styles.scss'
import { Button } from 'react-bootstrap'
import Footer from '../footer'
export default function ProductDetail() {
  return (
    <div className='ProductDetailContainer'>
      <Navbar/>
      <div className="content">
        <div className='title'>
         <h3>PRODUC DETAIL PAGE</h3>
         <span>Tình trạng : Còn Hàng</span>
         <span className='mx-4'>Bảo hành: 24 tháng</span>
         <div><hr />
         <div className="info row">
          <div className="productImg col">
            <img src="https://philong.com.vn/media/product/24366-5.jpg" alt="" className='images' />
            <div className='text-center'>
            <img src="https://philong.com.vn/media/product/24366-5.jpg" alt="" className='imagesSmall ' />
            </div>
          </div>

          <div className="price col">
            <span className='price1'>Giá bán:</span> <span className='price2'>20.000.000 VND</span>
            <div className="discount">
              Khuyến mãi - Quà tặng
            </div>
            <div className="discountInfo">
              Thông tin quà tặng
            </div>
            <div className='text-center'>
              <Button className='my-4 bg-danger'>MUA NGAY</Button>
              <br />
              <span>GỌI NGAY:</span><span className='text-danger mx-2 h4'>2323 23232 232</span>Để giữ hàng
            </div>
          </div>

          <div className="contact col">
            <b>Điện thoại tư vấn - Đặt hàng</b>
            <ul className='text-black' >
              <li>Văn A:12348723</li>
              <li>Văn B:12387232</li>
              <li>Văn C:16568723</li>
            </ul>
            <b>Địa chỉ mua hàng</b>
            <ul >
              <li>123 BA,Quang Trung, Đà Nẵng</li>
              <li>134 BA,Quang Trung, Đà Nẵng</li>
              <li>145 BA,Quang Trung, Đà Nẵng</li>
            </ul>
          </div>

         </div>
         
         <table class="table my-5 ">
  <thead>
    <tr class="table-primary">
      <th scope="col">Phần cứng</th>
      <th scope="col">Thông sô kĩ thuật</th>
     
    </tr>
  </thead>
  <tbody className='  table-success table-striped'>
    <tr>
      <td >Model</td>
      <td>Mark</td>
     
    </tr>
    <tr>
      <td >CPU</td>
      <td>Jacob</td>
  
    </tr>
    <tr>
    
      <td >RAM</td>
      <td>@twitter</td>
    </tr>
    <tr>
    
    <td >Màn hình</td>
    <td>@twitter</td>
  </tr>
  </tbody>
</table>

         </div>

         </div>
         </div>
         <Footer/>
      </div>
        
  )
}
